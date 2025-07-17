let startTime, timerInterval, isBreak = false, focusDuration = 0;
let streak = parseInt(localStorage.getItem("streak")) || 0;

const timerEl = document.getElementById("timer");
const startBtn = document.getElementById("start");
const stopBtn = document.getElementById("stop");
const resetBtn = document.getElementById("reset");
const resetStreakBtn = document.getElementById("reset-streak");
const logEl = document.getElementById("log");
const streakEl = document.getElementById("streak");
const internalPowerEl = document.getElementById("internal-power");
const externalPowerEl = document.getElementById("external-power");
const warningBox = document.getElementById("warning-box");
const intbatsound = document.getElementById("internalbat-sound");

function formatTime(ms) {
  const totalSec = Math.floor(ms / 1000);
  const hrs = String(Math.floor(totalSec / 3600)).padStart(2, '0');
  const min = String(Math.floor((totalSec % 3600) / 60)).padStart(2, '0');
  const sec = String(totalSec % 60).padStart(2, '0');
  return `${hrs}:${min}:${sec}`;
}

function updateTimer() {
  const elapsed = Date.now() - startTime;
  timerEl.textContent = formatTime(elapsed);
}

function startTimer() {
  isBreak = false;
  startTime = Date.now();
  timerInterval = setInterval(updateTimer, 500);
  startBtn.disabled = true;
  stopBtn.disabled = false;
  setPowerState("internal-only");
  intbatsound.play();
  warningBox.classList.remove("hidden");
  setTimeout(() => warningBox.classList.add("hidden"), 3000);
}

function stopTimer() {
  clearInterval(timerInterval);
  const elapsed = Date.now() - startTime;
  focusDuration = elapsed;
  const breakDuration = Math.floor(focusDuration / 5);
  logSession(focusDuration, breakDuration);
  startBreak(breakDuration);
}

function startBreak(duration) {
  isBreak = true;
  let remaining = duration;
  startTime = Date.now();
  timerInterval = setInterval(() => {
    const elapsed = Date.now() - startTime;
    if (elapsed >= remaining) {
      clearInterval(timerInterval);
      streak++;
      localStorage.setItem("streak", streak);
      updateStreakDisplay();
      startBtn.disabled = false;
      stopBtn.disabled = true;
      timerEl.textContent = "00:00:00";
      setPowerState("both");
    } else {
      timerEl.textContent = formatTime(remaining - elapsed);
    }
  }, 500);

  startBtn.disabled = true;
  stopBtn.disabled = true;
  setPowerState("internal-only");
}

function resetTimer() {
  clearInterval(timerInterval);
  timerEl.textContent = "00:00:00";
  startBtn.disabled = false;
  stopBtn.disabled = true;
  setPowerState("both");
}

function logSession(focusMs, breakMs) {
  const log = `• Session: ${formatTime(focusMs)} → Break: ${formatTime(breakMs)}`;
  const prev = logEl.innerHTML;
  logEl.innerHTML = `${log}\n${prev}`;
}

function updateStreakDisplay() {
  let icons = '';
  for (let i = 0; i < 5; i++) {
    icons += i < streak % 5 ? '🟢' : '⚪';
  }
  streakEl.textContent = `Streak: ${streak} ${icons}`;
}

function resetStreak() {
  streak = 0;
  localStorage.removeItem("streak");
  updateStreakDisplay();
}

function setPowerState(state) {
  if (state === "both") {
    internalPowerEl.classList.remove("blink");
    externalPowerEl.style.display = "block";
  } else if (state === "internal-only") {
    internalPowerEl.classList.add("blink");
    externalPowerEl.style.display = "none";
  }
}

startBtn.addEventListener("click", startTimer);
stopBtn.addEventListener("click", stopTimer);
resetBtn.addEventListener("click", resetTimer);
resetStreakBtn.addEventListener("click", resetStreak);

updateStreakDisplay();
setPowerState("both");

