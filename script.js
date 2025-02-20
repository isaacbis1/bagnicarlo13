/***********************
 * DISABILITA TASTO DESTRO E SCORCIATOIE
 ***********************/
document.addEventListener('contextmenu', (evt) => evt.preventDefault());
document.addEventListener('keydown', (evt) => {
  if (
    evt.key === 'F12' ||
    (evt.ctrlKey && evt.shiftKey && evt.key === 'I') ||
    (evt.ctrlKey && evt.key === 'U') ||
    (evt.ctrlKey && evt.key === 'S') ||
    (evt.ctrlKey && evt.key === 'C')
  ) {
    evt.preventDefault();
    return false;
  }
});

/***********************
 *  CONFIGURAZIONE FIREBASE
 ***********************/
const firebaseConfig = {
  // Sostituisci con le tue credenziali
  apiKey: "AIzaSyBivERu...",
  authDomain: "campi-414b4.firebaseapp.com",
  projectId: "campi-414b4",
  storageBucket: "campi-414b4.appspot.com",
  messagingSenderId: "985324700492",
  appId: "1:985324700492:web:b8cb569e83bb2e24ed85e9",
  measurementId: "G-3W0ZKB4S5Q"
};
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

/***********************
 *  VARIABILI GLOBALI
 ***********************/
// Conterrà tutti i campi (admin + userXXX) dal doc "admin/dictionary"
let dictionaryData = {};  

// Riferimento al doc "admin/dictionary"
const dictionaryRef = db.collection("admin").doc("dictionary");

// Admin / User
let currentUserEmail = null;  // se admin => "admin", se user => "user123"
let isAdmin = false;          // true se admin

// Prenotazioni
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
 *  UTILITY
 ***********************/
function getTodayDate() {
  const today = new Date();
  let yyyy = today.getFullYear();
  let mm = String(today.getMonth() + 1).padStart(2, '0');
  let dd = String(today.getDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
}

function showNotification(msg) {
  const container = document.getElementById('notification-container');
  const div = document.createElement('div');
  div.classList.add('notification');
  div.textContent = msg;
  container.appendChild(div);
  setTimeout(() => div.remove(), 3000);
}

/***********************
 *  ON LOAD
 ***********************/
document.addEventListener('DOMContentLoaded', () => {
  toggleSections(false); 
  loadDictionaryRealtime();        // Carichiamo subito il dictionary
  loadAdminImagesRealtime();       // Carichiamo subito le immagini di login
});

/***********************
 *  TOGGLE ADMIN / USER
 ***********************/
function toggleAdminUser(showAdmin) {
  document.getElementById('admin-login-section').style.display = showAdmin ? 'block' : 'none';
  document.getElementById('user-login-section').style.display = showAdmin ? 'none' : 'block';
}

/***********************
 *  CARICA DICTIONARY IN TEMPO REALE
 ***********************/
function loadDictionaryRealtime() {
  dictionaryRef.onSnapshot(docSnap => {
    if (docSnap.exists) {
      dictionaryData = docSnap.data();  
      // Se admin è loggato, ricarichiamo la tabella delle password
      if (isAdmin) {
        populateDictionaryTable();
      }
    } else {
      // Creiamo doc "dictionary" se non esiste
      // Esempio con un admin e pochi user
     const dictionaryData = {
  "admin": "adminPassword",   // se vuoi gestire l'admin all'interno dello stesso doc
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

      dictionaryRef.set(initialDict).then(() => {
        dictionaryData = initialDict;
      });
    }
  }, err => {
    console.error("Errore loadDictionaryRealtime:", err);
  });
}

/***********************
 *  LOGIN ADMIN
 ***********************/
function adminLogin() {
  const username = document.getElementById('admin-username').value.trim();
  const password = document.getElementById('admin-password').value.trim();

  // Controllo su dictionaryData["admin"]
  if (!dictionaryData["admin"]) {
    showNotification("Dictionary non ancora caricato o admin non presente.");
    return;
  }

  if (username === "admin" && dictionaryData["admin"] === password) {
    isAdmin = true;
    currentUserEmail = "admin";  
    showNotification("Login Admin effettuato!");
    toggleSections(true);
    toggleAdminSection();

    loadReservationsFromFirestore();
    checkAndResetAfterTen();
    loadAdminNotesRealtime();
    // loadDictionaryRealtime() è già attivo, quando rientriamo da admin
    populateDictionaryTable(); // per sicurezza
  } else {
    showNotification("Credenziali Admin errate!");
  }
}

/***********************
 *  LOGIN USER (DAL DICTIONARY)
 ***********************/
function userLoginDictionary() {
  const email = document.getElementById('user-email').value.trim();
  const phone = document.getElementById('user-phone').value.trim();
  const dictUser = document.getElementById('user-username').value.trim();
  const dictPass = document.getElementById('user-userpass').value.trim();

  if (!email || !phone || !dictUser || !dictPass) {
    showNotification("Compila tutti i campi!");
    return;
  }

  // Verifica se esiste in dictionaryData
  if (!dictionaryData[dictUser]) {
    showNotification("Username non presente nel dizionario!");
    return;
  }
  // Confronta password
  if (dictionaryData[dictUser] !== dictPass) {
    showNotification("Password errata per " + dictUser);
    return;
  }

  // Se ok, salviamo email/phone/dictUser in "registrations"
  db.collection("registrations").add({
    email,
    phone,
    username: dictUser,
    createdAt: firebase.firestore.FieldValue.serverTimestamp()
  }).then(() => {
    showNotification("Dati salvati. Benvenuto " + dictUser);
    isAdmin = false;
    currentUserEmail = dictUser; // "user001" etc.

    toggleSections(true);
    toggleAdminSection();
    loadReservationsFromFirestore();
    checkAndResetAfterTen();
    loadAdminNotesRealtime();
  }).catch(err => {
    console.error("Errore salvataggio dati user:", err);
    showNotification("Errore salvataggio dati, riprova più tardi.");
  });
}

/***********************
 *  LOGOUT
 ***********************/
function logout() {
  currentUserEmail = null;
  isAdmin = false;
  toggleSections(false);
  showNotification("Sei uscito con successo.");
}

/***********************
 *  PRENOTAZIONI
 ***********************/
function loadReservationsFromFirestore() {
  const today = getTodayDate();
  reservations = { "Volley1": {}, "Volley2": {}, "BasketCalcio": {}, "Ping-pong": {} };

  db.collection("reservations")
    .where("date", "==", today)
    .get()
    .then(qs => {
      qs.forEach(doc => {
        const { field, time, userEmail } = doc.data();
        if (!reservations[field][today]) reservations[field][today] = {};
        reservations[field][today][time] = userEmail;
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
    .where("date","==",today)
    .onSnapshot(snapshot => {
      reservations = { "Volley1": {}, "Volley2": {}, "BasketCalcio": {}, "Ping-pong": {} };
      snapshot.forEach(doc => {
        const { field, time, userEmail } = doc.data();
        if (!reservations[field][today]) reservations[field][today] = {};
        reservations[field][today][time] = userEmail;
      });
      populateAllFields();
      populateAdminTable();
      if (isAdmin) {
        populateRegistrationsTable();
      }
    });
}

function saveReservationToFirestore(fieldName, date, time, userEmail) {
  const docId = `${fieldName}_${date}_${time}_${userEmail}`;
  return db.collection("reservations").doc(docId).set({ field: fieldName, date, time, userEmail });
}

function deleteReservationFromFirestore(fieldName, date, time, userEmail) {
  const docId = `${fieldName}_${date}_${time}_${userEmail}`;
  return db.collection("reservations").doc(docId).delete();
}

function userHasBookingToday() {
  const today = getTodayDate();
  for (let field in reservations) {
    if (reservations[field][today]) {
      for (let slot in reservations[field][today]) {
        if (reservations[field][today][slot] === currentUserEmail) {
          return true;
        }
      }
    }
  }
  return false;
}

/***********************
 *  POPOLA CAMPI
 ***********************/
function populateAllFields() {
  ["Volley1","Volley2","BasketCalcio","Ping-pong"].forEach(field => populateFieldSlots(field));
}

function populateFieldSlots(fieldName) {
  const container = document.getElementById(`slots-${fieldName}`);
  container.innerHTML = '';
  const today = getTodayDate();
  if (!reservations[fieldName][today]) reservations[fieldName][today] = {};

  timeSlots.forEach(slot => {
    const slotDiv = document.createElement('div');
    slotDiv.classList.add('slot');
    const bookedBy = reservations[fieldName][today][slot];

    if (bookedBy) {
      if (bookedBy === currentUserEmail) {
        slotDiv.classList.add('my-booking');
        slotDiv.textContent = `${slot} - Prenotato da te`;
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
  if (!isAdmin && userHasBookingToday()) {
    showNotification("Hai già una prenotazione per oggi.");
    return;
  }
  if (reservations[fieldName][today][slot]) {
    showNotification("Slot già prenotato.");
    return;
  }
  saveReservationToFirestore(fieldName, today, slot, currentUserEmail)
    .then(() => showNotification(`Prenotazione effettuata su ${fieldName} alle ${slot}`))
    .catch(err => {
      console.error("Errore prenotazione:", err);
      showNotification("Errore durante la prenotazione.");
    });
}

function cancelUserReservation(fieldName, slot) {
  const today = getTodayDate();
  if (reservations[fieldName][today][slot] === currentUserEmail) {
    deleteReservationFromFirestore(fieldName, today, slot, currentUserEmail)
      .then(() => showNotification("Prenotazione annullata."))
      .catch(err => {
        console.error("Errore annullamento:", err);
        showNotification("Errore durante l'annullamento.");
      });
  } else {
    showNotification("Non puoi annullare la prenotazione di altri.");
  }
}

/***********************
 *  ADMIN - PRENOTAZIONI
 ***********************/
function populateAdminTable() {
  const today = getTodayDate();
  const tbody = document.getElementById('admin-table');
  tbody.innerHTML = '';
  for (let field in reservations) {
    if (reservations[field][today]) {
      for (let time in reservations[field][today]) {
        const userEmail = reservations[field][today][time];
        const tr = document.createElement('tr');
        tr.innerHTML = `
          <td>${field}</td>
          <td>${today}</td>
          <td>${time}</td>
          <td>${userEmail}</td>
          <td>
            <button class="cancel-btn" onclick="deleteAdminReservation('${field}','${today}','${time}','${userEmail}')">
              <i class="fas fa-trash-alt"></i> Elimina
            </button>
          </td>
        `;
        tbody.appendChild(tr);
      }
    }
  }
}

function deleteAdminReservation(fieldName, date, time, userEmail) {
  deleteReservationFromFirestore(fieldName, date, time, userEmail)
    .then(() => showNotification(`Prenotazione eliminata per ${fieldName} alle ${time}`))
    .catch(err => {
      console.error("Errore eliminazione:", err);
      showNotification("Errore eliminazione prenotazione.");
    });
}

/***********************
 *  ADMIN - REGISTRAZIONI
 ***********************/
function populateRegistrationsTable() {
  const tbody = document.getElementById('registrations-table');
  tbody.innerHTML = '';
  db.collection("registrations").orderBy("createdAt","desc").get()
    .then(snapshot => {
      snapshot.forEach(doc => {
        const data = doc.data();
        let dateStr = "";
        if (data.createdAt && data.createdAt.toDate) {
          dateStr = data.createdAt.toDate().toLocaleString();
        }
        const tr = document.createElement('tr');
        tr.innerHTML = `
          <td>${data.email || ""}</td>
          <td>${data.phone || ""}</td>
          <td>${data.username || ""}</td>
          <td>${dateStr}</td>
        `;
        tbody.appendChild(tr);
      });
    })
    .catch(err => {
      console.error("Errore caricamento registrations:", err);
    });
}

/***********************
 *  ADMIN - GESTIONE DIZIONARIO (PASSWORD)
 ***********************/
function populateDictionaryTable() {
  const tbody = document.getElementById('dictionary-table');
  tbody.innerHTML = '';

  // Ordiniamo le chiavi in modo da vedere prima "admin", poi user001, user002 ...
  const allKeys = Object.keys(dictionaryData).sort(); 
  allKeys.forEach(username => {
    const pass = dictionaryData[username];
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${username}</td>
      <td>${pass}</td>
      <td>
        <button onclick="updateDictionaryPassword('${username}')"><i class="fas fa-edit"></i> Modifica Password</button>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

function updateDictionaryPassword(username) {
  const newPass = prompt(`Nuova password per ${username}:`);
  if (!newPass) return;
  dictionaryRef.update({ [username]: newPass })
    .then(() => {
      showNotification(`Password aggiornata per ${username}`);
    })
    .catch(err => {
      console.error("Errore updateDictionaryPassword:", err);
      showNotification("Errore durante l'aggiornamento della password.");
    });
}

/***********************
 *  NOTE ADMIN
 ***********************/
function loadAdminNotesRealtime() {
  db.collection("admin").doc("notes").onSnapshot(doc => {
    if (doc.exists) {
      const noteText = doc.data().text || "";
      document.getElementById("notes-content").textContent = noteText;
      if (isAdmin) {
        document.getElementById("admin-notes").value = noteText;
      }
    } else {
      db.collection("admin").doc("notes").set({ text: "" });
      document.getElementById("notes-content").textContent = "";
    }
  });
}

function saveAdminNotes() {
  if (!isAdmin) {
    showNotification("Non hai i permessi per modificare le note.");
    return;
  }
  const text = document.getElementById("admin-notes").value;
  db.collection("admin").doc("notes").set({ text })
    .then(() => showNotification("Note salvate con successo."))
    .catch(err => {
      console.error("Errore salvataggio note:", err);
      showNotification("Errore salvataggio note.");
    });
}

/***********************
 *  IMMAGINI ADMIN
 ***********************/
function loadAdminImagesRealtime() {
  db.collection("admin").doc("images").onSnapshot(doc => {
    const container = document.getElementById("login-images-container");
    container.innerHTML = "";
    if (doc.exists) {
      const data = doc.data();
      for (let i = 1; i <= 10; i++) {
        const url = data[`image${i}URL`] || "";
        const link = data[`image${i}Link`] || "";
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
      if (isAdmin) {
        for (let i = 1; i <= 10; i++) {
          document.getElementById(`image${i}URL`).value = data[`image${i}URL`] || "";
          document.getElementById(`image${i}Link`).value = data[`image${i}Link`] || "";
        }
      }
    } else {
      // Creiamo doc "images" se non esiste
      const initData = {};
      for (let i = 1; i <= 10; i++) {
        initData[`image${i}URL`] = "";
        initData[`image${i}Link`] = "";
      }
      db.collection("admin").doc("images").set(initData);
    }
  });
}

function saveAdminImages() {
  if (!isAdmin) {
    showNotification("Non hai i permessi per modificare le immagini.");
    return;
  }
  const payload = {};
  for (let i = 1; i <= 10; i++) {
    payload[`image${i}URL`] = document.getElementById(`image${i}URL`).value.trim();
    payload[`image${i}Link`] = document.getElementById(`image${i}Link`).value.trim();
  }
  db.collection("admin").doc("images").set(payload)
    .then(() => showNotification("Immagini salvate con successo."))
    .catch(err => {
      console.error("Errore salvataggio immagini:", err);
      showNotification("Errore durante il salvataggio delle immagini.");
    });
}

/***********************
 *  SEZIONI E RESET
 ***********************/
function toggleSections(isInApp) {
  document.getElementById('access-area').style.display = isInApp ? 'none' : 'flex';
  document.getElementById('app-area').style.display = isInApp ? 'flex' : 'none';
}
function toggleAdminSection() {
  const adminSec = document.getElementById('admin-area');
  if (isAdmin) {
    adminSec.style.display = 'block';
    document.getElementById('admin-notes').style.display = 'block';
    document.getElementById('save-notes-btn').style.display = 'inline-block';
  } else {
    adminSec.style.display = 'none';
    document.getElementById('admin-notes').style.display = 'none';
    document.getElementById('save-notes-btn').style.display = 'none';
  }
}

/* Reset dopo le 10, cancella le prenotazioni user, non admin */
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
    .where("date","==",today)
    .get()
    .then(snap => {
      const batch = db.batch();
      snap.forEach(doc => {
        const data = doc.data();
        // Non cancellare se "admin"
        if (data.userEmail !== "admin") {
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
      console.error("Errore reset:", err);
      showNotification("Errore durante il reset.");
    });
}
