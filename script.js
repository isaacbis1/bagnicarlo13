/*****************************************
 * DISABILITA TASTO DESTRO E SCORCIATOIE
 *****************************************/
document.addEventListener('contextmenu', (event) => event.preventDefault());
document.addEventListener('keydown', (event) => {
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

/*****************************************
 * CONFIGURAZIONE FIREBASE
 *****************************************/
// Sostituisci con le TUE credenziali del progetto Firebase
const firebaseConfig = {
  apiKey: "AIzaSyXXXXXX...",
  authDomain: "tuo-progetto.firebaseapp.com",
  projectId: "tuo-progetto",
  storageBucket: "tuo-progetto.appspot.com",
  messagingSenderId: "1234567890",
  appId: "1:1234567890:web:abcdefghilmnopqrs"
};

// Inizializza Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

/*****************************************
 * DIZIONARIO DI UTENTI (ADMIN + 200 user)
 *****************************************/
// Se vuoi caricare AUTOMATICAMENTE tutti i 200 user su Firestore,
// puoi richiamare la funzione `uploadAllUsersToFirestore()` una sola volta.
const dictionaryData = {
  "admin": "adminPassword",
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

// Riferimento al doc "admin/dictionary"
const dictionaryRef = db.collection("admin").doc("dictionary");

// Variabili di sessione
let dictionaryDataLive = {}; // qui ci salveremo i dati in realtime da Firestore
let currentUserEmail = null; // "admin" o "userXYZ"
let isAdmin = false;

/*****************************************
 *  FUNZIONE: Caricare tutti i 200 user su Firestore
 *****************************************/
function uploadAllUsersToFirestore() {
  // Sovrascrive o crea ex novo il doc "dictionary" in "admin"
  dictionaryRef.set(dictionaryData)
    .then(() => {
      console.log("Caricati tutti i 200 user + admin in Firestore!");
      alert("Operazione completata, controlla su Firestore nel doc 'admin/dictionary'.");
    })
    .catch(err => {
      console.error("Errore caricamento dictionary:", err);
      alert("Errore caricamento dictionary, vedi console.");
    });
}

/*****************************************
 * DOCUMENT READY
 *****************************************/
document.addEventListener('DOMContentLoaded', () => {
  toggleSections(false); // mostra la sezione di accesso
  loadDictionaryRealtime(); // carichiamo in realtime i dati del dictionary
  loadAdminImagesRealtime(); // carichiamo subito le immagini di login
});

/*****************************************
 *  CARICAMENTO REALTIME DEL DICTIONARY
 *****************************************/
function loadDictionaryRealtime() {
  dictionaryRef.onSnapshot(docSnap => {
    if (docSnap.exists) {
      dictionaryDataLive = docSnap.data();
      // Se l'admin è loggato, aggiorniamo la tabella
      if (isAdmin) {
        populateDictionaryTable();
      }
    } else {
      console.warn("Il doc 'admin/dictionary' non esiste ancora!");
    }
  }, err => {
    console.error("Errore onSnapshot dictionary:", err);
  });
}

/*****************************************
 *  LOGIN ADMIN
 *****************************************/
function adminLogin() {
  const username = document.getElementById("admin-username").value.trim();
  const password = document.getElementById("admin-password").value.trim();

  // Verifica se esiste la chiave "admin" in dictionary
  if (!dictionaryDataLive["admin"]) {
    showNotification("Dictionary non caricato o chiave 'admin' assente!");
    return;
  }

  if (username === "admin" && dictionaryDataLive["admin"] === password) {
    isAdmin = true;
    currentUserEmail = "admin";
    showNotification("Login Admin avvenuto con successo!");
    toggleSections(true);
    toggleAdminSection();

    loadReservationsFromFirestore();
    checkAndResetAfterTen();
    loadAdminNotesRealtime();
    populateDictionaryTable();
  } else {
    showNotification("Credenziali admin errate!");
  }
}

/*****************************************
 *  LOGIN USER (dal dictionary)
 *****************************************/
function userLoginDictionary() {
  const email = document.getElementById("user-email").value.trim();
  const phone = document.getElementById("user-phone").value.trim();
  const dictUser = document.getElementById("user-username").value.trim();
  const dictPass = document.getElementById("user-userpass").value.trim();

  if (!email || !phone || !dictUser || !dictPass) {
    showNotification("Completa tutti i campi!");
    return;
  }

  // Verifica se userXXX esiste nel dictionary
  if (!dictionaryDataLive[dictUser]) {
    showNotification("Username inesistente nel dictionary!");
    return;
  }

  // Controlla la password
  if (dictionaryDataLive[dictUser] !== dictPass) {
    showNotification("Password errata per " + dictUser);
    return;
  }

  // Salviamo i dati in registrations (solo come info)
  db.collection("registrations").add({
    email,
    phone,
    username: dictUser,
    createdAt: firebase.firestore.FieldValue.serverTimestamp()
  })
    .then(() => {
      showNotification("Benvenuto " + dictUser + "! Dati salvati.");
      isAdmin = false;
      currentUserEmail = dictUser; // userXXX
      toggleSections(true);
      toggleAdminSection();
      loadReservationsFromFirestore();
      checkAndResetAfterTen();
      loadAdminNotesRealtime();
    })
    .catch(err => {
      console.error("Errore salvataggio user:", err);
      showNotification("Errore salvataggio, vedi console.");
    });
}

/*****************************************
 *  LOGOUT
 *****************************************/
function logout() {
  currentUserEmail = null;
  isAdmin = false;
  toggleSections(false);
  showNotification("Logout effettuato con successo.");
}

/*****************************************
 *  GESTIONE PRENOTAZIONI
 *****************************************/
let reservations = {
  "Volley1": {},
  "Volley2": {},
  "BasketCalcio": {},
  "Ping-pong": {}
};

const timeSlots = [
  "11:00", "11:45",
  "12:30", "13:15",
  "14:00", "14:45",
  "15:30", "16:15",
  "17:00", "17:45",
  "18:30", "19:15",
  "20:00", "20:45"
];

// Carica prenotazioni di oggi
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
      console.error("Errore loadReservations:", err);
      showNotification("Errore caricamento prenotazioni.");
    });
}

// Ascolto realtime
function listenRealtimeForToday() {
  const today = getTodayDate();
  db.collection("reservations")
    .where("date", "==", today)
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

// Verifica se un utente ha già prenotato
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

function populateAllFields() {
  ["Volley1","Volley2","BasketCalcio","Ping-pong"].forEach(fieldName => populateFieldSlots(fieldName));
}

function populateFieldSlots(fieldName) {
  const container = document.getElementById(`slots-${fieldName}`);
  container.innerHTML = '';
  const today = getTodayDate();
  if (!reservations[fieldName][today]) {
    reservations[fieldName][today] = {};
  }

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
    showNotification("Hai già una prenotazione oggi.");
    return;
  }
  if (reservations[fieldName][today][slot]) {
    showNotification("Slot già prenotato.");
    return;
  }

  const docId = `${fieldName}_${today}_${slot}_${currentUserEmail}`;
  db.collection("reservations").doc(docId).set({
    field: fieldName,
    date: today,
    time: slot,
    userEmail: currentUserEmail
  })
    .then(() => showNotification(`Prenotazione effettuata su ${fieldName} alle ${slot}`))
    .catch(err => {
      console.error("Errore prenotazione:", err);
      showNotification("Errore prenotazione.");
    });
}

function cancelUserReservation(fieldName, slot) {
  const today = getTodayDate();
  if (reservations[fieldName][today][slot] === currentUserEmail) {
    const docId = `${fieldName}_${today}_${slot}_${currentUserEmail}`;
    db.collection("reservations").doc(docId).delete()
      .then(() => showNotification("Prenotazione annullata."))
      .catch(err => {
        console.error("Errore annullamento:", err);
        showNotification("Errore annullamento prenotazione.");
      });
  } else {
    showNotification("Non puoi annullare la prenotazione di un altro utente!");
  }
}

/*****************************************
 *  ADMIN - PRENOTAZIONI
 *****************************************/
function populateAdminTable() {
  const today = getTodayDate();
  const tbody = document.getElementById("admin-table");
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

function deleteAdminReservation(field, date, time, userEmail) {
  const docId = `${field}_${date}_${time}_${userEmail}`;
  db.collection("reservations").doc(docId).delete()
    .then(() => showNotification(`Prenotazione eliminata per ${field} alle ${time}`))
    .catch(err => {
      console.error("Errore admin delete:", err);
      showNotification("Errore eliminazione prenotazione.");
    });
}

/*****************************************
 *  ADMIN - REGISTRAZIONI
 *****************************************/
function populateRegistrationsTable() {
  const tbody = document.getElementById("registrations-table");
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
      console.error("Errore populateRegistrationsTable:", err);
    });
}

/*****************************************
 *  ADMIN - DIZIONARIO (PASSWORD)
 *****************************************/
function populateDictionaryTable() {
  const tbody = document.getElementById("dictionary-table");
  if (!tbody) return; // Se non esiste la tabella nel DOM
  tbody.innerHTML = '';

  // Ordiniamo le chiavi per vedere prima 'admin', poi 'user001', 'user002', ...
  const allKeys = Object.keys(dictionaryDataLive).sort();

  allKeys.forEach(username => {
    const pass = dictionaryDataLive[username];
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${username}</td>
      <td>${pass}</td>
      <td>
        <button onclick="updateDictionaryPassword('${username}')">
          <i class="fas fa-edit"></i> Modifica Password
        </button>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

function updateDictionaryPassword(username) {
  const newPass = prompt("Inserisci nuova password per: " + username);
  if (!newPass) return;

  dictionaryRef.update({ [username]: newPass })
    .then(() => showNotification(`Password aggiornata per ${username}`))
    .catch(err => {
      console.error("Errore updateDictionaryPassword:", err);
      showNotification("Errore durante l'aggiornamento password.");
    });
}

/*****************************************
 *  NOTE ADMIN
 *****************************************/
function loadAdminNotesRealtime() {
  db.collection("admin").doc("notes").onSnapshot(doc => {
    if (doc.exists) {
      const noteText = doc.data().text || "";
      document.getElementById("notes-content").textContent = noteText;
      if (isAdmin) {
        document.getElementById("admin-notes").value = noteText;
      }
    } else {
      // Se non esiste, creiamo doc "notes" con {text:""}
      db.collection("admin").doc("notes").set({ text: "" });
    }
  }, err => {
    console.error("Errore notes onSnapshot:", err);
  });
}

function saveAdminNotes() {
  if (!isAdmin) {
    showNotification("Non hai i permessi per modificare le note!");
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

/*****************************************
 *  IMMAGINI ADMIN
 *****************************************/
function loadAdminImagesRealtime() {
  db.collection("admin").doc("images").onSnapshot(doc => {
    const container = document.getElementById("login-images-container");
    if (!container) return;
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
          const urlField = document.getElementById(`image${i}URL`);
          const linkField = document.getElementById(`image${i}Link`);
          if (urlField) urlField.value = data[`image${i}URL`] || "";
          if (linkField) linkField.value = data[`image${i}Link`] || "";
        }
      }
    } else {
      // Se non esiste, creiamo doc "images" con campi vuoti
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
    showNotification("Non hai i permessi per modificare le immagini!");
    return;
  }
  const payload = {};
  for (let i = 1; i <= 10; i++) {
    const urlVal = document.getElementById(`image${i}URL`).value.trim();
    const linkVal = document.getElementById(`image${i}Link`).value.trim();
    payload[`image${i}URL`] = urlVal;
    payload[`image${i}Link`] = linkVal;
  }
  db.collection("admin").doc("images").set(payload)
    .then(() => showNotification("Immagini salvate con successo."))
    .catch(err => {
      console.error("Errore salvataggio immagini:", err);
      showNotification("Errore salvataggio immagini.");
    });
}

/*****************************************
 *  FUNZIONI DI UTILITÀ
 *****************************************/
function toggleSections(isInApp) {
  document.getElementById("access-area").style.display = isInApp ? "none" : "flex";
  document.getElementById("app-area").style.display = isInApp ? "flex" : "none";
}

function toggleAdminSection() {
  const adminArea = document.getElementById("admin-area");
  if (!adminArea) return;
  if (isAdmin) {
    adminArea.style.display = "block";
    document.getElementById("admin-notes").style.display = "block";
    document.getElementById("save-notes-btn").style.display = "inline-block";
  } else {
    adminArea.style.display = "none";
    document.getElementById("admin-notes").style.display = "none";
    document.getElementById("save-notes-btn").style.display = "none";
  }
}

function getTodayDate() {
  const d = new Date();
  let yyyy = d.getFullYear();
  let mm = String(d.getMonth() + 1).padStart(2, '0');
  let dd = String(d.getDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
}

function showNotification(msg) {
  const container = document.getElementById("notification-container");
  const div = document.createElement("div");
  div.classList.add("notification");
  div.textContent = msg;
  container.appendChild(div);
  setTimeout(() => div.remove(), 3000);
}

/*****************************************
 *  RESET GIORNALIERO (dopo le 10)
 *****************************************/
function checkAndResetAfterTen() {
  const lastResetDate = localStorage.getItem("lastResetDate");
  const today = getTodayDate();
  const now = new Date();
  if (lastResetDate !== today && now.getHours() >= 10) {
    resetAllReservations();
    localStorage.setItem("lastResetDate", today);
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
        // Non cancellare se userEmail === "admin"
        if (data.userEmail !== "admin") {
          batch.delete(doc.ref);
        }
      });
      return batch.commit();
    })
    .then(() => {
      showNotification("Prenotazioni resettate per il nuovo giorno (escluso admin).");
      loadReservationsFromFirestore();
    })
    .catch(err => {
      console.error("Errore resetAllReservations:", err);
      showNotification("Errore durante il reset delle prenotazioni.");
    });
}
