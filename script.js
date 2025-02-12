/***********************
 *  CONFIGURAZIONE FIREBASE
 ***********************/
const firebaseConfig = {
  // Sostituisci con le tue credenziali Firebase
  apiKey: "AIzaSyBivERu...",
  authDomain: "campi-414b4.firebaseapp.com",
  projectId: "campi-414b4",
  storageBucket: "campi-414b4.firebasestorage.app",
  messagingSenderId: "985324700492",
  appId: "1:985324700492:web:b8cb569e83bb2e24ed85e9",
  measurementId: "G-3W0ZKB4S5Q"
};

// Inizializzazione Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

/***********************
 *  VARIABILI GLOBALI
 ***********************/
let currentUser = null;
const adminUsername = "admin";
const adminPassword = "passwordAdmin";

// Hardcoded static users per 200 utenti (esempio abbreviato)
const staticUsers = {
  "admin": adminPassword,
  "user001": "jcne",
  "user002": "hoyw",
  /* ... */
  "user200": "drmf"
};

// Time slots
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

/***********************
 *  FUNZIONI UTILITY
 ***********************/
function getTodayDate() {
  const today = new Date();
  let yyyy = today.getFullYear();
  let mm = String(today.getMonth() + 1).padStart(2, '0');
  let dd = String(today.getDate()).padStart(2, '0');
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

/***********************
 *  LOGIN & LOGOUT
 ***********************/
function login() {
  const username = document.getElementById('username').value.trim();
  const password = document.getElementById('password').value.trim();

  if (!username || !password) {
    showNotification('Inserisci username e password.');
    return;
  }

  if (username === adminUsername && password === adminPassword) {
    authenticateUser(username);
  } else {
    authenticateStaticUser(username, password);
  }
}

function authenticateUser(username) {
  currentUser = username;
  toggleSections(true);
  toggleAdminSection();
  loadReservationsFromFirestore();
  checkAndResetAfterTen();
  showNotification(`Benvenuto, ${username}!`);

  // Carichiamo le note (e le ascoltiamo in tempo reale) per tutti gli utenti
  loadAdminNotesRealtime();

  // Carichiamo le immagini in tempo reale (per login)
  loadAdminImagesRealtime();
}

function authenticateStaticUser(username, password) {
  if (staticUsers[username] && staticUsers[username] === password) {
    db.collection("users").doc(username).get().then(doc => {
      const disabled = doc.exists ? doc.data().disabled : false;
      if (disabled) {
        showNotification("Questo utente è disabilitato.");
        return;
      }
      currentUser = username;
      toggleSections(true);
      toggleAdminSection();
      loadReservationsFromFirestore();
      checkAndResetAfterTen();
      showNotification(`Benvenuto, ${username}!`);
      
      // Carichiamo le note in tempo reale
      loadAdminNotesRealtime();

      // Carichiamo le immagini in tempo reale (per login)
      loadAdminImagesRealtime();
    }).catch(err => {
      console.error(err);
      showNotification("Errore durante il login.");
    });
  } else {
    showNotification("Credenziali errate!");
  }
}

function logout() {
  currentUser = null;
  toggleSections(false);
  showNotification("Sei uscito con successo.");
}

/***********************
 *  FIRESTORE - PRENOTAZIONI
 ***********************/
function loadReservationsFromFirestore() {
  const today = getTodayDate();
  reservations = { "Volley1": {}, "Volley2": {}, "BasketCalcio": {}, "Ping-pong": {} };

  db.collection("reservations")
    .where("date", "==", today)
    .get()
    .then(querySnapshot => {
      querySnapshot.forEach(doc => {
        const { field, time, user } = doc.data();
        if (!reservations[field][today]) reservations[field][today] = {};
        reservations[field][today][time] = user;
      });
      populateAllFields();
      listenRealtimeForToday();
    })
    .catch(err => {
      console.error("Errore caricamento prenotazioni:", err);
      showNotification("Errore caricamento prenotazioni.");
    });
}

function listenRealtimeForToday() {
  const today = getTodayDate();
  db.collection("reservations")
    .where("date", "==", today)
    .onSnapshot(snapshot => {
      reservations = { "Volley1": {}, "Volley2": {}, "BasketCalcio": {}, "Ping-pong": {} };
      snapshot.forEach(doc => {
        const { field, time, user } = doc.data();
        if (!reservations[field][today]) reservations[field][today] = {};
        reservations[field][today][time] = user;
      });
      populateAllFields();
      populateAdminTable();
      if (currentUser === adminUsername) {
        populateCredentialsTable();
      }
    });
}

function saveReservationToFirestore(fieldName, date, time, user, role) {
  const docId = `${fieldName}_${date}_${time}_${user}`;
  return db.collection("reservations").doc(docId).set({ field: fieldName, date, time, user, role });
}

function deleteReservationFromFirestore(fieldName, date, time, user) {
  const docId = `${fieldName}_${date}_${time}_${user}`;
  return db.collection("reservations").doc(docId).delete();
}

/***********************
 *  GESTIONE PRENOTAZIONI & UI
 ***********************/
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
  if (currentUser !== adminUsername && userHasBookingToday()) {
    showNotification('Hai già effettuato una prenotazione per oggi.');
    return;
  }
  if (reservations[fieldName][today][slot]) {
    showNotification('Questo slot è già prenotato.');
    return;
  }
  db.collection("users").doc(currentUser).get().then(doc => {
    const role = doc.exists ? doc.data().role : "user";
    saveReservationToFirestore(fieldName, today, slot, currentUser, role)
      .then(() => showNotification(`Prenotazione effettuata: ${fieldName} alle ${slot}`))
      .catch(err => {
        console.error("Errore durante la prenotazione:", err);
        showNotification("Errore durante la prenotazione.");
      });
  }).catch(err => {
    console.error("Errore recupero ruolo utente:", err);
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

/***********************
 *  FUNZIONI ADMINISTRATIVE
 ***********************/
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
  db.collection("users").get().then(snapshot => {
    snapshot.forEach(doc => {
      const data = doc.data();
      const username = doc.id;
      const password = staticUsers[username] || "N/A";
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${username}</td>
        <td>${password}</td>
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
  db.collection("users").doc(username).update({ disabled: newStatus })
    .then(() => {
      populateCredentialsTable();
      showNotification(`Utente ${username} ${newStatus ? 'disabilitato' : 'attivato'}.`);
    })
    .catch(err => {
      console.error(err);
      showNotification("Errore durante l'aggiornamento dello stato.");
    });
}

/***********************
 *  SEZIONE NOTE ADMIN
 ***********************/
/* Ascolto in tempo reale del documento "notes" (collezione "admin") 
   in modo che tutti vedano subito le modifiche. */
function loadAdminNotesRealtime() {
  db.collection("admin").doc("notes").onSnapshot(doc => {
    if (doc.exists) {
      const noteText = doc.data().text || "";
      // Mostra il contenuto a tutti
      document.getElementById("notes-content").textContent = noteText;

      // Se utente è admin, popola anche la textarea
      if (currentUser === adminUsername) {
        document.getElementById("admin-notes").value = noteText;
      }
    } else {
      // Se non esiste, lo creiamo con testo vuoto
      db.collection("admin").doc("notes").set({ text: "" });
      document.getElementById("notes-content").textContent = "";
    }
  });
}

// Salva il contenuto della textarea su Firestore
function saveAdminNotes() {
  if (currentUser !== adminUsername) {
    showNotification("Non hai i permessi per modificare le note.");
    return;
  }
  const text = document.getElementById("admin-notes").value;
  db.collection("admin").doc("notes").set({ text })
    .then(() => {
      showNotification("Note salvate con successo.");
    })
    .catch(err => {
      console.error("Errore salvataggio note:", err);
      showNotification("Errore durante il salvataggio delle note.");
    });
}

/***********************
 *  SEZIONE IMMAGINI ADMIN (NUOVA)
 ***********************/
function loadAdminImagesRealtime() {
  db.collection("admin").doc("images").onSnapshot(doc => {
    if (doc.exists) {
      const data = doc.data();

      // Gestione immagine sinistra
      const leftContainer = document.getElementById("left-image-container");
      if (data.leftURL) {
        leftContainer.innerHTML = `
          <a href="${data.leftLink || '#'}" target="_blank">
            <img src="${data.leftURL}" alt="Immagine Sinistra" />
          </a>
        `;
      } else {
        leftContainer.innerHTML = '';
      }

      // Gestione immagine destra
      const rightContainer = document.getElementById("right-image-container");
      if (data.rightURL) {
        rightContainer.innerHTML = `
          <a href="${data.rightLink || '#'}" target="_blank">
            <img src="${data.rightURL}" alt="Immagine Destra" />
          </a>
        `;
      } else {
        rightContainer.innerHTML = '';
      }

      // Se l'utente è admin, aggiorna gli input
      if (currentUser === adminUsername) {
        document.getElementById("left-image-url").value = data.leftURL || "";
        document.getElementById("left-image-link").value = data.leftLink || "";
        document.getElementById("right-image-url").value = data.rightURL || "";
        document.getElementById("right-image-link").value = data.rightLink || "";
      }
    } else {
      // Creiamo il documento se non esiste
      db.collection("admin").doc("images").set({
        leftURL: "",
        leftLink: "",
        rightURL: "",
        rightLink: ""
      });
    }
  });
}

function saveAdminImages() {
  if (currentUser !== adminUsername) {
    showNotification("Non hai i permessi per modificare le immagini.");
    return;
  }

  const leftURL = document.getElementById("left-image-url").value.trim();
  const leftLink = document.getElementById("left-image-link").value.trim();
  const rightURL = document.getElementById("right-image-url").value.trim();
  const rightLink = document.getElementById("right-image-link").value.trim();

  db.collection("admin").doc("images").set({
    leftURL,
    leftLink,
    rightURL,
    rightLink
  })
  .then(() => {
    showNotification("Immagini salvate con successo.");
  })
  .catch(err => {
    console.error("Errore salvataggio immagini:", err);
    showNotification("Errore durante il salvataggio delle immagini.");
  });
}

/***********************
 *  FUNZIONI VARIE
 ***********************/
function toggleSections(isLoggedIn) {
  document.getElementById('login-area').style.display = isLoggedIn ? 'none' : 'flex';
  document.getElementById('app-area').style.display = isLoggedIn ? 'flex' : 'none';
}

function toggleAdminSection() {
  const adminSection = document.getElementById('admin-area');
  adminSection.style.display = (currentUser === adminUsername) ? 'block' : 'none';

  // Mostra/occulta gli elementi della sezione note riservati all'admin
  const adminNotes = document.getElementById('admin-notes');
  const saveNotesBtn = document.getElementById('save-notes-btn');
  if (currentUser === adminUsername) {
    adminNotes.style.display = 'block';
    saveNotesBtn.style.display = 'inline-block';
  } else {
    adminNotes.style.display = 'none';
    saveNotesBtn.style.display = 'none';
  }
}

/* Il reset quotidiano non elimina le prenotazioni effettuate dall'admin */
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
  db.collection("reservations")
    .where("date", "==", today)
    .get()
    .then(snapshot => {
      const batch = db.batch();
      snapshot.forEach(doc => {
        const data = doc.data();
        // Non eliminare le prenotazioni effettuate dall'admin
        if (data.user !== adminUsername) {
          batch.delete(doc.ref);
        }
      });
      return batch.commit();
    })
    .then(() => {
      showNotification("Prenotazioni resettate per il nuovo giorno.");
      loadReservationsFromFirestore();
    })
    .catch(err => {
      console.error("Errore durante il reset:", err);
      showNotification("Errore durante il reset delle prenotazioni.");
    });
}

/***********************
 *  INIZIALIZZAZIONE
 ***********************/
document.addEventListener('DOMContentLoaded', () => {
  // Inizialmente, nascondiamo l'app-area
  toggleSections(false);

  // Se vuoi caricare da subito le immagini (anche prima del login), decommenta:
  // loadAdminImagesRealtime();
  // In questo modo, compariranno eventuali immagini anche se l'utente non è loggato.
});
