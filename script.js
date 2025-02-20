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

const staticUsers = {
  "admin": "passwordAdmin",
  "user001": "telz",
  "user002": "lbwg",
  "user003": "ccyn",
  "user004": "ngkj",
  "user005": "ttdt",
  "user006": "pxut",
  "user007": "pmlv",
  "user008": "mtva",
  "user009": "zvbl",
  "user010": "hhps",
  "user011": "vkts",
  "user012": "oyun",
  "user013": "suwu",
  "user014": "fost",
  "user015": "gozk",
  "user016": "oizk",
  "user017": "woio",
  "user018": "tixg",
  "user019": "imvd",
  "user020": "brce",
  "user021": "hvht",
  "user022": "xabg",
  "user023": "oyco",
  "user024": "ahkg",
  "user025": "ufin",
  "user026": "cgit",
  "user027": "yztn",
  "user028": "afwf",
  "user029": "onqw",
  "user030": "nsiw",
  "user031": "aqag",
  "user032": "jxbz",
  "user033": "jpbu",
  "user034": "ewuk",
  "user035": "rzgr",
  "user036": "rymg",
  "user037": "dxcy",
  "user038": "lnfa",
  "user039": "fubn",
  "user040": "ykhu",
  "user041": "gmwv",
  "user042": "qkwy",
  "user043": "amrn",
  "user044": "obkg",
  "user045": "wljh",
  "user046": "kcrw",
  "user047": "qwiu",
  "user048": "yrdu",
  "user049": "ifjx",
  "user050": "mxjf",
  "user051": "igpp",
  "user052": "atnf",
  "user053": "weio",
  "user054": "hpfe",
  "user055": "ypan",
  "user056": "sbyk",
  "user057": "qmaz",
  "user058": "vfel",
  "user059": "kksa",
  "user060": "jlwa",
  "user061": "dzxf",
  "user062": "whfw",
  "user063": "nhvy",
  "user064": "jixm",
  "user065": "luzs",
  "user066": "qadq",
  "user067": "hsmp",
  "user068": "ngin",
  "user069": "njbf",
  "user070": "jzsf",
  "user071": "pgwi",
  "user072": "hdfb",
  "user073": "rcdo",
  "user074": "makw",
  "user075": "ulmn",
  "user076": "nxza",
  "user077": "lnsr",
  "user078": "qpxg",
  "user079": "umhk",
  "user080": "gwat",
  "user081": "jrfu",
  "user082": "gzkg",
  "user083": "uloh",
  "user084": "jdng",
  "user085": "qwqm",
  "user086": "ldkz",
  "user087": "bsam",
  "user088": "idlf",
  "user089": "ymuy",
  "user090": "ence",
  "user091": "ylef",
  "user092": "tpeo",
  "user093": "syzw",
  "user094": "bnqo",
  "user095": "sepf",
  "user096": "rhry",
  "user097": "aoqe",
  "user098": "aspf",
  "user099": "hmnh",
  "user100": "hxib",
  "user101": "pzcx",
  "user102": "erpp",
  "user103": "eeky",
  "user104": "bsqp",
  "user105": "npfu",
  "user106": "nfaf",
  "user107": "vfcj",
  "user108": "frhn",
  "user109": "hwrc",
  "user110": "bewf",
  "user111": "ndpl",
  "user112": "kcfj",
  "user113": "kjoc",
  "user114": "mijd",
  "user115": "bpkt",
  "user116": "dbhj",
  "user117": "nniy",
  "user118": "koyz",
  "user119": "oyzv",
  "user120": "evtl",
  "user121": "kfrn",
  "user122": "mqqh",
  "user123": "bnts",
  "user124": "hpjq",
  "user125": "ewmh",
  "user126": "xxam",
  "user127": "hxau",
  "user128": "qoxv",
  "user129": "tlrn",
  "user130": "hqyg",
  "user131": "vzxz",
  "user132": "zrtm",
  "user133": "nqua",
  "user134": "cpbj",
  "user135": "oxre",
  "user136": "foaw",
  "user137": "wcib",
  "user138": "tsnn",
  "user139": "peqw",
  "user140": "bmts",
  "user141": "acsr",
  "user142": "rfkt",
  "user143": "mbmf",
  "user144": "tqzo",
  "user145": "sbeb",
  "user146": "ykyy",
  "user147": "perp",
  "user148": "bdfm",
  "user149": "nwsh",
  "user150": "bsrf",
  "user151": "wlgj",
  "user152": "fubc",
  "user153": "dqjb",
  "user154": "tuxw",
  "user155": "zlgk",
  "user156": "kxem",
  "user157": "gupe",
  "user158": "ddtv",
  "user159": "flci",
  "user160": "utvi",
  "user161": "cwna",
  "user162": "rttu",
  "user163": "ewlj",
  "user164": "eykt",
  "user165": "blhu",
  "user166": "sdfn",
  "user167": "exvr",
  "user168": "tpvd",
  "user169": "ateh",
  "user170": "vusg",
  "user171": "xclo",
  "user172": "zcbt",
  "user173": "plce",
  "user174": "jdfd",
  "user175": "xole",
  "user176": "lpgs",
  "user177": "actt",
  "user178": "vmfg",
  "user179": "cqbt",
  "user180": "tiyq",
  "user181": "znco",
  "user182": "adnu",
  "user183": "foar",
  "user184": "cbgn",
  "user185": "djty",
  "user186": "rswa",
  "user187": "nzlt",
  "user188": "lrlh",
  "user189": "jzni",
  "user190": "mejl",
  "user191": "hxvu",
  "user192": "loem",
  "user193": "uqeo",
  "user194": "iawt",
  "user195": "jsoi",
  "user196": "fpby",
  "user197": "ceel",
  "user198": "ecsl",
  "user199": "sqxb",
  "user200": "dpqd"
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
