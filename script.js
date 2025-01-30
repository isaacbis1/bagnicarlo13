document.addEventListener('DOMContentLoaded', () => {
    // Firebase Firestore
    const db = firebase.firestore();

    const addWorkerBtn = document.getElementById('add-worker');
    const workerNameInput = document.getElementById('worker-name');
    const workerUL = document.getElementById('worker-ul');
    const scheduleTable = document.getElementById('schedule-table').getElementsByTagName('tbody')[0];
    const monthSelector = document.getElementById('month');
    const dayInput = document.getElementById('day');
    const loadScheduleBtn = document.getElementById('load-schedule');
    const prevDayBtn = document.getElementById('prev-day');
    const nextDayBtn = document.getElementById('next-day');
    const dailyStatsBody = document.getElementById('daily-stats-body');
    const weeklyStatsBody = document.getElementById('weekly-stats-body');
    const monthlyStatsBody = document.getElementById('monthly-stats-body');
    const hours = Array.from({ length: 24 }, (_, i) => `${i}:00`);
    let workers = [];

    // Mesi con numero di giorni corretti
    const monthDays = {
        "Gennaio": 31,
        "Febbraio": 28, // Non gestiamo gli anni bisestili per semplicità
        "Marzo": 31,
        "Aprile": 30,
        "Maggio": 31,
        "Giugno": 30,
        "Luglio": 31,
        "Agosto": 31,
        "Settembre": 30,
        "Ottobre": 31,
        "Novembre": 30,
        "Dicembre": 31
    };

    // Abbreviazioni dei mesi per le statistiche giornaliere
    const monthAbbreviations = {
        "Gennaio": "Gen",
        "Febbraio": "Feb",
        "Marzo": "Mar",
        "Aprile": "Apr",
        "Maggio": "Mag",
        "Giugno": "Giu",
        "Luglio": "Lug",
        "Agosto": "Ago",
        "Settembre": "Set",
        "Ottobre": "Ott",
        "Novembre": "Nov",
        "Dicembre": "Dic"
    };

    // Palette di colori predefinita
    const colorPalette = [
        '#3498db', '#e74c3c', '#2ecc71', '#f1c40f',
        '#9b59b6', '#34495e', '#e67e22', '#1abc9c',
        '#95a5a6', '#d35400', '#7f8c8d', '#c0392b'
    ];

    // Inizializzazione dei Grafici
    let monthlyChart, dailyChart, weeklyChart;
    initializeCharts();

    // Caricamento dei lavoratori
    loadWorkers();

    // Imposta la data corrente
    setCurrentDate();

    // Caricamento dell'orario corrente
    loadSchedule();

    // Event Listener per aggiungere un nuovo lavoratore
    addWorkerBtn.addEventListener('click', async () => {
        const name = workerNameInput.value.trim();
        if (name && !workers.includes(name)) {
            try {
                const docRef = await db.collection('workers').add({ name });
                workers.push({ id: docRef.id, name });
                updateWorkerList();
                workerNameInput.value = '';
                updateStatistics();
            } catch (error) {
                console.error("Errore nell'aggiungere il lavoratore: ", error);
            }
        } else if (name && workers.find(w => w.name === name)) {
            alert("Il nome inserito esiste già.");
        }
    });

    // Event Listener per caricare l'orario selezionato
    loadScheduleBtn.addEventListener('click', () => {
        if (isValidDate(getSelectedMonth(), getSelectedDay())) {
            loadSchedule();
        } else {
            alert('Data non valida. Verifica il mese e il giorno.');
        }
    });

    // Event Listeners per navigare tra i giorni
    prevDayBtn.addEventListener('click', () => {
        navigateDay(-1);
    });

    nextDayBtn.addEventListener('click', () => {
        navigateDay(1);
    });

    // Funzioni Principali

    // Carica i lavoratori da Firestore
    async function loadWorkers() {
        try {
            const snapshot = await db.collection('workers').get();
            workers = [];
            snapshot.forEach(doc => {
                workers.push({ id: doc.id, name: doc.data().name });
            });
            updateWorkerList();
        } catch (error) {
            console.error("Errore nel caricamento dei lavoratori: ", error);
        }
    }

    // Aggiorna la lista dei lavoratori nell'interfaccia
    function updateWorkerList() {
        workerUL.innerHTML = '';
        workers.forEach((worker, index) => {
            const li = document.createElement('li');
            li.textContent = worker.name;

            // Pulsante per modificare
            const editBtn = document.createElement('button');
            editBtn.textContent = '✏️';
            editBtn.title = 'Modifica';
            editBtn.addEventListener('click', () => editWorker(worker));
            li.appendChild(editBtn);

            // Pulsante per eliminare
            const deleteBtn = document.createElement('button');
            deleteBtn.textContent = '🗑️';
            deleteBtn.title = 'Elimina';
            deleteBtn.addEventListener('click', () => deleteWorker(worker));
            li.appendChild(deleteBtn);

            workerUL.appendChild(li);
        });

        updateWorkerHeaders();
    }

    // Modifica il nome di un lavoratore
    async function editWorker(worker) {
        const newName = prompt("Inserisci il nuovo nome del lavoratore:", worker.name);
        if (newName && !workers.find(w => w.name === newName.trim())) {
            try {
                await db.collection('workers').doc(worker.id).update({ name: newName.trim() });
                const index = workers.findIndex(w => w.id === worker.id);
                if (index !== -1) {
                    workers[index].name = newName.trim();
                }
                updateWorkerList();
                loadSchedule();
                updateStatistics();
            } catch (error) {
                console.error("Errore nella modifica del lavoratore: ", error);
            }
        } else if (newName && workers.find(w => w.name === newName.trim())) {
            alert("Il nome inserito esiste già.");
        }
    }

    // Elimina un lavoratore
    async function deleteWorker(worker) {
        if (confirm(`Sei sicuro di voler eliminare "${worker.name}"?`)) {
            try {
                await db.collection('workers').doc(worker.id).delete();
                workers = workers.filter(w => w.id !== worker.id);
                updateWorkerList();
                loadSchedule();
                updateStatistics();
            } catch (error) {
                console.error("Errore nell'eliminare il lavoratore: ", error);
            }
        }
    }

    // Aggiorna le intestazioni della tabella degli orari
    function updateWorkerHeaders() {
        const thead = document.getElementById('schedule-table').getElementsByTagName('thead')[0];
        thead.innerHTML = '<tr><th>Ora</th></tr>'; // Reset delle intestazioni

        workers.forEach(worker => {
            const th = document.createElement('th');
            th.textContent = worker.name;
            thead.querySelector('tr').appendChild(th);
        });
    }

    // Genera la tabella degli orari per la data selezionata
    async function loadSchedule() {
        const month = getSelectedMonth();
        const day = getSelectedDay();
        scheduleTable.innerHTML = ''; // Reset della tabella

        // Carica lo schedule per il mese e il giorno selezionati
        const scheduleDocId = `${month}_${day}`;
        const scheduleDocRef = db.collection('schedules').doc(scheduleDocId);
        const scheduleDoc = await scheduleDocRef.get();

        let scheduleData = {};
        if (scheduleDoc.exists) {
            scheduleData = scheduleDoc.data();
        } else {
            // Se non esiste, crea un documento vuoto
            await scheduleDocRef.set({});
        }

        hours.forEach(hour => {
            const row = scheduleTable.insertRow();
            const cellHour = row.insertCell();
            cellHour.textContent = hour;

            workers.forEach(worker => {
                const cell = row.insertCell();
                cell.classList.add('clickable');
                cell.dataset.workerId = worker.id;
                cell.dataset.month = month;
                cell.dataset.day = day;
                cell.dataset.hour = hour;

                // Imposta lo stato attuale (working/not-working)
                if (scheduleData[worker.id] && scheduleData[worker.id][hour]) {
                    const status = scheduleData[worker.id][hour];
                    if (status === 'working') {
                        cell.classList.add('working');
                        cell.textContent = '✔️';
                    } else if (status === 'not-working') {
                        cell.classList.add('not-working');
                        cell.textContent = '✖️';
                    }
                }

                cell.addEventListener('click', toggleCellStatus);
            });
        });

        updateStatistics();
    }

    // Alterna lo stato di una cella (working/not-working/vuoto)
    async function toggleCellStatus(e) {
        const cell = e.target;
        const workerId = cell.dataset.workerId;
        const month = cell.dataset.month;
        const day = cell.dataset.day;
        const hour = cell.dataset.hour;

        const scheduleDocId = `${month}_${day}`;
        const scheduleDocRef = db.collection('schedules').doc(scheduleDocId);
        const scheduleDoc = await scheduleDocRef.get();

        let scheduleData = {};
        if (scheduleDoc.exists) {
            scheduleData = scheduleDoc.data();
        }

        if (!scheduleData[workerId]) {
            scheduleData[workerId] = {};
        }

        if (cell.classList.contains('working')) {
            // Cambia a "Non lavorando"
            cell.classList.remove('working');
            cell.classList.add('not-working');
            cell.textContent = '✖️';
            scheduleData[workerId][hour] = 'not-working';
        } else if (cell.classList.contains('not-working')) {
            // Rimuove lo stato
            cell.classList.remove('not-working');
            cell.textContent = '';
            delete scheduleData[workerId][hour];
            if (Object.keys(scheduleData[workerId]).length === 0) {
                delete scheduleData[workerId];
            }
        } else {
            // Cambia a "Lavorando"
            cell.classList.add('working');
            cell.textContent = '✔️';
            scheduleData[workerId][hour] = 'working';
        }

        // Aggiorna Firestore
        try {
            await scheduleDocRef.set(scheduleData);
            updateStatistics();
        } catch (error) {
            console.error("Errore nell'aggiornamento dello schedule: ", error);
        }
    }

    // Verifica se la data selezionata è valida
    function isValidDate(month, day) {
        return day >= 1 && day <= monthDays[month];
    }

    // Imposta la data corrente nei selettori
    function setCurrentDate() {
        const today = new Date();
        const currentMonth = getMonthName(today.getMonth());
        const currentDay = today.getDate();

        monthSelector.value = currentMonth;
        dayInput.value = currentDay;
    }

    // Ottiene il nome del mese dall'indice
    function getMonthName(monthIndex) {
        const monthNames = [
            "Gennaio", "Febbraio", "Marzo", "Aprile",
            "Maggio", "Giugno", "Luglio", "Agosto",
            "Settembre", "Ottobre", "Novembre", "Dicembre"
        ];
        return monthNames[monthIndex];
    }

    // Ottiene il mese selezionato
    function getSelectedMonth() {
        return monthSelector.value;
    }

    // Ottiene il giorno selezionato
    function getSelectedDay() {
        return parseInt(dayInput.value);
    }

    // Naviga tra i giorni
    function navigateDay(delta) {
        let month = getSelectedMonth();
        let day = getSelectedDay();

        day += delta;

        // Gestione del cambio di mese
        if (day < 1) {
            // Passa al mese precedente
            const monthNames = Object.keys(monthDays);
            let currentIndex = monthNames.indexOf(month);
            if (currentIndex > 0) {
                month = monthNames[currentIndex - 1];
                day = monthDays[month];
            } else {
                // Se è Gennaio, non fare nulla
                day = 1;
            }
        } else if (day > monthDays[month]) {
            // Passa al mese successivo
            const monthNames = Object.keys(monthDays);
            let currentIndex = monthNames.indexOf(month);
            if (currentIndex < monthNames.length - 1) {
                month = monthNames[currentIndex + 1];
                day = 1;
            } else {
                // Se è Dicembre, non fare nulla
                day = monthDays[month];
            }
        }

        monthSelector.value = month;
        dayInput.value = day;
        loadSchedule();
    }

    // Funzioni per le statistiche

    async function updateStatistics() {
        const month = getSelectedMonth();
        const day = getSelectedDay();
        const scheduleDocId = `${month}_${day}`;
        const scheduleDocRef = db.collection('schedules').doc(scheduleDocId);
        const scheduleDoc = await scheduleDocRef.get();

        let scheduleData = {};
        if (scheduleDoc.exists) {
            scheduleData = scheduleDoc.data();
        }

        // Reset delle tabelle delle statistiche
        dailyStatsBody.innerHTML = '';
        weeklyStatsBody.innerHTML = '';
        monthlyStatsBody.innerHTML = '';

        // Calcoli delle statistiche
        let dailyStats = {};
        let weeklyStats = {};
        let monthlyStats = {};

        // Recupera tutti gli schedule
        const schedulesSnapshot = await db.collection('schedules').get();
        schedulesSnapshot.forEach(doc => {
            const [docMonth, docDay] = doc.id.split('_');
            const weekNumber = getWeekNumber(new Date(`2023-${getMonthNumber(docMonth)}-${docDay}`)); // Anno fisso per semplicità

            const data = doc.data();
            Object.keys(data).forEach(workerId => {
                Object.keys(data[workerId]).forEach(hour => {
                    const status = data[workerId][hour];
                    if (status === 'working') {
                        // Statistiche giornaliere
                        const workerName = getWorkerName(workerId);
                        if (!dailyStats[workerName]) dailyStats[workerName] = {};
                        const monthAbbrev = monthAbbreviations[docMonth] || docMonth.slice(0, 3);
                        const dayKey = `${docDay}/${monthAbbrev}`; // Formato "1/Gen"
                        if (!dailyStats[workerName][dayKey]) dailyStats[workerName][dayKey] = 0;
                        dailyStats[workerName][dayKey] += 1;

                        // Statistiche settimanali
                        if (!weeklyStats[workerName]) weeklyStats[workerName] = {};
                        if (!weeklyStats[workerName][weekNumber]) weeklyStats[workerName][weekNumber] = 0;
                        weeklyStats[workerName][weekNumber] += 1;

                        // Statistiche mensili
                        if (!monthlyStats[workerName]) monthlyStats[workerName] = {};
                        if (!monthlyStats[workerName][docMonth]) monthlyStats[workerName][docMonth] = 0;
                        monthlyStats[workerName][docMonth] += 1;
                    }
                });
            });
        });

        // Popola la tabella delle statistiche giornaliere
        Object.keys(dailyStats).forEach(worker => {
            Object.keys(dailyStats[worker]).forEach(dayKey => {
                const tr = document.createElement('tr');
                const tdWorker = document.createElement('td');
                tdWorker.textContent = worker;
                const tdDay = document.createElement('td');
                tdDay.textContent = dayKey; // Formato "1/Gen"
                const tdHours = document.createElement('td');
                tdHours.textContent = dailyStats[worker][dayKey];
                tr.appendChild(tdWorker);
                tr.appendChild(tdDay);
                tr.appendChild(tdHours);
                dailyStatsBody.appendChild(tr);
            });
        });

        // Popola la tabella delle statistiche settimanali
        Object.keys(weeklyStats).forEach(worker => {
            Object.keys(weeklyStats[worker]).forEach(week => {
                const tr = document.createElement('tr');
                const tdWorker = document.createElement('td');
                tdWorker.textContent = worker;
                const tdWeek = document.createElement('td');
                tdWeek.textContent = `Settimana ${week}`;
                const tdHours = document.createElement('td');
                tdHours.textContent = weeklyStats[worker][week];
                tr.appendChild(tdWorker);
                tr.appendChild(tdWeek);
                tr.appendChild(tdHours);
                weeklyStatsBody.appendChild(tr);
            });
        });

        // Popola la tabella delle statistiche mensili
        Object.keys(monthlyStats).forEach(worker => {
            Object.keys(monthlyStats[worker]).forEach(month => {
                const tr = document.createElement('tr');
                const tdWorker = document.createElement('td');
                tdWorker.textContent = worker;
                const tdMonth = document.createElement('td');
                tdMonth.textContent = month;
                const tdHours = document.createElement('td');
                tdHours.textContent = monthlyStats[worker][month];
                tr.appendChild(tdWorker);
                tr.appendChild(tdMonth);
                tr.appendChild(tdHours);
                monthlyStatsBody.appendChild(tr);
            });
        });

        // Aggiorna i Grafici
        aggregateDataAndUpdateCharts(dailyStats, weeklyStats, monthlyStats);
    }

    // Ottiene il nome del lavoratore dato l'ID
    function getWorkerName(workerId) {
        const worker = workers.find(w => w.id === workerId);
        return worker ? worker.name : "Sconosciuto";
    }

    // Funzione per ottenere il numero del mese
    function getMonthNumber(monthName) {
        const monthNames = [
            "Gennaio", "Febbraio", "Marzo", "Aprile",
            "Maggio", "Giugno", "Luglio", "Agosto",
            "Settembre", "Ottobre", "Novembre", "Dicembre"
        ];
        return monthNames.indexOf(monthName) + 1;
    }

    // Funzione per ottenere il numero della settimana dell'anno
    function getWeekNumber(d) {
        d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
        d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
        const yearStart = new Date(Date.UTC(d.getFullYear(), 0, 1));
        const weekNo = Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
        return weekNo;
    }

    // Funzione per inizializzare i Grafici
    function initializeCharts() {
        const monthlyCtx = document.getElementById('monthly-chart').getContext('2d');
        const dailyCtx = document.getElementById('daily-chart').getContext('2d');
        const weeklyCtx = document.getElementById('weekly-chart').getContext('2d');

        monthlyChart = new Chart(monthlyCtx, {
            type: 'bar',
            data: {
                labels: [],
                datasets: []
            },
            options: {
                responsive: true,
                plugins: {
                    title: {
                        display: true,
                        text: 'Ore Lavorate per Mese'
                    },
                    tooltip: {
                        mode: 'index',
                        intersect: false
                    },
                },
                interaction: {
                    mode: 'nearest',
                    axis: 'x',
                    intersect: false
                },
                scales: {
                    x: {
                        stacked: true,
                        title: {
                            display: true,
                            text: 'Mese'
                        }
                    },
                    y: {
                        stacked: true,
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Ore'
                        }
                    }
                }
            }
        });

        dailyChart = new Chart(dailyCtx, {
            type: 'bar',
            data: {
                labels: [],
                datasets: []
            },
            options: {
                responsive: true,
                plugins: {
                    title: {
                        display: true,
                        text: 'Ore Lavorate per Giorno'
                    },
                    tooltip: {
                        mode: 'index',
                        intersect: false
                    },
                },
                interaction: {
                    mode: 'nearest',
                    axis: 'x',
                    intersect: false
                },
                scales: {
                    x: {
                        stacked: true,
                        title: {
                            display: true,
                            text: 'Giorno/Mese'
                        }
                    },
                    y: {
                        stacked: true,
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Ore'
                        }
                    }
                }
            }
        });

        weeklyChart = new Chart(weeklyCtx, {
            type: 'bar',
            data: {
                labels: [],
                datasets: []
            },
            options: {
                responsive: true,
                plugins: {
                    title: {
                        display: true,
                        text: 'Ore Lavorate per Settimana'
                    },
                    tooltip: {
                        mode: 'index',
                        intersect: false
                    },
                },
                interaction: {
                    mode: 'nearest',
                    axis: 'x',
                    intersect: false
                },
                scales: {
                    x: {
                        stacked: true,
                        title: {
                            display: true,
                            text: 'Settimana'
                        }
                    },
                    y: {
                        stacked: true,
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Ore'
                        }
                    }
                }
            }
        });
    }

    // Funzione per aggregare i dati e aggiornare i Grafici
    function aggregateDataAndUpdateCharts(dailyStats, weeklyStats, monthlyStats) {
        // Aggiorna il Grafico Mensile
        const months = Object.keys(monthlyStats).sort((a, b) => {
            return new Date(`${a} 1, 2023`) - new Date(`${b} 1, 2023`);
        });
        monthlyChart.data.labels = months;
        monthlyChart.data.datasets = workers.map((worker, index) => {
            const data = months.map(month => monthlyStats[worker.name] && monthlyStats[worker.name][month] ? monthlyStats[worker.name][month] : 0);
            return {
                label: worker.name,
                data: data,
                backgroundColor: colorPalette[index % colorPalette.length]
            };
        });
        monthlyChart.update();

        // Aggiorna il Grafico Giornaliero
        let dailyLabels = Object.keys(dailyStats).reduce((acc, worker) => {
            return acc.concat(Object.keys(dailyStats[worker]));
        }, []);
        dailyLabels = [...new Set(dailyLabels)].sort((a, b) => {
            const [dayA, monthA] = a.split('/');
            const [dayB, monthB] = b.split('/');
            const dateA = new Date(`${monthA} ${dayA}, 2023`);
            const dateB = new Date(`${monthB} ${dayB}, 2023`);
            return dateA - dateB;
        });

        dailyChart.data.labels = dailyLabels;
        dailyChart.data.datasets = workers.map((worker, index) => {
            const data = dailyLabels.map(label => dailyStats[worker.name] && dailyStats[worker.name][label] ? dailyStats[worker.name][label] : 0);
            return {
                label: worker.name,
                data: data,
                backgroundColor: colorPalette[index % colorPalette.length]
            };
        });
        dailyChart.update();

        // Aggiorna il Grafico Settimanale
        const weeks = Object.keys(weeklyStats).reduce((acc, worker) => {
            return acc.concat(Object.keys(weeklyStats[worker]));
        }, []);
        const uniqueWeeks = [...new Set(weeks)].sort((a, b) => a - b);
        weeklyChart.data.labels = uniqueWeeks.map(week => `Settimana ${week}`);
        weeklyChart.data.datasets = workers.map((worker, index) => {
            const data = uniqueWeeks.map(week => weeklyStats[worker.name] && weeklyStats[worker.name][week] ? weeklyStats[worker.name][week] : 0);
            return {
                label: worker.name,
                data: data,
                backgroundColor: colorPalette[index % colorPalette.length]
            };
        });
        weeklyChart.update();
    }
});
