document.addEventListener('DOMContentLoaded', function() {
    const timerForm = document.getElementById('timer-form');
    const timerDisplay = document.getElementById('timer-display');
    const pauseButton = document.getElementById('pause-button');
    const resumeButton = document.getElementById('resume-button');
    const alarmSound = document.getElementById('alarm-sound');
    const progressBarFill = document.getElementById('progress-bar-fill');

    let interval;
    let remainingTime;
    let isPaused = false;

    alarmSound.loop = true;

    timerForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const minutes = parseInt(document.getElementById('minutes').value);
        const seconds = parseInt(document.getElementById('seconds').value);

        if (isNaN(minutes) || isNaN(seconds) || (minutes <= 0 && seconds <= 0)) {
            alert('Please enter a valid number of minutes and seconds.');
            return;
        }
        startTimer(minutes * 60 + seconds);
    });

    pauseButton.addEventListener('click', function() {
        if (!isPaused) {
            clearInterval(interval);
            isPaused = true;
            pauseButton.disabled = true;
            resumeButton.disabled = false;
        }
    });

    resumeButton.addEventListener('click', function() {
        if (isPaused) {
            startTimer(remainingTime);
            isPaused = false;
            pauseButton.disabled = false;
            resumeButton.disabled = true;
        }
    });

    function startTimer(seconds) {
        remainingTime = seconds;
        timerDisplay.textContent = formatTime(remainingTime);
        updateProgressBar(remainingTime, seconds); // Initialize the progress bar

        pauseButton.disabled = false;
        resumeButton.disabled = true;

        interval = setInterval(() => {
            remainingTime--;
            timerDisplay.textContent = formatTime(remainingTime);
            updateProgressBar(remainingTime, seconds);

            if (remainingTime <= 0) {
                clearInterval(interval);
                alarmSound.play();
                showAlertWithStopButton();
                pauseButton.disabled = true;
                resumeButton.disabled = true;
            }
        }, 1000);
    }

    function formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
    }

    function updateProgressBar(remainingTime, totalTime) {
        const radius = 140; // Radius of the circle
        const circumference = 2 * Math.PI * radius;
        const percentage = (remainingTime / totalTime) * 100;
        const offset = circumference - (percentage / 100) * circumference;
        progressBarFill.style.strokeDashoffset = offset;
    }

    function showAlertWithStopButton() {
        const alertContainer = document.createElement('div');
        alertContainer.className = 'alert-container';

        const alertMessage = document.createElement('p');
        alertMessage.textContent = 'Focus time is over!';
        alertMessage.style.marginBottom = '20px';

        const stopButton = document.createElement('button');
        stopButton.textContent = 'Stop Alarm';
        stopButton.style.padding = '10px 20px';
        stopButton.style.background = '#dc3545';
        stopButton.style.color = 'white';
        stopButton.style.border = 'none';
        stopButton.style.borderRadius = '5px';
        stopButton.style.cursor = 'pointer';

        stopButton.addEventListener('click', function() {
            alarmSound.pause();
            alarmSound.currentTime = 0;
            document.body.removeChild(alertContainer);
            
            // Clear input fields
            document.getElementById('minutes').value = '';
            document.getElementById('seconds').value = '';
        });

        alertContainer.appendChild(alertMessage);
        alertContainer.appendChild(stopButton);

        document.body.appendChild(alertContainer);
    }
});
