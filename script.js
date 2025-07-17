let time = 300;
let countdown;
let isRunning = false;
const timerDisplay = document.getElementById("timer");
const internalPower = document.getElementById("internal-power");
const externalPower = document.getElementById("external-power");

const audio = new Audio("start-sound.mp3"); // Optional sound on start

function updateDisplay() {
  const minutes = Math.floor(time / 60)
    .toString()
    .padStart(2, "0");
  const seconds = (time % 60).toString().padStart(2, "0");
  timerDisplay.textContent = `${minutes}:${seconds}`;
}

function startTimer() {
  if (isRunning) return;
  isRunning = true;
  externalPower.classList.add("hidden");
  audio.play();
  countdown = setInterval(() => {
    if (time > 0) {
      time--;
      updateDisplay();
    } else {
      clearInterval(countdown);
      internalPower.textContent = "POWER LOST";
    }
  }, 1000);
}

function resetTimer() {
  clearInterval(countdown);
  isRunning = false;
  time = 300;
  internalPower.textContent = "INTERNAL POWER";
  externalPower.classList.remove("hidden");
  updateDisplay();
}

updateDisplay();
