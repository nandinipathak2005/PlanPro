document.addEventListener('DOMContentLoaded', function() {
    const waterCount = document.getElementById('water-count');
    const addWaterButton = document.getElementById('add-water-button');
    const resetWaterButton = document.getElementById('reset-water-button');
    const logWaterButton = document.getElementById('log-water-button');
    const dateInput = document.getElementById('date-input');
    const waterLog = document.getElementById('water-log');
    const kudosMessage = document.getElementById('kudos-message');
    const glassFill = document.getElementById('glass-fill');

    // Load saved water count and logs from localStorage
    const savedWaterCount = localStorage.getItem('waterCount');
    if (savedWaterCount) {
        waterCount.textContent = savedWaterCount;
        updateGlassFill(savedWaterCount);
        checkKudosMessage();
    }

    const savedWaterLogs = JSON.parse(localStorage.getItem('waterLogs')) || [];
    savedWaterLogs.forEach(log => addLogEntry(log.date, log.count));

    addWaterButton.addEventListener('click', function() {
        let count = parseInt(waterCount.textContent);
        count++;
        waterCount.textContent = count;
        localStorage.setItem('waterCount', count);
        updateGlassFill(count);
        checkKudosMessage();
    });

    resetWaterButton.addEventListener('click', function() {
        waterCount.textContent = '0';
        localStorage.setItem('waterCount', '0');
        updateGlassFill(0);
        checkKudosMessage();
    });

    logWaterButton.addEventListener('click', function() {
        const date = dateInput.value;
        if (!date) {
            alert('Please select a date.');
            return;
        }
        const count = parseInt(waterCount.textContent);
        const formattedDate = formatDate(date);
        addLogEntry(formattedDate, count);
        saveLogEntry(formattedDate, count);
        waterCount.textContent = '0';
        localStorage.setItem('waterCount', '0');
        updateGlassFill(0);
        checkKudosMessage();
    });

    function updateGlassFill(count) {
        const maxGlasses = 10; // Change this to the maximum number of glasses you want to track
        const fillPercentage = (count / maxGlasses) * 100;
        glassFill.style.height = `${fillPercentage}%`;
    }

    function addLogEntry(date, count) {
        const logEntry = document.createElement('div');
        logEntry.className = 'log-entry';
        logEntry.innerHTML = `<span>${date} - ${count} glasses</span><button class="delete-log">Delete</button>`;
        waterLog.appendChild(logEntry);

        logEntry.querySelector('.delete-log').addEventListener('click', function() {
            waterLog.removeChild(logEntry);
            deleteLogEntry(date);
        });
    }

    function saveLogEntry(date, count) {
        const logs = JSON.parse(localStorage.getItem('waterLogs')) || [];
        logs.push({ date, count });
        localStorage.setItem('waterLogs', JSON.stringify(logs));
    }

    function deleteLogEntry(date) {
        let logs = JSON.parse(localStorage.getItem('waterLogs')) || [];
        logs = logs.filter(log => log.date !== date);
        localStorage.setItem('waterLogs', JSON.stringify(logs));
    }

    function checkKudosMessage() {
        const count = parseInt(waterCount.textContent);
        if (count >= 8) {
            kudosMessage.textContent = 'Kudos! You have consumed more than 8 glasses today!';
        } else {
            kudosMessage.textContent = '';
        }
    }

    function formatDate(date) {
        const [year, month, day] = date.split('-');
        return `${day}-${month}-${year}`;
    }
});
