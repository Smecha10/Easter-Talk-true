// Initialize
document.addEventListener('DOMContentLoaded', () => {
  renderTalkContent();
  setupTimer();
});

// Render Talk Content
function renderTalkContent() {
  const container = document.getElementById('talk-content');
  
  talkData.forEach((section, index) => {
    // Animation delay
    const delay = `${index * 0.1}s`;

    if (section.type === 'transition') {
      const transitionBox = document.createElement('div');
      transitionBox.className = 'transition-box fade-in';
      transitionBox.style.animationDelay = delay;
      transitionBox.innerHTML = `<span class="transition-label">Transition Note:</span> ${section.content}`;
      container.appendChild(transitionBox);
    } else {
      const sectionEl = document.createElement('section');
      sectionEl.className = 'talk-section fade-in';
      sectionEl.style.animationDelay = delay;
      
      const titleEl = document.createElement('h2');
      titleEl.className = 'section-title';
      titleEl.textContent = section.title;
      sectionEl.appendChild(titleEl);
      
      const bodyEl = document.createElement('div');
      bodyEl.className = 'section-body';
      
      section.content.forEach((paragraph) => {
        const pEl = document.createElement('p');
        pEl.textContent = paragraph;
        if (paragraph.startsWith('(') && paragraph.endsWith(')')) {
          pEl.className = 'reference-note';
        } else {
          pEl.className = 'talk-text';
        }
        bodyEl.appendChild(pEl);
      });
      
      sectionEl.appendChild(bodyEl);
      container.appendChild(sectionEl);
    }
  });
}

// Timer Logic
function setupTimer() {
  const TOTAL_TIME = 15 * 60; // 15 minutes
  let timeLeft = TOTAL_TIME;
  let isRunning = false;
  let timerInterval = null;

  const displayEl = document.getElementById('timer-display');
  const widgetEl = document.getElementById('timer-widget');
  const toggleBtn = document.getElementById('toggle-timer');
  const resetBtn = document.getElementById('reset-timer');
  const addBtn = document.getElementById('add-min');
  const subBtn = document.getElementById('sub-min');

  function updateDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    displayEl.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

    // Update color
    widgetEl.className = 'timer-widget';
    if (timeLeft <= 60) {
      widgetEl.classList.add('timer-danger');
    } else if (timeLeft <= 5 * 60) {
      widgetEl.classList.add('timer-warning');
    } else {
      widgetEl.classList.add('timer-safe');
    }
  }

  function toggle() {
    if (isRunning) {
      // Pause
      clearInterval(timerInterval);
      isRunning = false;
      toggleBtn.textContent = 'Start';
    } else {
      // Start
      if (timeLeft > 0) {
        isRunning = true;
        toggleBtn.textContent = 'Pause';
        timerInterval = setInterval(() => {
          timeLeft -= 1;
          updateDisplay();
          if (timeLeft <= 0) {
            clearInterval(timerInterval);
            isRunning = false;
            toggleBtn.textContent = 'Start';
          }
        }, 1000);
      }
    }
  }

  function reset() {
    clearInterval(timerInterval);
    isRunning = false;
    timeLeft = TOTAL_TIME;
    toggleBtn.textContent = 'Start';
    updateDisplay();
  }

  function addMin() {
    timeLeft += 60;
    updateDisplay();
  }

  function subMin() {
    timeLeft = Math.max(0, timeLeft - 60);
    updateDisplay();
  }

  toggleBtn.addEventListener('click', toggle);
  resetBtn.addEventListener('click', reset);
  addBtn.addEventListener('click', addMin);
  subBtn.addEventListener('click', subMin);

  // Initialize
  updateDisplay();
}
