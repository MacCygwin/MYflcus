let timerInterval;
let seconds = 0;
const timerDisplay = document.getElementById("timer");
const externalPower = document.getElementById("external-power");
const internalPower = document.getElementById("internal-power");
const startSound = document.getElementById("start-sound");

function formatTime(secs) {
  const minutes = Math.floor(secs / 60);
  const seconds = secs % 60;
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

function updateTimerDisplay() {
  timerDisplay.textContent = formatTime(seconds);
}

function startTimer() {
  if (!timerInterval) {
    startSound.play();
    externalPower.classList.add("hidden");
    internalPower.classList.remove("hidden");

    timerInterval = setInterval(() => {
      seconds++;
      updateTimerDisplay();
    }, 1000);
  }
}

function stopTimer() {
  clearInterval(timerInterval);
  timerInterval = null;
}

function resetTimer() {
  stopTimer();
  seconds = 0;
  updateTimerDisplay();
  externalPower.classList.remove("hidden");
  internalPower.classList.add("hidden");
}
