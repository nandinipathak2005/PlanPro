// Define an array to store tasks
let tasks = [];

// Function to update the current time
function updateCurrentTime() {
    const currentTimeElement = document.getElementById('currentTime');
    const currentTime = new Date();
    const hours = currentTime.getHours().toString().padStart(2, '0');
    const minutes = currentTime.getMinutes().toString().padStart(2, '0');
    const seconds = currentTime.getSeconds().toString().padStart(2, '0');
    currentTimeElement.textContent = `Time: ${hours}:${minutes}:${seconds}`;
}

// Function to add a task
function addTask(task, reminderTime) {
    const taskItem = document.createElement('div');
    taskItem.className = 'task-item';
    taskItem.innerHTML = `
        <span>${task} - ${reminderTime}</span>
        <button class="delete-task-button">Delete</button>
    `;
    document.getElementById('tasks-list').appendChild(taskItem);

    // Add event listener for the delete button
    taskItem.querySelector('.delete-task-button').addEventListener('click', function() {
        taskItem.remove();
        tasks = tasks.filter(t => t.id !== task.id);
        localStorage.setItem('tasks', JSON.stringify(tasks));
    });

    // Set up the reminder notification
    setupReminder(task, reminderTime);
}

// Function to set up the reminder notification
function setupReminder(task, reminderTime) {
    const currentTime = new Date();
    const [hours, minutes] = reminderTime.split(':');
    const reminderDate = new Date();
    reminderDate.setHours(hours, minutes, 0, 0);

    // Calculate the time difference in milliseconds
    const timeDifference = reminderDate.getTime() - currentTime.getTime();

    // Set up the reminder notification
    if (timeDifference > 0) {
        setTimeout(() => {
            // Show notification using alert
            alert(`Reminder: Time to do ${task}`);
        }, timeDifference);
    }
}

// Function to load tasks from local storage when the page loads
function loadTasks() {
    const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks = storedTasks;
    tasks.forEach(task => addTask(task.name, task.reminderTime));
}

// Update the current time every second
setInterval(updateCurrentTime, 1000);

// Update the current time immediately on page load
updateCurrentTime();

// Load tasks from local storage when the page loads
window.onload = () => {
    loadTasks();

    document.getElementById('add-task-button').addEventListener('click', () => {
        const taskInput = document.getElementById('task-input').value;
        const reminderTime = document.getElementById('reminder-time').value;

        if (taskInput && reminderTime) {
            const task = { id: Date.now(), name: taskInput, reminderTime };
            tasks.push(task);
            localStorage.setItem('tasks', JSON.stringify(tasks));
            addTask(taskInput, reminderTime);
            document.getElementById('task-input').value = '';
            document.getElementById('reminder-time').value = '';
        }
    });
};
