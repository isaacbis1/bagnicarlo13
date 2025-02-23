// Abilitiamo le funzionalità di blocco del tasto destro e scorciatoie
document.addEventListener('contextmenu', event => event.preventDefault());
document.addEventListener('keydown', event => {
  if (
    event.key === 'F12' ||
    (event.ctrlKey && event.shiftKey && event.key === 'I') ||
    (event.ctrlKey && event.key === 'U') ||
    (event.ctrlKey && event.key === 'S') ||
    (event.ctrlKey && event.key === 'C')
  ) {
    event.preventDefault();
    return false;
  }
});

// Import delle funzioni Firebase (v9)
import { 
  initializeApp 
} from "https://www.gstatic.com/firebasejs/9.22.1/firebase-app.js";
import { 
  getFirestore, collection, doc, getDoc, getDocs, setDoc, deleteDoc, query, where, onSnapshot, writeBatch 
} from "https://www.gstatic.com/firebasejs/9.22.1/firebase-firestore.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-analytics.js";

// Configurazione Firebase
const firebaseConfig = {
  apiKey: "AIzaSyB4Vaa2XFvNJArRFXXEJcaEEKPpBZtOenQ",
  authDomain: "prenotazionecampi2.firebaseapp.com",
  databaseURL: "https://prenotazionecampi2-default-rtdb.firebaseio.com",
  projectId: "prenotazionecampi2",
  storageBucket: "prenotazionecampi2.firebasestorage.app",
  messagingSenderId: "305195940450",
  appId: "1:305195940450:web:a160ef922c72a0b3462f3b",
  measurementId: "G-R5ENJ7J2R1"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

// Variabili globali
let currentUser = null;
let currentRole = null; // "admin" o "user"

const timeSlots = [
  "11:00", "11:45",
  "12:30", "13:15",
  "14:00", "14:45",
  "15:30", "16:15",
  "17:00", "17:45",
  "18:30", "19:15",
  "20:00", "20:45"
];

let reservations = {
  "Volley1": {},
  "Volley2": {},
  "BasketCalcio": {},
  "Ping-pong": {}
};

// UTILITÀ
function getTodayDate() {
  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, '0');
  const dd = String(today.getDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
}

function showNotification(message) {
  const container = document.getElementById('notification-container');
  const notification = document.createElement('div');
  notification.classList.add('notification');
  notification.textContent = message;
  container.appendChild(notification);
  setTimeout(() => notification.remove(), 3000);
}

// LOGIN & LOGOUT
function login() {
  const username = document.getElementById('username').value.trim();
  const password = document.getElementById('password').value.trim();

  if (!username || !password) {
    showNotification('Inserisci username e password.');
    return;
  }

  const userDoc = doc(db, "users", username);
  getDoc(userDoc).then(docSnap => {
    if (!docSnap.exists()) {
      showNotification("Credenziali errate!");
      return;
    }
    const data = docSnap.data();
    if (data.password !== password) {
      showNotification("Credenziali errate!");
      return;
    }
    if (data.disabled) {
      showNotification("Questo utente è disabilitato.");
      return;
    }
    authenticateUser(username, data.role);
  }).catch(err => {
    console.error(err);
    showNotification("Errore durante il login.");
  });
}

function authenticateUser(username, role) {
  currentUser = username;
  currentRole = role;
  toggleSections(true);
  toggleAdminSection();
  loadReservationsFromFirestore();
  checkAndResetAfterTen();
  showNotification(`Benvenuto, ${username}!`);

  // Avvio il caricamento in tempo reale di note e immagini
  loadAdminNotesRealtime();
  loadAdminImagesRealtime();

  // Se admin, carica anche la tabella utenti
  if (currentRole === "admin") {
    populateCredentialsTable();
  }
}

function logout() {
  currentUser = null;
  currentRole = null;
  toggleSections(false);
  showNotification("Sei uscito con successo.");
}

// FIRESTORE – PRENOTAZIONI
function loadReservationsFromFirestore() {
  const today = getTodayDate();
  reservations = { "Volley1": {}, "Volley2": {}, "BasketCalcio": {}, "Ping-pong": {} };

  const reservationsQuery = query(collection(db, "reservations"), where("date", "==", today));
  getDocs(reservationsQuery).then(querySnapshot => {
    querySnapshot.forEach(docSnap => {
      const { field, time, user } = docSnap.data();
      if (!reservations[field][today]) reservations[field][today] = {};
      reservations[field][today][time] = user;
    });
    populateAllFields();
    listenRealtimeForToday();
  }).catch(err => {
    console.error("Errore caricamento prenotazioni:", err);
    showNotification("Errore durante il caricamento delle prenotazioni.");
  });
}

function listenRealtimeForToday() {
  const today = getTodayDate();
  const reservationsQuery = query(collection(db, "reservations"), where("date", "==", today));
  onSnapshot(reservationsQuery, snapshot => {
    reservations = { "Volley1": {}, "Volley2": {}, "BasketCalcio": {}, "Ping-pong": {} };
    snapshot.forEach(docSnap => {
      const { field, time, user } = docSnap.data();
      if (!reservations[field][today]) reservations[field][today] = {};
      reservations[field][today][time] = user;
    });
    populateAllFields();
    populateAdminTable();
    if (currentRole === "admin") {
      populateCredentialsTable();
    }
  });
}

function saveReservationToFirestore(fieldName, date, time, user, role) {
  const docId = `${fieldName}_${date}_${time}_${user}`;
  return setDoc(doc(db, "reservations", docId), { field: fieldName, date, time, user, role });
}

function deleteReservationFromFirestore(fieldName, date, time, user) {
  const docId = `${fieldName}_${date}_${time}_${user}`;
  return deleteDoc(doc(db, "reservations", docId));
}

// Gestione prenotazioni & UI
function userHasBookingToday() {
  const today = getTodayDate();
  for (let field in reservations) {
    if (reservations[field][today]) {
      for (let slot in reservations[field][today]) {
        if (reservations[field][today][slot] === currentUser) {
          return true;
        }
      }
    }
  }
  return false;
}

function populateAllFields() {
  ["Volley1", "Volley2", "BasketCalcio", "Ping-pong"].forEach(field => populateFieldSlots(field));
}

function populateFieldSlots(fieldName) {
  const today = getTodayDate();
  const container = document.getElementById(`slots-${fieldName}`);
  if (!reservations[fieldName][today]) reservations[fieldName][today] = {};
  container.innerHTML = '';

  timeSlots.forEach(slot => {
    const slotDiv = document.createElement('div');
    slotDiv.classList.add('slot');
    const bookedBy = reservations[fieldName][today][slot];

    if (bookedBy) {
      if (bookedBy === currentUser) {
        slotDiv.classList.add('my-booking');
        slotDiv.textContent = `${slot} - Prenotato da Te`;
        slotDiv.onclick = () => cancelUserReservation(fieldName, slot);
      } else {
        slotDiv.classList.add('unavailable');
        slotDiv.textContent = `${slot} - Prenotato`;
      }
    } else {
      slotDiv.classList.add('available');
      slotDiv.textContent = `${slot} - Disponibile`;
      slotDiv.onclick = () => bookSlot(fieldName, slot);
    }
    container.appendChild(slotDiv);
  });
}

function bookSlot(fieldName, slot) {
  const today = getTodayDate();
  if (currentRole !== "admin" && userHasBookingToday()) {
    showNotification('Hai già effettuato una prenotazione per oggi.');
    return;
  }
  if (reservations[fieldName][today][slot]) {
    showNotification('Questo slot è già prenotato.');
    return;
  }
  saveReservationToFirestore(fieldName, today, slot, currentUser, currentRole)
    .then(() => showNotification(`Prenotazione effettuata: ${fieldName} alle ${slot}`))
    .catch(err => {
      console.error("Errore durante la prenotazione:", err);
      showNotification("Errore durante la prenotazione.");
    });
}

function cancelUserReservation(fieldName, slot) {
  const today = getTodayDate();
  if (reservations[fieldName][today][slot] === currentUser) {
    deleteReservationFromFirestore(fieldName, today, slot, currentUser)
      .then(() => showNotification(`Prenotazione per ${fieldName} alle ${slot} annullata.`))
      .catch(err => {
        console.error("Errore durante la cancellazione:", err);
        showNotification("Errore durante la cancellazione.");
      });
  } else {
    showNotification('Non puoi cancellare la prenotazione di un altro utente.');
  }
}

// Funzioni amministrative
function populateAdminTable() {
  const today = getTodayDate();
  const tbody = document.getElementById('admin-table');
  tbody.innerHTML = '';
  for (let field in reservations) {
    if (reservations[field][today]) {
      for (let time in reservations[field][today]) {
        const user = reservations[field][today][time];
        const tr = document.createElement('tr');
        tr.innerHTML = `
          <td>${field}</td>
          <td>${today}</td>
          <td>${time}</td>
          <td>${user}</td>
          <td>
            <button class="cancel-btn" onclick="deleteAdminReservation('${field}','${today}','${time}','${user}')">
              <i class="fas fa-trash-alt"></i> Elimina
            </button>
          </td>
        `;
        tbody.appendChild(tr);
      }
    }
  }
}

function deleteAdminReservation(fieldName, date, time, user) {
  deleteReservationFromFirestore(fieldName, date, time, user)
    .then(() => showNotification(`Prenotazione per ${fieldName} alle ${time} dell'utente ${user} eliminata.`))
    .catch(err => {
      console.error('Errore durante la cancellazione:', err);
      showNotification("Errore durante la cancellazione.");
    });
}

function populateCredentialsTable() {
  const tbody = document.getElementById('credentials-table');
  tbody.innerHTML = '';
  getDocs(collection(db, "users")).then(querySnapshot => {
    querySnapshot.forEach(docSnap => {
      const data = docSnap.data();
      const username = docSnap.id;
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${username}</td>
        <td>${data.password}</td>
        <td>${data.disabled ? 'Disabilitato' : 'Attivo'}</td>
        <td>
          <button onclick="toggleUserStatus('${username}', ${data.disabled})">
            <i class="fas ${data.disabled ? 'fa-toggle-off' : 'fa-toggle-on'}"></i>
            ${data.disabled ? 'Attiva' : 'Disattiva'}
          </button>
        </td>
      `;
      tbody.appendChild(tr);
    });
  }).catch(err => console.error(err));
}

function toggleUserStatus(username, currentDisabled) {
  const newStatus = !currentDisabled;
  setDoc(doc(db, "users", username), { disabled: newStatus }, { merge: true })
    .then(() => {
      populateCredentialsTable();
      showNotification(`Utente ${username} ${newStatus ? 'disabilitato' : 'attivato'}.`);
    })
    .catch(err => {
      console.error(err);
      showNotification("Errore durante l'aggiornamento dello stato.");
    });
}

// FUNZIONE PER CREARE UTENTI DI DEFAULT (ADMIN + 200 USER)
function createDefaultUsers() {
  if (currentRole !== "admin") {
    showNotification("Solo l'amministratore può creare utenti di default.");
    return;
  }
  const batch = writeBatch(db);

  // Creazione del documento per l'admin
  const adminDoc = doc(db, "users", "admin");
  batch.set(adminDoc, {
    password: "passwordAdmin",
    role: "admin",
    disabled: false
  });

  // Creazione di 200 utenti (user001, user002, …, user200)
  for (let i = 1; i <= 200; i++) {
    const userId = `user${String(i).padStart(3, '0')}`;
    const userDoc = doc(db, "users", userId);
    batch.set(userDoc, {
      password: `pass${String(i).padStart(3, '0')}`,
      role: "user",
      disabled: false
    });
  }

  batch.commit().then(() => {
    showNotification("Utenti di default creati con successo.");
    populateCredentialsTable();
  }).catch(err => {
    console.error("Errore nella creazione degli utenti di default:", err);
    showNotification("Errore nella creazione degli utenti di default.");
  });
}

// Note Admin
function loadAdminNotesRealtime() {
  const notesDoc = doc(db, "admin", "notes");
  onSnapshot(notesDoc, docSnap => {
    if (docSnap.exists()) {
      const noteText = docSnap.data().text || "";
      document.getElementById("notes-content").textContent = noteText;
      if (currentRole === "admin") {
        document.getElementById("admin-notes").value = noteText;
      }
    } else {
      setDoc(notesDoc, { text: "" });
      document.getElementById("notes-content").textContent = "";
    }
  });
}

function saveAdminNotes() {
  if (currentRole !== "admin") {
    showNotification("Non hai i permessi per modificare le note.");
    return;
  }
  const text = document.getElementById("admin-notes").value;
  setDoc(doc(db, "admin", "notes"), { text })
    .then(() => showNotification("Note salvate con successo."))
    .catch(err => {
      console.error("Errore salvataggio note:", err);
      showNotification("Errore durante il salvataggio delle note.");
    });
}

// Immagini Admin
function loadAdminImagesRealtime() {
  const imagesDoc = doc(db, "admin", "images");
  onSnapshot(imagesDoc, docSnap => {
    const container = document.getElementById("login-images-container");
    container.innerHTML = "";
    if (docSnap.exists()) {
      const data = docSnap.data();
      for (let i = 1; i <= 10; i++) {
        const urlField = `image${i}URL`;
        const linkField = `image${i}Link`;
        const url = data[urlField] || "";
        const link = data[linkField] || "";
        if (url) {
          const a = document.createElement("a");
          a.href = link || "#";
          a.target = "_blank";
          const img = document.createElement("img");
          img.src = url;
          img.alt = `Immagine ${i}`;
          a.appendChild(img);
          container.appendChild(a);
        }
        if (currentRole === "admin") {
          document.getElementById(`image${i}URL`).value = data[urlField] || "";
          document.getElementById(`image${i}Link`).value = data[linkField] || "";
        }
      }
    } else {
      let initialData = {};
      for (let i = 1; i <= 10; i++) {
        initialData[`image${i}URL`] = "";
        initialData[`image${i}Link`] = "";
      }
      setDoc(imagesDoc, initialData);
    }
  });
}

function saveAdminImages() {
  if (currentRole !== "admin") {
    showNotification("Non hai i permessi per modificare le immagini.");
    return;
  }
  let payload = {};
  for (let i = 1; i <= 10; i++) {
    payload[`image${i}URL`] = document.getElementById(`image${i}URL`).value.trim();
    payload[`image${i}Link`] = document.getElementById(`image${i}Link`).value.trim();
  }
  setDoc(doc(db, "admin", "images"), payload)
    .then(() => showNotification("Immagini salvate con successo."))
    .catch(err => {
      console.error("Errore salvataggio immagini:", err);
      showNotification("Errore durante il salvataggio delle immagini.");
    });
}

// Funzioni varie
function toggleSections(isLoggedIn) {
  document.getElementById('login-area').style.display = isLoggedIn ? 'none' : 'flex';
  document.getElementById('app-area').style.display = isLoggedIn ? 'flex' : 'none';
}

function toggleAdminSection() {
  const adminSection = document.getElementById('admin-area');
  adminSection.style.display = (currentRole === "admin") ? 'block' : 'none';
  const adminNotes = document.getElementById('admin-notes');
  const saveNotesBtn = document.getElementById('save-notes-btn');
  if (currentRole === "admin") {
    adminNotes.style.display = 'block';
    saveNotesBtn.style.display = 'inline-block';
  } else {
    adminNotes.style.display = 'none';
    saveNotesBtn.style.display = 'none';
  }
}

/* Reset quotidiano (non elimina prenotazioni admin) */
function checkAndResetAfterTen() {
  const lastResetDate = localStorage.getItem('lastResetDate');
  const today = getTodayDate();
  const now = new Date();
  if (lastResetDate !== today && now.getHours() >= 10) {
    resetAllReservations();
    localStorage.setItem('lastResetDate', today);
  }
}

function resetAllReservations() {
  const today = getTodayDate();
  const reservationsQuery = query(collection(db, "reservations"), where("date", "==", today));
  getDocs(reservationsQuery).then(querySnapshot => {
    const batch = writeBatch(db);
    querySnapshot.forEach(docSnap => {
      const data = docSnap.data();
      if (data.user !== "admin") {
        batch.delete(doc(db, "reservations", docSnap.id));
      }
    });
    return batch.commit();
  }).then(() => {
    showNotification("Prenotazioni resettate per il nuovo giorno.");
    loadReservationsFromFirestore();
  }).catch(err => {
    console.error("Errore durante il reset:", err);
    showNotification("Errore durante il reset delle prenotazioni.");
  });
}
