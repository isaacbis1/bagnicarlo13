/***********************
 *  DISABILITA TASTO DESTRO E SCORCIATOIE
 ***********************/
// Disabilita menu tasto destro
document.addEventListener('contextmenu', (event) => {
  event.preventDefault();
});

// Disabilita alcune scorciatoie classiche (F12, Ctrl+U, Ctrl+S, ecc.)
document.addEventListener('keydown', (event) => {
  if (
    event.key === 'F12' ||                              // F12
    (event.ctrlKey && event.shiftKey && event.key === 'I') || // CTRL+SHIFT+I
    (event.ctrlKey && event.key === 'U') ||             // CTRL+U
    (event.ctrlKey && event.key === 'S') ||             // CTRL+S
    (event.ctrlKey && event.key === 'C')                // CTRL+C
  ) {
    event.preventDefault();
    return false;
  }
});

/***********************
 *  CONFIGURAZIONE FIREBASE
 ***********************/
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBivERuJvrO947t2Idv8DM3gZyfuqEQahw",
  authDomain: "campi-414b4.firebaseapp.com",
  databaseURL: "https://campi-414b4-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "campi-414b4",
  storageBucket: "campi-414b4.firebasestorage.app",
  messagingSenderId: "985324700492",
  appId: "1:985324700492:web:b8cb569e83bb2e24ed85e9",
  measurementId: "G-3W0ZKB4S5Q"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
/***********************
 *  VARIABILI GLOBALI
 ***********************/
let currentUser = null;
const adminUsername = "admin";
const adminPassword = "passwordAdmin";

const staticUsers = {
  "admin": "passwordAdmin",
  "user001": "pass001",
  "user002": "pass002",
  "user003": "pass003",
  "user004": "pass004",
  "user005": "pass005",
  "user006": "pass006",
  "user007": "pass007",
  "user008": "pass008",
  "user009": "pass009",
  "user010": "pass010",
  "user011": "pass011",
  "user012": "pass012",
  "user013": "pass013",
  "user014": "pass014",
  "user015": "pass015",
  "user016": "pass016",
  "user017": "pass017",
  "user018": "pass018",
  "user019": "pass019",
  "user020": "pass020",
  "user021": "pass021",
  "user022": "pass022",
  "user023": "pass023",
  "user024": "pass024",
  "user025": "pass025",
  "user026": "pass026",
  "user027": "pass027",
  "user028": "pass028",
  "user029": "pass029",
  "user030": "pass030",
  "user031": "pass031",
  "user032": "pass032",
  "user033": "pass033",
  "user034": "pass034",
  "user035": "pass035",
  "user036": "pass036",
  "user037": "pass037",
  "user038": "pass038",
  "user039": "pass039",
  "user040": "pass040",
  "user041": "pass041",
  "user042": "pass042",
  "user043": "pass043",
  "user044": "pass044",
  "user045": "pass045",
  "user046": "pass046",
  "user047": "pass047",
  "user048": "pass048",
  "user049": "pass049",
  "user050": "pass050",
  "user051": "pass051",
  "user052": "pass052",
  "user053": "pass053",
  "user054": "pass054",
  "user055": "pass055",
  "user056": "pass056",
  "user057": "pass057",
  "user058": "pass058",
  "user059": "pass059",
  "user060": "pass060",
  "user061": "pass061",
  "user062": "pass062",
  "user063": "pass063",
  "user064": "pass064",
  "user065": "pass065",
  "user066": "pass066",
  "user067": "pass067",
  "user068": "pass068",
  "user069": "pass069",
  "user070": "pass070",
  "user071": "pass071",
  "user072": "pass072",
  "user073": "pass073",
  "user074": "pass074",
  "user075": "pass075",
  "user076": "pass076",
  "user077": "pass077",
  "user078": "pass078",
  "user079": "pass079",
  "user080": "pass080",
  "user081": "pass081",
  "user082": "pass082",
  "user083": "pass083",
  "user084": "pass084",
  "user085": "pass085",
  "user086": "pass086",
  "user087": "pass087",
  "user088": "pass088",
  "user089": "pass089",
  "user090": "pass090",
  "user091": "pass091",
  "user092": "pass092",
  "user093": "pass093",
  "user094": "pass094",
  "user095": "pass095",
  "user096": "pass096",
  "user097": "pass097",
  "user098": "pass098",
  "user099": "pass099",
  "user100": "pass100",
  "user101": "pass101",
  "user102": "pass102",
  "user103": "pass103",
  "user104": "pass104",
  "user105": "pass105",
  "user106": "pass106",
  "user107": "pass107",
  "user108": "pass108",
  "user109": "pass109",
  "user110": "pass110",
  "user111": "pass111",
  "user112": "pass112",
  "user113": "pass113",
  "user114": "pass114",
  "user115": "pass115",
  "user116": "pass116",
  "user117": "pass117",
  "user118": "pass118",
  "user119": "pass119",
  "user120": "pass120",
  "user121": "pass121",
  "user122": "pass122",
  "user123": "pass123",
  "user124": "pass124",
  "user125": "pass125",
  "user126": "pass126",
  "user127": "pass127",
  "user128": "pass128",
  "user129": "pass129",
  "user130": "pass130",
  "user131": "pass131",
  "user132": "pass132",
  "user133": "pass133",
  "user134": "pass134",
  "user135": "pass135",
  "user136": "pass136",
  "user137": "pass137",
  "user138": "pass138",
  "user139": "pass139",
  "user140": "pass140",
  "user141": "pass141",
  "user142": "pass142",
  "user143": "pass143",
  "user144": "pass144",
  "user145": "pass145",
  "user146": "pass146",
  "user147": "pass147",
  "user148": "pass148",
  "user149": "pass149",
  "user150": "pass150",
  "user151": "pass151",
  "user152": "pass152",
  "user153": "pass153",
  "user154": "pass154",
  "user155": "pass155",
  "user156": "pass156",
  "user157": "pass157",
  "user158": "pass158",
  "user159": "pass159",
  "user160": "pass160",
  "user161": "pass161",
  "user162": "pass162",
  "user163": "pass163",
  "user164": "pass164",
  "user165": "pass165",
  "user166": "pass166",
  "user167": "pass167",
  "user168": "pass168",
  "user169": "pass169",
  "user170": "pass170",
  "user171": "pass171",
  "user172": "pass172",
  "user173": "pass173",
  "user174": "pass174",
  "user175": "pass175",
  "user176": "pass176",
  "user177": "pass177",
  "user178": "pass178",
  "user179": "pass179",
  "user180": "pass180",
  "user181": "pass181",
  "user182": "pass182",
  "user183": "pass183",
  "user184": "pass184",
  "user185": "pass185",
  "user186": "pass186",
  "user187": "pass187",
  "user188": "pass188",
  "user189": "pass189",
  "user190": "pass190",
  "user191": "pass191",
  "user192": "pass192",
  "user193": "pass193",
  "user194": "pass194",
  "user195": "pass195",
  "user196": "pass196",
  "user197": "pass197",
  "user198": "pass198",
  "user199": "pass199",
  "user200": "pass200"
};

for (let i = 1; i <= 200; i++) {
  const userKey = `user${String(i).padStart(3, '0')}`;
  const passKey = `pass${String(i).padStart(3, '0')}`;
  staticUsers[userKey] = passKey;
}

/***********************
 *  TIME SLOTS & RESERVATIONS
 ***********************/
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

  // Carichiamo le immagini in tempo reale (anche per la pagina di login)
  loadAdminImagesRealtime();
}

function authenticateStaticUser(username, password) {
  if (staticUsers[username] && staticUsers[username] === password) {
    // Controlliamo se l'utente è disabilitato in Firestore
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

      // Carichiamo le immagini in tempo reale
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
  // Impedisce prenotazioni multiple in un solo giorno per i NON-admin
  if (currentUser !== adminUsername && userHasBookingToday()) {
    showNotification('Hai già effettuato una prenotazione per oggi.');
    return;
  }
  // Controllo se slot è già prenotato
  if (reservations[fieldName][today][slot]) {
    showNotification('Questo slot è già prenotato.');
    return;
  }
  // Salviamo la prenotazione su Firestore
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
      // Se c'è in staticUsers, lo prendiamo. Altrimenti "N/A"
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
  db.collection("users").doc(username).set({ disabled: newStatus }, { merge: true })
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
function loadAdminNotesRealtime() {
  db.collection("admin").doc("notes").onSnapshot(doc => {
    if (doc.exists) {
      const noteText = doc.data().text || "";
      document.getElementById("notes-content").textContent = noteText;

      if (currentUser === adminUsername) {
        document.getElementById("admin-notes").value = noteText;
      }
    } else {
      db.collection("admin").doc("notes").set({ text: "" });
      document.getElementById("notes-content").textContent = "";
    }
  });
}

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
 *  SEZIONE IMMAGINI ADMIN (max 10)
 ***********************/
function loadAdminImagesRealtime() {
  db.collection("admin").doc("images").onSnapshot(doc => {
    const container = document.getElementById("login-images-container");
    container.innerHTML = ""; // Svuotiamo prima di ri-renderizzare

    if (doc.exists) {
      const data = doc.data();

      // Cicliamo su 1..10
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
      }

      // Se l'utente è admin, aggiorniamo i campi di input
      if (currentUser === adminUsername) {
        for (let i = 1; i <= 10; i++) {
          document.getElementById(`image${i}URL`).value = data[`image${i}URL`] || "";
          document.getElementById(`image${i}Link`).value = data[`image${i}Link`] || "";
        }
      }
    } else {
      // Creiamo il documento se non esiste
      const initialData = {};
      for (let i = 1; i <= 10; i++) {
        initialData[`image${i}URL`] = "";
        initialData[`image${i}Link`] = "";
      }
      db.collection("admin").doc("images").set(initialData);
    }
  });
}

function saveAdminImages() {
  if (currentUser !== adminUsername) {
    showNotification("Non hai i permessi per modificare le immagini.");
    return;
  }

  // Prepariamo i campi da salvare
  const payload = {};
  for (let i = 1; i <= 10; i++) {
    payload[`image${i}URL`] = document.getElementById(`image${i}URL`).value.trim();
    payload[`image${i}Link`] = document.getElementById(`image${i}Link`).value.trim();
  }

  db.collection("admin").doc("images").set(payload)
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

  // Mostra/occulta la sezione note riservata all'admin
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

  // Carichiamo subito le immagini (anche prima del login) per vederle nella home
  loadAdminImagesRealtime();
});
