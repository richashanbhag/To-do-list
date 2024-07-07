const timer = document.querySelector('.timer');
const startBtn = document.querySelector('.start');
const pauseBtn = document.querySelector('.pause');
const resetBtn = document.querySelector('.reset');
const workTimeInput = document.getElementById('work-time');
const breakTimeInput = document.getElementById('break-time');
const sessionType = document.querySelector('.session-type'); // Changed to match your HTML
const sessionCount = document.querySelector('.session-count'); // Changed to match your HTML
const alertSound = document.getElementById('alert-sound');

let countdown;
let isPaused = false;
let isWorking = true;
let timeinSeconds = workTimeInput.value * 60;
let completedSessions = 0;

// Constants for color thresholds (Not used in current logic but included for reference)
const THRESHOLD_PERCENTAGE_1 = 0.3;
const THRESHOLD_PERCENTAGE_2 = 0.1;
const GREEN_COLOR = '#00ff00';
const RED_COLOR = '#ff0000';

function startTimer() {
    countdown = setInterval(() => {
        timeinSeconds--;
        updateTimer();
        if (timeinSeconds === 0) {
            playAlertSound();
            clearInterval(countdown);
            if (isWorking) {
                completedSessions++;
                sessionCount.textContent = `Completed Sessions: ${completedSessions}`;
            }
            isWorking = !isWorking;
            updateSessionType();
            timeinSeconds = (isWorking ? workTimeInput.value : breakTimeInput.value) * 60;
            startTimer();
        }
    }, 1000);
}

function pauseTimer() {
    clearInterval(countdown);
    isPaused = true;
}

function resetTimer() {
    clearInterval(countdown);
    isPaused = false;
    isWorking = true;
    timeinSeconds = workTimeInput.value * 60;
    completedSessions = 0;
    sessionType.textContent = '';
    sessionCount.textContent = '';
    updateTimer();
}

function updateTimer() {
    const minutes = Math.floor(timeinSeconds / 60);
    const seconds = timeinSeconds % 60;
    timer.textContent = `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

function updateSessionType() {
    sessionType.textContent = isWorking ? 'Work Session' : 'Break Session';
}

function playAlertSound() {
    alertSound.currentTime = 0;
    alertSound.play();
}

startBtn.addEventListener('click', () => {
    if (isPaused) {
        startTimer();
        isPaused = false;
    } else {
        updateSessionType();
        startTimer();
    }
});

pauseBtn.addEventListener('click', pauseTimer);

resetBtn.addEventListener('click', resetTimer);

document.querySelector('form').addEventListener('submit', (e) => {
    e.preventDefault();
    workTimeInput.disabled = true;
    breakTimeInput.disabled = true;
    timeinSeconds = workTimeInput.value * 60;
    updateTimer();
    resetTimer();
});

updateTimer();
