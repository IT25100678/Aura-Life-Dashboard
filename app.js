/* ==========================================
   Aura Life Dashboard - Logic and Storage Engine
   ========================================== */

// 1. Initial State & Hardcoded Assets
const INSPIRATIONAL_QUOTES = [
  "The best way to predict the future is to create it. — Peter Drucker",
  "Success is not final, failure is not fatal: it is the courage to continue that counts. — Winston Churchill",
  "Aura is the reflection of your habits, choices, and energy. Make today count.",
  "Act as if what you do makes a difference. It does. — William James",
  "Your life does not get better by chance, it gets better by change. — Jim Rohn",
  "We are what we repeatedly do. Excellence, then, is not an act, but a habit. — Aristotle",
  "Small daily improvements over time lead to stunning results. — Robin Sharma",
  "Focus on the step in front of you, not the whole staircase."
];

const DEFAULT_HABITS = ["Drink 8 glasses of water", "Daily workout", "Mindful meditation"];

const DEFAULT_ACTIVITIES = [
  { id: 'sleep', name: 'Sleep', icon: 'sleep', color: 'var(--color-cyan)', defaultValue: 0 },
  { id: 'work', name: 'Work', icon: 'work', color: 'var(--color-purple)', defaultValue: 0 },
  { id: 'exercise', name: 'Fitness', icon: 'exercise', color: 'var(--color-rose)', defaultValue: 0 },
  { id: 'learning', name: 'Learn', icon: 'learning', color: 'var(--color-amber)', defaultValue: 0 },
  { id: 'social', name: 'Social', icon: 'social', color: 'var(--color-emerald)', defaultValue: 0 }
];

const activityIcons = {
  sleep: `<svg class="activity-svg-sticker" width="32" height="32" viewBox="0 0 24 24" style="filter: drop-shadow(0 2px 4px rgba(188,170,154,0.35));">
    <path d="M6 14a3 3 0 0 1 3-3h1a3.5 3.5 0 0 1 6.5-1.5A3.5 3.5 0 0 1 20 13a3 3 0 0 1-3 3H9a3 3 0 0 1-3-3z" fill="#FFFFFF" stroke="#4A3E3D" stroke-width="2" stroke-linejoin="round"/>
    <path d="M9 13.5c.3.5.7.5 1 0" stroke="#4A3E3D" stroke-width="1.5" stroke-linecap="round" fill="none"/>
    <path d="M13 13.5c.3.5.7.5 1 0" stroke="#4A3E3D" stroke-width="1.5" stroke-linecap="round" fill="none"/>
    <circle cx="8" cy="14" r="1" fill="#FFB5A7"/>
    <circle cx="15" cy="14" r="1" fill="#FFB5A7"/>
    <path d="M14 3.5a5 5 0 0 0 4 4.5 4 4 0 0 1-4-4.5z" fill="#FFE5D9" stroke="#E29578" stroke-width="1.5" stroke-linejoin="round"/>
  </svg>`,
  work: `<svg class="activity-svg-sticker" width="32" height="32" viewBox="0 0 24 24" style="filter: drop-shadow(0 2px 4px rgba(188,170,154,0.35));">
    <rect x="5" y="6" width="14" height="10" rx="2" fill="#D8E2DC" stroke="#4A3E3D" stroke-width="2"/>
    <circle cx="10" cy="10" r="1" fill="#4A3E3D"/>
    <circle cx="14" cy="10" r="1" fill="#4A3E3D"/>
    <path d="M11 12c.5.5 1 .5 1.5 0" stroke="#4A3E3D" stroke-width="1" stroke-linecap="round" fill="none"/>
    <path d="M3 16h18c0 1-1 2-2 2H5c-1 0-2-1-2-2z" fill="#ECE4DB" stroke="#4A3E3D" stroke-width="2" stroke-linejoin="round"/>
  </svg>`,
  exercise: `<svg class="activity-svg-sticker" width="32" height="32" viewBox="0 0 24 24" style="filter: drop-shadow(0 2px 4px rgba(188,170,154,0.35));">
    <rect x="4" y="11" width="16" height="2" rx="1" fill="#4A3E3D"/>
    <rect x="3" y="7" width="3" height="10" rx="1" fill="#FFB5A7" stroke="#4A3E3D" stroke-width="2"/>
    <rect x="18" y="7" width="3" height="10" rx="1" fill="#FFB5A7" stroke="#4A3E3D" stroke-width="2"/>
    <path d="M11 6l1 1-1 1-1-1z" fill="#FFE5D9"/>
  </svg>`,
  learning: `<svg class="activity-svg-sticker" width="32" height="32" viewBox="0 0 24 24" style="filter: drop-shadow(0 2px 4px rgba(188,170,154,0.35));">
    <path d="M12 18c-2-2-5-2-8-2V6c3 0 6 0 8 2" fill="#FFFFFF" stroke="#4A3E3D" stroke-width="2" stroke-linejoin="round"/>
    <path d="M12 18c2-2 5-2 8-2V6c-3 0-6 0-8 2" fill="#FFFFFF" stroke="#4A3E3D" stroke-width="2" stroke-linejoin="round"/>
    <path d="M12 8v8l-2-2-2 2" fill="#FFE5D9" stroke="#E29578" stroke-width="1.5"/>
  </svg>`,
  social: `<svg class="activity-svg-sticker" width="32" height="32" viewBox="0 0 24 24" style="filter: drop-shadow(0 2px 4px rgba(188,170,154,0.35));">
    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill="#FFCAD4" stroke="#4A3E3D" stroke-width="2" stroke-linejoin="round"/>
  </svg>`,
  coffee: `<svg class="activity-svg-sticker" width="32" height="32" viewBox="0 0 100 100" style="filter: drop-shadow(0 2px 4px rgba(188,170,154,0.35));">
    <path d="M30,40 H70 C70,68 30,68 30,40 Z" fill="#D8E2DC" stroke="#4A3E3D" stroke-width="2.5"/>
    <path d="M70,46 C77,46 77,58 70,58" fill="none" stroke="#4A3E3D" stroke-width="2.5"/>
    <path d="M40,28 Q43,20 40,15" fill="none" stroke="#E29578" stroke-width="2"/>
    <circle cx="44" cy="50" r="1.5" fill="#4A3E3D"/>
    <circle cx="56" cy="50" r="1.5" fill="#4A3E3D"/>
  </svg>`,
  game: `<svg class="activity-svg-sticker" width="32" height="32" viewBox="0 0 24 24" style="filter: drop-shadow(0 2px 4px rgba(188,170,154,0.35));">
    <rect x="2" y="6" width="20" height="12" rx="3" fill="#D6E2E9" stroke="#4A3E3D" stroke-width="2"/>
    <path d="M6 12h4M8 10v4" stroke="#4A3E3D" stroke-width="2" stroke-linecap="round"/>
    <circle cx="15" cy="11" r="1.5" fill="#FFB5A7" stroke="#4A3E3D" stroke-width="1"/>
    <circle cx="18" cy="13" r="1.5" fill="#FFB5A7" stroke="#4A3E3D" stroke-width="1"/>
  </svg>`,
  music: `<svg class="activity-svg-sticker" width="32" height="32" viewBox="0 0 24 24" style="filter: drop-shadow(0 2px 4px rgba(188,170,154,0.35));">
    <path d="M9 18V5l12-2v13" fill="none" stroke="#4A3E3D" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    <circle cx="6" cy="18" r="3" fill="#FFE5D9" stroke="#4A3E3D" stroke-width="2"/>
    <circle cx="18" cy="16" r="3" fill="#FFE5D9" stroke="#4A3E3D" stroke-width="2"/>
  </svg>`
};

// 2. Global State Storage Object
let appState = {
  profile: {
    username: "User",
    focus: "Productivity & Health",
    avatarColor: "clay"
  },
  habits: [...DEFAULT_HABITS],
  activities: [...DEFAULT_ACTIVITIES],
  logs: {} // Keyed by YYYY-MM-DD
};

// Current Active Tracking State for Today
let todayTracking = {
  date: "", // YYYY-MM-DD
  mood: 0,
  status: "",
  activities: {}, // Dynamically initialized
  habits: {} // habitName: true/false
};

// 3. Helper Functions
const moodSVGs = {
  5: `<svg class="mood-svg-sticker" width="20" height="20" viewBox="0 0 24 24" style="display:inline-block; vertical-align:middle; margin-right:6px; filter: drop-shadow(0 1px 2px rgba(188,170,154,0.25));"><circle cx="12" cy="12" r="10" fill="#FFE5D9" stroke="#4A3E3D" stroke-width="1.8"/><path d="M7.5 10c.5-1 1.5-1 2 0M14.5 10c.5-1 1.5-1 2 0" stroke="#4A3E3D" stroke-width="1.8" stroke-linecap="round" fill="none"/><path d="M9 14.5a3 3 0 0 0 6 0" fill="#FFB5A7" stroke="#4A3E3D" stroke-width="1.8" stroke-linecap="round"/></svg>`,
  4: `<svg class="mood-svg-sticker" width="20" height="20" viewBox="0 0 24 24" style="display:inline-block; vertical-align:middle; margin-right:6px; filter: drop-shadow(0 1px 2px rgba(188,170,154,0.25));"><circle cx="12" cy="12" r="10" fill="#D8E2DC" stroke="#4A3E3D" stroke-width="1.8"/><path d="M8 11.5c.5.5 1 .5 1.5 0M14.5 11.5c.5.5 1 .5 1.5 0" stroke="#4A3E3D" stroke-width="1.8" stroke-linecap="round" fill="none"/><path d="M9.5 15.5c1 1 2.5 1 3.5 0" stroke="#4A3E3D" stroke-width="1.8" stroke-linecap="round" fill="none"/></svg>`,
  3: `<svg class="mood-svg-sticker" width="20" height="20" viewBox="0 0 24 24" style="display:inline-block; vertical-align:middle; margin-right:6px; filter: drop-shadow(0 1px 2px rgba(188,170,154,0.25));"><circle cx="12" cy="12" r="10" fill="#FDF0D5" stroke="#4A3E3D" stroke-width="1.8"/><circle cx="9" cy="11" r="1.5" fill="#4A3E3D"/><circle cx="15" cy="11" r="1.5" fill="#4A3E3D"/><line x1="10" y1="15" x2="14" y2="15" stroke="#4A3E3D" stroke-width="1.8" stroke-linecap="round"/></svg>`,
  2: `<svg class="mood-svg-sticker" width="20" height="20" viewBox="0 0 24 24" style="display:inline-block; vertical-align:middle; margin-right:6px; filter: drop-shadow(0 1px 2px rgba(188,170,154,0.25));"><circle cx="12" cy="12" r="10" fill="#ECE4DB" stroke="#4A3E3D" stroke-width="1.8"/><path d="M7 9c.5-.5 1.5-.5 2 0M15 9c.5-.5 1.5-.5 2 0" stroke="#4A3E3D" stroke-width="1.5" stroke-linecap="round" fill="none"/><circle cx="9.5" cy="12" r="1.2" fill="#4A3E3D"/><circle cx="14.5" cy="12" r="1.2" fill="#4A3E3D"/><path d="M10 16c1-1 3-1 4 0" stroke="#4A3E3D" stroke-width="1.5" stroke-linecap="round" fill="none"/></svg>`,
  1: `<svg class="mood-svg-sticker" width="20" height="20" viewBox="0 0 24 24" style="display:inline-block; vertical-align:middle; margin-right:6px; filter: drop-shadow(0 1px 2px rgba(188,170,154,0.25));"><circle cx="12" cy="12" r="10" fill="#FEC5BB" stroke="#4A3E3D" stroke-width="1.8"/><path d="M7 11l2.5-1M17 11l-2.5-1" stroke="#4A3E3D" stroke-width="1.8" stroke-linecap="round"/><circle cx="9" cy="12" r="1.2" fill="#4A3E3D"/><circle cx="15" cy="12" r="1.2" fill="#4A3E3D"/><path d="M10 15c.5.5 1-.5 1.5 0s1-.5 1.5 0" stroke="#4A3E3D" stroke-width="1.8" stroke-linecap="round" fill="none"/></svg>`
};

function getFormattedDate(dateObj) {
  const year = dateObj.getFullYear();
  const month = String(dateObj.getMonth() + 1).padStart(2, '0');
  const day = String(dateObj.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function getReadableDate(dateStr) {
  const parts = dateStr.split('-');
  const date = new Date(parts[0], parts[1] - 1, parts[2]);
  return date.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric', year: 'numeric' });
}

function getMonthYearLabel(dateStr) {
  const parts = dateStr.split('-');
  const date = new Date(parts[0], parts[1] - 1, parts[2]);
  return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
}

// 4. Save/Load to Browser LocalStorage
function saveStateToLocalStorage() {
  localStorage.setItem('aura_dashboard_state', JSON.stringify(appState));
}

// Syncs today's live tracking state to live preview on dashboard
function syncTodayLiveToLogs() {
  renderTodayOverviewPreview();
}

function loadStateFromLocalStorage() {
  const saved = localStorage.getItem('aura_dashboard_state');
  if (saved) {
    try {
      const parsed = JSON.parse(saved);
      if (parsed.profile) appState.profile = parsed.profile;
      
      if (parsed.habits && Array.isArray(parsed.habits)) {
        appState.habits = parsed.habits.filter(h => h && typeof h === 'string' && h.trim() !== "");
      }
      if (!appState.habits || appState.habits.length === 0) {
        appState.habits = [...DEFAULT_HABITS];
      }
      
      if (parsed.logs) appState.logs = parsed.logs;
      
      if (parsed.activities && Array.isArray(parsed.activities) && parsed.activities.length > 0) {
        appState.activities = parsed.activities;
      } else {
        appState.activities = [...DEFAULT_ACTIVITIES];
      }
    } catch (e) {
      console.error("Could not parse saved storage data, resetting.", e);
    }
  } else {
    appState.activities = [...DEFAULT_ACTIVITIES];
    appState.habits = [...DEFAULT_HABITS];
    appState.logs = {};
  }

  // Set the theme color and Light/Dark mode on startup
  applyThemeColor(appState.profile.avatarColor || 'clay');
  if (!appState.themeMode) appState.themeMode = 'light';
  setThemeMode(appState.themeMode);
}

// Generates some mock history data to populate graphs and calendar grids
function generateMockHistory() {
  const today = new Date();
  // Create history for past 45 days
  for (let i = 1; i <= 45; i++) {
    const prevDate = new Date();
    prevDate.setDate(today.getDate() - i);
    const dateStr = getFormattedDate(prevDate);
    
    // Random elements
    const mood = Math.floor(Math.random() * 5) + 1; // 1 to 5
    
    // Generate values dynamically for whatever activities are defined
    const activitiesData = {};
    appState.activities.forEach(act => {
      let hours = 0;
      if (act.id === 'sleep') hours = (Math.random() * 3 + 6.5).toFixed(1) * 1;
      else if (act.id === 'work') hours = (Math.random() * 4 + 5.5).toFixed(1) * 1;
      else if (act.id === 'exercise') hours = Math.random() > 0.4 ? (Math.random() * 1.5 + 0.5).toFixed(1) * 1 : 0;
      else if (act.id === 'learning') hours = Math.random() > 0.3 ? (Math.random() * 2 + 0.5).toFixed(1) * 1 : 0;
      else hours = (Math.random() * 3 + 1).toFixed(1) * 1;
      activitiesData[act.id] = hours;
    });

    const mockedHabits = {};
    appState.habits.forEach(h => {
      mockedHabits[h] = Math.random() > 0.35;
    });

    const statusOptions = [
      "Worked on a coding assignment", "Felt highly energetic today", "Relaxed evening reading a book",
      "Gym session felt awesome", "Had a busy workday", "Felt a bit tired today",
      "Cooked a healthy meal", "Connected with old university friends", "Focused day studying math"
    ];
    const status = statusOptions[Math.floor(Math.random() * statusOptions.length)];

    appState.logs[dateStr] = {
      date: dateStr,
      mood: mood,
      status: status,
      activities: activitiesData,
      habits: mockedHabits
    };
  }
  saveStateToLocalStorage();
}

// 5. Initializing the Application
document.addEventListener("DOMContentLoaded", () => {
  const today = new Date();
  todayTracking.date = getFormattedDate(today);
  
  // Load State
  loadStateFromLocalStorage();
  
  // Set Greeting & Current Date Header
  document.getElementById('currentDateString').textContent = getReadableDate(todayTracking.date);
  
  // Set Random Quote
  const quote = INSPIRATIONAL_QUOTES[Math.floor(Math.random() * INSPIRATIONAL_QUOTES.length)];
  document.getElementById('quoteText').textContent = quote;

  // Initialize UI & Components
  initSidebarTabs();
  initMoodSelector();
  initActivitySliders();
  initHabitTracker();
  initSettingsProfile();
  initPriorityStickyNote();
  
  // Check if today's entry already exists in stored history
  loadTodayFromState();
  
  // Render views
  renderHabitsList();
  renderHistoryView();
  renderAnalyticsView();
  updateNavUserDisplay();

  // Trigger PWA Splash Screen (For installed standalone app or initial launch)
  const isStandalonePWA = window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true;
  if (isStandalonePWA || !sessionStorage.getItem('bloom_splash_shown')) {
    const splash = document.getElementById('pwaSplashScreen');
    if (splash) {
      splash.style.display = 'flex';
      sessionStorage.setItem('bloom_splash_shown', 'true');
      setTimeout(() => {
        splash.classList.add('fade-out');
        setTimeout(() => { splash.style.display = 'none'; }, 600);
      }, 3000);
    }
  }

  // Trigger icons redraw
  lucide.createIcons();
});

// 6. Navigation Controls
function initSidebarTabs() {
  const navButtons = document.querySelectorAll('.nav-btn');
  const tabContents = document.querySelectorAll('.tab-content');

  navButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetTab = btn.getAttribute('data-tab');
      
      // Update Active Navigation Button
      navButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      
      // Update Visible Tab Content
      tabContents.forEach(tab => {
        tab.classList.remove('active');
        if (tab.id === `tab-${targetTab}`) {
          tab.classList.add('active');
        }
      });

      // Refresh graphs / charts when visiting Analytics
      if (targetTab === 'analytics') {
        renderAnalyticsView();
      } else if (targetTab === 'history') {
        renderHistoryView();
      }
    });
  });
}

// 7. Mood Selector & Daily Status Hub
function initMoodSelector() {
  const moodButtons = document.querySelectorAll('.mood-btn');
  const statusInput = document.getElementById('dailyStatus');
  const charCounter = document.getElementById('charCount');

  moodButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const moodVal = parseInt(btn.getAttribute('data-mood'));
      const activeColor = btn.getAttribute('data-color');
      
      todayTracking.mood = moodVal;

      // Update Styling
      moodButtons.forEach(b => {
        b.classList.remove('active');
        b.style.removeProperty('--active-bg-color');
        b.style.removeProperty('--active-border-color');
        b.style.removeProperty('--active-shadow-color');
      });

      btn.classList.add('active');
      btn.style.setProperty('--active-bg-color', `${activeColor}15`); // Translucent background
      btn.style.setProperty('--active-border-color', activeColor);
      btn.style.setProperty('--active-shadow-color', `${activeColor}30`);

      syncTodayLiveToLogs();
    });
  });

  // Character Counter status notes
  statusInput.addEventListener('input', (e) => {
    todayTracking.status = e.target.value;
    charCounter.textContent = e.target.value.length;
    syncTodayLiveToLogs();
  });
}

const defaultCustomIcon = `<svg class="activity-svg-sticker" width="32" height="32" viewBox="0 0 24 24" style="filter: drop-shadow(0 2px 4px rgba(188,170,154,0.35));">
  <circle cx="12" cy="12" r="10" fill="#FFFFFF" stroke="#4A3E3D" stroke-width="2"/>
  <path d="M12 7l1.5 3 3.5.5-2.5 2.5 1 3.5-3.5-2-3.5 2 1-3.5-2.5-2.5 3.5-.5z" fill="#FFE5D9" stroke="#4A3E3D" stroke-width="1"/>
</svg>`;

// 8. Activity Allocation Sliders & CRUD
function initActivitySliders() {
  const addActivityBtn = document.getElementById('addActivityBtn');
  const newActivityInput = document.getElementById('newActivityInput');

  if (addActivityBtn && newActivityInput) {
    addActivityBtn.addEventListener('click', () => {
      const name = newActivityInput.value.trim();
      if (!name) return;
      
      const lower = name.toLowerCase();
      if (appState.activities.some(act => act.name.toLowerCase() === lower)) {
        alert("An activity with that name already exists!");
        return;
      }

      const newId = `custom-${Date.now()}`;
      const colors = ['var(--color-cyan)', 'var(--color-accent-dark)', 'var(--color-rose)', 'var(--color-amber)', 'var(--color-emerald)'];
      const randomColor = colors[appState.activities.length % colors.length];

      appState.activities.push({
        id: newId,
        name: name,
        icon: 'custom',
        color: randomColor,
        defaultValue: 0
      });

      todayTracking.activities[newId] = 0;
      newActivityInput.value = '';

      saveStateToLocalStorage();
      renderActivitiesList();
      renderTodayOverviewPreview();
      renderAnalyticsView();
      lucide.createIcons();
    });

    newActivityInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        addActivityBtn.click();
      }
    });
  }
}

function renderActivitiesList() {
  const container = document.getElementById('activitiesListContainer');
  if (!container) return;
  container.innerHTML = '';

  if (!appState.activities || !Array.isArray(appState.activities) || appState.activities.length === 0) {
    appState.activities = [...DEFAULT_ACTIVITIES];
    saveStateToLocalStorage();
  }

  appState.activities.forEach(act => {
    const value = todayTracking.activities[act.id] !== undefined ? todayTracking.activities[act.id] : 0;
    const suffix = act.id === 'exercise' ? ' hr' : ' hrs';
    const iconSvg = activityIcons[act.id] || defaultCustomIcon;

    const row = document.createElement('div');
    row.className = 'slider-group';
    row.innerHTML = `
      <div class="slider-header" style="display: flex; align-items: center; justify-content: space-between;">
        <span class="slider-name" style="display: flex; align-items: center; gap: 8px;">
          ${iconSvg}
          <span>${act.name}</span>
          <div style="display: flex; gap: 6px; margin-left: 4px; align-items: center;">
            <button class="btn-icon activity-edit-btn" style="background: none; border: none; opacity: 0.4; cursor: pointer; padding: 2px; display: inline-flex;" title="Rename activity">
              <i data-lucide="edit-2" style="width: 13px; height: 13px; color: var(--text-muted);"></i>
            </button>
            <button class="btn-icon activity-delete-btn" style="background: none; border: none; opacity: 0.4; cursor: pointer; padding: 2px; display: inline-flex;" title="Delete activity">
              <i data-lucide="trash-2" style="width: 13px; height: 13px; color: #C62828;"></i>
            </button>
          </div>
        </span>
        <span class="slider-value" id="val-${act.id}">${value}${suffix}</span>
      </div>
      <input type="range" class="range-slider" id="slide-${act.id}" min="0" max="24" step="0.5" value="${value}">
    `;

    const sliderInput = row.querySelector(`#slide-${act.id}`);
    const valDisplay = row.querySelector(`#val-${act.id}`);

    sliderInput.addEventListener('input', (e) => {
      const val = parseFloat(e.target.value);
      todayTracking.activities[act.id] = val;
      valDisplay.textContent = `${val}${val === 1 && act.id === 'exercise' ? ' hr' : ' hrs'}`;
      syncTodayLiveToLogs();
    });

    row.querySelector('.activity-edit-btn').addEventListener('click', (e) => {
      e.stopPropagation();
      window.renameActivity(act.id);
    });

    row.querySelector('.activity-delete-btn').addEventListener('click', (e) => {
      e.stopPropagation();
      window.deleteActivity(act.id);
    });

    container.appendChild(row);
  });

  lucide.createIcons();
}

// 9. Habit Checklist Tracker
function initHabitTracker() {
  const addHabitBtn = document.getElementById('addHabitBtn');
  const newHabitInput = document.getElementById('newHabitInput');

  addHabitBtn.addEventListener('click', () => {
    const habitText = newHabitInput.value.trim();
    if (habitText && !appState.habits.includes(habitText)) {
      appState.habits.push(habitText);
      newHabitInput.value = '';
      saveStateToLocalStorage();
      renderHabitsList();
      
      // Update Analytics since list of habits changed
      renderAnalyticsView();
      lucide.createIcons();
    }
  });

  newHabitInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      addHabitBtn.click();
    }
  });
}

function renderHabitsList() {
  const container = document.getElementById('habitsListContainer');
  container.innerHTML = '';

  if (appState.habits && Array.isArray(appState.habits)) {
    appState.habits = appState.habits.filter(h => h && typeof h === 'string' && h.trim() !== "");
  }
  if (!appState.habits || !Array.isArray(appState.habits) || appState.habits.length === 0) {
    appState.habits = [...DEFAULT_HABITS];
    saveStateToLocalStorage();
  }

  appState.habits.forEach(habit => {
    const item = document.createElement('div');
    item.className = 'habit-item';
    item.style.display = 'flex';
    item.style.alignItems = 'center';
    item.style.justifyContent = 'space-between';

    const details = document.createElement('div');
    details.className = 'habit-details';
    details.style.display = 'flex';
    details.style.alignItems = 'center';
    details.style.gap = '8px';
    details.style.flexGrow = '1';

    details.innerHTML = `
      <span class="habit-name">${habit}</span>
      <div style="display: flex; gap: 6px; margin-left: 8px; align-items: center;">
        <button class="btn-icon habit-edit-btn" style="background: none; border: none; opacity: 0.4; cursor: pointer; padding: 2px; display: inline-flex;" title="Rename habit">
          <i data-lucide="edit-2" style="width: 13px; height: 13px; color: var(--text-muted);"></i>
        </button>
        <button class="btn-icon habit-delete-btn" style="background: none; border: none; opacity: 0.4; cursor: pointer; padding: 2px; display: inline-flex;" title="Delete habit">
          <i data-lucide="trash-2" style="width: 13px; height: 13px; color: #C62828;"></i>
        </button>
      </div>
    `;

    const editBtn = details.querySelector('.habit-edit-btn');
    editBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      window.renameHabit(habit);
    });

    const delBtn = details.querySelector('.habit-delete-btn');
    delBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      window.deleteHabit(habit);
    });

    const isChecked = todayTracking.habits[habit] === true;
    const checkbox = document.createElement('button');
    checkbox.className = `habit-checkbox ${isChecked ? 'checked' : ''}`;
    checkbox.innerHTML = isChecked ? `<i data-lucide="check"></i>` : '';
    
    checkbox.addEventListener('click', () => {
      const currentVal = todayTracking.habits[habit] === true;
      todayTracking.habits[habit] = !currentVal;
      
      checkbox.className = `habit-checkbox ${!currentVal ? 'checked' : ''}`;
      checkbox.innerHTML = !currentVal ? `<i data-lucide="check"></i>` : '';
      lucide.createIcons();
      
      syncTodayLiveToLogs();
    });

    item.appendChild(details);
    item.appendChild(checkbox);
    container.appendChild(item);
  });
  
  lucide.createIcons();
}

window.deleteHabit = function(habitName) {
  if (confirm(`Are you sure you want to delete the habit "${habitName}"?`)) {
    appState.habits = appState.habits.filter(h => h !== habitName);
    if (todayTracking.habits) delete todayTracking.habits[habitName];
    
    Object.keys(appState.logs).forEach(date => {
      if (appState.logs[date].habits) {
        delete appState.logs[date].habits[habitName];
      }
    });
    
    saveStateToLocalStorage();
    syncTodayLiveToLogs();
    renderHabitsList();
    renderAnalyticsView();
  }
};

window.renameHabit = function(oldName) {
  const newName = prompt(`Enter a new name for "${oldName}":`, oldName);
  if (newName && newName.trim() !== "" && newName.trim() !== oldName) {
    const trimmed = newName.trim();
    if (appState.habits.includes(trimmed)) {
      alert("A habit with that name already exists!");
      return;
    }
    
    appState.habits = appState.habits.map(h => h === oldName ? trimmed : h);
    
    if (todayTracking.habits && todayTracking.habits[oldName] !== undefined) {
      todayTracking.habits[trimmed] = todayTracking.habits[oldName];
      delete todayTracking.habits[oldName];
    }
    
    Object.keys(appState.logs).forEach(date => {
      const log = appState.logs[date];
      if (log.habits && log.habits[oldName] !== undefined) {
        log.habits[trimmed] = log.habits[oldName];
        delete log.habits[oldName];
      }
    });
    
    saveStateToLocalStorage();
    syncTodayLiveToLogs();
    renderHabitsList();
    renderAnalyticsView();
  }
};

window.deleteActivity = function(actId) {
  const act = appState.activities.find(a => a.id === actId);
  if (!act) return;
  
  if (confirm(`Are you sure you want to delete "${act.name}" from all logs?`)) {
    appState.activities = appState.activities.filter(a => a.id !== actId);
    if (todayTracking.activities) delete todayTracking.activities[actId];
    
    Object.keys(appState.logs).forEach(date => {
      if (appState.logs[date].activities) {
        delete appState.logs[date].activities[actId];
      }
    });
    
    saveStateToLocalStorage();
    syncTodayLiveToLogs();
    renderActivitiesList();
    renderAnalyticsView();
  }
};

function calculateHabitStreak(habitName) {
  let streak = 0;
  const sortedDates = Object.keys(appState.logs).sort((a, b) => new Date(b) - new Date(a));
  
  // Include today in streak if checked
  if (todayTracking.habits[habitName] === true) {
    streak++;
  }

  for (let i = 0; i < sortedDates.length; i++) {
    const dateKey = sortedDates[i];
    
    // Ignore today's log in historical checks (it's already checked above)
    if (dateKey === todayTracking.date) continue;
    
    const log = appState.logs[dateKey];
    if (log && log.habits && log.habits[habitName] === true) {
      streak++;
    } else {
      break; // Streak broken
    }
  }
  return streak;
}

// 10. Load/Save Today's Progress Button Handlers
function loadTodayFromState() {
  const todayLog = appState.logs[todayTracking.date];
  
  if (todayLog) {
    todayTracking.mood = todayLog.mood;
    todayTracking.status = todayLog.status || "";
    todayTracking.activities = todayLog.activities ? { ...todayLog.activities } : {};
    todayTracking.habits = todayLog.habits ? { ...todayLog.habits } : {};
    
    // Bind back to input forms
    document.getElementById('dailyStatus').value = todayTracking.status;
    document.getElementById('charCount').textContent = todayTracking.status.length;
    
    // Highlight Mood
    if (todayTracking.mood > 0) {
      const btn = document.querySelector(`.mood-btn[data-mood="${todayTracking.mood}"]`);
      if (btn) btn.click();
    }
    
    // Ensure all current activities are represented in todayTracking
    appState.activities.forEach(act => {
      if (todayTracking.activities[act.id] === undefined) {
        todayTracking.activities[act.id] = 0;
      }
    });
    
    updateSaveStatusIndicator(true);
    renderTodayOverviewPreview();
  } else {
    // If no log exists, pre-check defaults
    todayTracking.mood = 0;
    todayTracking.status = "";
    document.getElementById('dailyStatus').value = "";
    document.getElementById('charCount').textContent = "0";
    
    // De-highlight all mood buttons
    const moodButtons = document.querySelectorAll('.mood-btn');
    moodButtons.forEach(b => {
      b.classList.remove('active');
      b.style.removeProperty('--active-bg-color');
      b.style.removeProperty('--active-border-color');
      b.style.removeProperty('--active-shadow-color');
    });

    todayTracking.activities = {};
    appState.activities.forEach(act => {
      todayTracking.activities[act.id] = 0;
    });

    todayTracking.habits = {};
    appState.habits.forEach(h => {
      todayTracking.habits[h] = false;
    });

    updateSaveStatusIndicator(false);
    renderTodayOverviewPreview();
  }

  // Render the activities list dynamically
  renderActivitiesList();
}

function updateSaveStatusIndicator(isSaved) {
  const orb = document.getElementById('saveIndicatorOrb');
  const title = document.getElementById('saveStatusTitle');
  const desc = document.getElementById('saveStatusDesc');

  if (isSaved) {
    orb.classList.add('saved');
    title.textContent = "Aura Logged!";
    desc.textContent = "Your stats are secure in your browser database.";
  } else {
    orb.classList.remove('saved');
    title.textContent = "Unsaved Changes";
    desc.textContent = "Click 'Log Today's Entry' to record these statistics.";
  }
}

// Button click logger action
document.getElementById('logDayBtn').addEventListener('click', () => {
  if (todayTracking.mood === 0) {
    alert("Please select a mood level to log your today's Aura.");
    return;
  }
  
  // Push into logs
  appState.logs[todayTracking.date] = JSON.parse(JSON.stringify(todayTracking));
  saveStateToLocalStorage();
  
  updateSaveStatusIndicator(true);
  renderTodayOverviewPreview();
  renderAnalyticsView();
  renderHistoryView();
  
  // Programmatically click today's day element so history detail displays instantly
  setTimeout(() => {
    const todayDayEl = document.querySelector(`.day[data-date="${todayTracking.date}"]`);
    if (todayDayEl) todayDayEl.click();
  }, 50);

  // Re-run icons
  lucide.createIcons();
});

function renderTodayOverviewPreview() {
  const container = document.getElementById('todaySummaryContent');
  const moodNames = ["", "Stressed", "Low", "Neutral", "Calm", "Energetic"];
  const moodSvg = moodSVGs[todayTracking.mood] || '';
  
  container.innerHTML = `
    <!-- Cute Sticker Stamp Box -->
    <div style="width: 38px; height: 38px; border-radius: 10px; background-color: var(--accent-mood-${todayTracking.mood}); display: inline-flex; align-items: center; justify-content: center; box-shadow: var(--shadow-sm); border: 2.5px solid var(--border-color); margin-bottom: 14px; filter: drop-shadow(0 2px 4px rgba(188,170,154,0.2));" title="Mood: ${moodNames[todayTracking.mood]}">
      ${moodSvg}
    </div>

    <p class="summary-text" style="margin-top: 10px;">"${todayTracking.status || 'No status note logged yet.'}"</p>
    <div class="summary-activities-list">
      ${appState.activities.map(act => {
        const val = todayTracking.activities[act.id] !== undefined ? todayTracking.activities[act.id] : 0;
        const suffix = (act.id === 'exercise' && val === 1) ? ' hr' : ' hrs';
        return `
          <div class="summary-activity-row">
            <span>${act.name}:</span>
            <span>${val}${suffix}</span>
          </div>
        `;
      }).join('')}
    </div>
  `;
}

// 11. Month-Wise History Accordion Rendering
function renderHistoryView() {
  const listContainer = document.getElementById('monthsHistoryList');
  const filterSelect = document.getElementById('monthFilter');
  const selectedFilter = filterSelect.value;
  
  // Group logs by Month-Year
  const groupedLogs = {};
  const allLogs = { ...appState.logs };
  const dates = Object.keys(allLogs).sort((a, b) => new Date(b) - new Date(a));
  
  if (dates.length === 0) {
    listContainer.innerHTML = `
      <div class="empty-state glass-card">
        <i data-lucide="calendar-x" class="large-empty-icon"></i>
        <h3>No history logged yet</h3>
        <p class="description">Post stats on the main dashboard to establish your monthly timelines.</p>
      </div>
    `;
    lucide.createIcons();
    return;
  }
  
  dates.forEach(dStr => {
    const key = getMonthYearLabel(dStr); // e.g., "August 2026"
    if (!groupedLogs[key]) {
      groupedLogs[key] = [];
    }
    groupedLogs[key].push(allLogs[dStr]);
  });
  
  // Populate filter dropdown
  const filterOpts = Object.keys(groupedLogs);
  const currentSelected = filterSelect.value;
  filterSelect.innerHTML = `<option value="all">All History</option>`;
  filterOpts.forEach(mLabel => {
    const opt = document.createElement('option');
    opt.value = mLabel;
    opt.textContent = mLabel;
    if (mLabel === currentSelected) opt.selected = true;
    filterSelect.appendChild(opt);
  });
  
  listContainer.innerHTML = '';
  
  Object.keys(groupedLogs).forEach((monthLabel, index) => {
    if (selectedFilter !== 'all' && selectedFilter !== monthLabel) {
      return;
    }
    
    const logsInMonth = groupedLogs[monthLabel];
    
    // Create Accordion Container
    const accItem = document.createElement('div');
    accItem.className = `month-accordion-item ${index === 0 ? 'active' : ''}`;
    
    const avgMood = (logsInMonth.reduce((acc, log) => acc + log.mood, 0) / logsInMonth.length).toFixed(1);
    
    accItem.innerHTML = `
      <div class="month-accordion-header">
        <div class="month-title-wrap">
          <i data-lucide="calendar" class="icon-activity"></i>
          <h3>${monthLabel}</h3>
          <span class="month-stats-badge">${logsInMonth.length} logs / Avg Mood: ${avgMood}</span>
        </div>
        <i data-lucide="chevron-down" class="accordion-chevron"></i>
      </div>
    `;
    
    const accBody = document.createElement('div');
    accBody.className = 'month-accordion-body';
    
    // Setup Split Screen Layout HTML inside the accordion (with Scrapbook decorations)
    const safeMonthId = monthLabel.replace(/\s+/g, '');
    accBody.innerHTML = `
      <div class="cozy-history-split">
        <!-- Left: Calendar Pane -->
        <div class="calendar-pane">
          <h4 style="font-size: 12px; text-transform: uppercase; letter-spacing: 0.05em; color: var(--text-muted); margin-bottom: 8px;">Mood Calendar Grid</h4>
          <div class="calendar-heatmap-grid" id="grid-${safeMonthId}"></div>
        </div>
        
        <!-- Center: Click Details Panel -->
        <div class="details-pane" id="details-${safeMonthId}">
          <div class="empty-detail-state">
            <svg width="36" height="36" viewBox="0 0 100 100" style="margin-bottom: 8px; filter: drop-shadow(0 2px 4px rgba(188,170,154,0.2));">
              <circle cx="50" cy="50" r="40" fill="#FAF7F2" stroke="#4A3E3D" stroke-width="4"/>
              <circle cx="50" cy="50" r="3" fill="#4A3E3D"/>
              <path d="M50,15 L50,50 L72,50" fill="none" stroke="#4A3E3D" stroke-width="4" stroke-linecap="round"/>
              <line x1="50" y1="10" x2="50" y2="15" stroke="#4A3E3D" stroke-width="3"/>
              <line x1="90" y1="50" x2="85" y2="50" stroke="#4A3E3D" stroke-width="3"/>
              <line x1="50" y1="90" x2="50" y2="85" stroke="#4A3E3D" stroke-width="3"/>
              <line x1="10" y1="50" x2="15" y2="50" stroke="#4A3E3D" stroke-width="3"/>
            </svg>
            <p style="font-size: 13px; color: var(--text-muted); margin-top: 8px; font-weight: 600;">Select a calendar block on the left to see your logged routine.</p>
          </div>
        </div>
      </div>
      
      <!-- Bottom: Reflection Hover Box -->
      <div class="reflection-hover-box" id="reflection-${safeMonthId}" style="display: none; opacity: 0;">
        <!-- Filled dynamically when a day is clicked -->
      </div>
    `;
    
    const heatmapGrid = accBody.querySelector(`#grid-${safeMonthId}`);
    
    // Populate calendar grid days
    const parts = logsInMonth[0].date.split('-');
    const yearNum = parseInt(parts[0]);
    const monthNum = parseInt(parts[1]);
    const totalDays = new Date(yearNum, monthNum, 0).getDate();
    
    for (let day = 1; day <= totalDays; day++) {
      const dayStr = `${yearNum}-${String(monthNum).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      const dayLog = allLogs[dayStr];
      
      const dayEl = document.createElement('div');
      dayEl.className = 'heatmap-day';
      dayEl.dataset.date = dayStr;
      dayEl.textContent = day;
      
      // Is today's date?
      if (dayStr === todayTracking.date) {
        dayEl.classList.add('today-day-block');
      }

      if (dayLog && dayLog.mood > 0) {
        dayEl.classList.add(`mood-${dayLog.mood}`);
        dayEl.classList.add('logged-day-highlight');
        dayEl.title = `Logged Entry for ${dayStr}: Mood Rating ${dayLog.mood}/5`;

        dayEl.addEventListener('click', () => {
          const detailsPane = accBody.querySelector(`#details-${safeMonthId}`);
          const reflectionBox = accBody.querySelector(`#reflection-${safeMonthId}`);
          
          const moodTexts = ["", "Stressed", "Low", "Neutral", "Calm", "Energetic"];
          const moodSvg = moodSVGs[dayLog.mood] || '';
          
          // Render details inside the right panel
          detailsPane.innerHTML = `
            <div class="details-pane-header" style="display: flex; align-items: center; gap: 6px;">
              <i data-lucide="calendar" style="width: 14px; height: 14px; color: #E29578;"></i>
              <span>${getReadableDate(dayStr)}</span>
            </div>
            
            <!-- Cute Sticker Stamp Box -->
            <div style="width: 38px; height: 38px; border-radius: 10px; background-color: var(--accent-mood-${dayLog.mood}); display: inline-flex; align-items: center; justify-content: center; box-shadow: var(--shadow-sm); border: 2.5px solid var(--border-color); margin-bottom: 14px; filter: drop-shadow(0 2px 4px rgba(188,170,154,0.2));" title="Mood: ${moodTexts[dayLog.mood]}">
              ${moodSvg}
            </div>
            
            <p style="font-size: 13px; font-style: italic; color: var(--text-muted); margin-bottom: 16px;">"${dayLog.status || 'No status note.'}"</p>
            
            <div class="history-detail-widgets">
              <!-- Dynamic Activities -->
              ${appState.activities.map(act => {
                const hours = (dayLog.activities && dayLog.activities[act.id] !== undefined) ? dayLog.activities[act.id] : 0;
                const iconHtml = (activityIcons[act.icon] || activityIcons['coffee'])
                  .replace('width="32"', 'width="18"')
                  .replace('height="32"', 'height="18"');
                
                const isMissed = (act.id === 'exercise' || act.id.includes('gym')) && hours === 0;
                const statusClass = isMissed ? 'missed' : 'neutral';
                
                return `
                  <div class="history-detail-item ${statusClass}">
                    <span>
                      ${iconHtml}
                      ${act.name}:
                    </span>
                    <span>${hours}h</span>
                  </div>
                `;
              }).join('')}
              
              <!-- Habits -->
              ${appState.habits.map(habit => {
                const isDone = dayLog.habits && dayLog.habits[habit] === true;
                
                return `
                  <div class="history-detail-item ${isDone ? 'done' : 'neutral'}">
                    <span>
                      <i data-lucide="check-circle-2" style="width: 15px; height: 15px; color: ${isDone ? 'var(--color-accent-dark)' : 'var(--text-muted)'}; flex-shrink: 0;"></i>
                      ${habit}
                    </span>
                    <span class="${isDone ? 'habit-done-badge' : 'habit-pending-badge'}">
                      ${isDone ? '<i data-lucide="check" style="width: 12px; height: 12px;"></i> Done' : '—'}
                    </span>
                  </div>
                `;
              }).join('')}
            </div>
          `;
          
          // Calculate averages for reflection comparison
          const allLogsCopy = { ...appState.logs };
          const datesList = Object.keys(allLogsCopy);
          const totalLogs = datesList.length;
          
          let avgGym = 0;
          let waterSuccess = 0;
          datesList.forEach(d => {
            if (allLogsCopy[d].activities) avgGym += allLogsCopy[d].activities.exercise || 0;
            if (allLogsCopy[d].habits && allLogsCopy[d].habits["Hydrate (2L+)"] === true) waterSuccess++;
          });
          
          if (totalLogs > 0) {
            avgGym = avgGym / totalLogs;
            waterSuccess = waterSuccess / totalLogs;
          }
          
          // Check Gym/Fitness (Mandatory activity)
          const gymAct = appState.activities.find(a => {
            const name = a.name.toLowerCase();
            return name.includes('gym') || name.includes('fitness') || name.includes('exercise') || name.includes('workout');
          });
          const missedGym = gymAct ? (!dayLog.activities || dayLog.activities[gymAct.id] === undefined || dayLog.activities[gymAct.id] === 0) : false;

          // Check Hydration/Water (Mandatory habit)
          const waterHabit = appState.habits.find(h => {
            const name = h.toLowerCase();
            return name.includes('water') || name.includes('hydrate');
          });
          const missedWater = waterHabit ? (!dayLog.habits || dayLog.habits[waterHabit] !== true) : false;

          // Generate date-seeded reflection/motivation
          const text = getSeededReflection(dayStr, missedGym, missedWater);
          const isAligned = !missedGym && !missedWater;
          reflectionBox.innerHTML = `
            <i data-lucide="${isAligned ? 'sparkles' : 'lightbulb'}" style="width: 18px; height: 18px; color: ${isAligned ? '#a3b19b' : 'var(--color-accent-dark)'}; flex-shrink: 0;"></i>
            <div>
              ${text}
            </div>
          `;
          reflectionBox.style.display = "flex";
          reflectionBox.style.opacity = "1";
          lucide.createIcons();
        });
      } else {
        dayEl.title = `No data recorded for day ${day}`;
        dayEl.addEventListener('click', () => {
          const detailsPane = accBody.querySelector(`#details-${safeMonthId}`);
          if (detailsPane) {
            detailsPane.innerHTML = `
              <div class="empty-detail-state">
                <i data-lucide="calendar" style="width: 32px; height: 32px; color: var(--text-muted); margin-bottom: 8px;"></i>
                <p style="font-size: 13px; color: var(--text-muted); font-weight: 600;">No routine entry logged for ${getReadableDate(dayStr)}.</p>
              </div>
            `;
            if (window.lucide) window.lucide.createIcons();
          }
        });
      }
      
      heatmapGrid.appendChild(dayEl);
    }
    
    accItem.appendChild(accBody);
    
    // Toggle Event
    accItem.querySelector('.month-accordion-header').addEventListener('click', () => {
      const isActive = accItem.classList.contains('active');
      document.querySelectorAll('.month-accordion-item').forEach(el => el.classList.remove('active'));
      if (!isActive) {
        accItem.classList.add('active');
      }
    });
    
    listContainer.appendChild(accItem);
  });
  
  filterSelect.onchange = () => {
    renderHistoryView();
  };
  
  lucide.createIcons();
}

// 12. Aura Analytics & Visual Charts Engine
function renderAnalyticsView() {
  const allLogs = { ...appState.logs };
  const dates = Object.keys(allLogs);
  const totalDays = dates.length;
  
  // Calculate Avg Mood
  const avgMood = totalDays > 0 ? (dates.reduce((sum, d) => sum + allLogs[d].mood, 0) / totalDays).toFixed(1) : "0.0";
  document.getElementById('metric-days').textContent = totalDays;
  document.getElementById('metric-mood').textContent = `${avgMood} / 5.0`;

  // Calculate Streak
  const streak = calculateCurrentStreak(allLogs);
  document.getElementById('metric-streak').textContent = `${streak} ${streak === 1 ? 'day' : 'days'}`;
  
  // Calculate Habit Completion Master Percentage
  let totalHabitOpportunities = 0;
  let totalHabitsDone = 0;
  dates.forEach(d => {
    const log = allLogs[d];
    if (log.habits) {
      Object.keys(log.habits).forEach(h => {
        totalHabitOpportunities++;
        if (log.habits[h] === true) totalHabitsDone++;
      });
    }
  });
  const habitPct = totalHabitOpportunities > 0 ? Math.round((totalHabitsDone / totalHabitOpportunities) * 100) : 0;
  document.getElementById('metric-habits').textContent = `${habitPct}%`;

  // Render Mood Breakdown Bar Chart (Always renders all 5 moods!)
  renderMoodBreakdown(allLogs, totalDays);
  
  // Render Habits Analytics Lists (Always renders active habits!)
  renderHabitsMasterAnalytics(allLogs);
  
  // Render Polar SVG Chart
  renderPolarBalanceChart(allLogs);
}

function calculateCurrentStreak(allLogs) {
  let streak = 0;
  const todayStr = getFormattedDate(new Date());
  let checkDate = new Date();
  
  // If today isn't logged, start check from yesterday
  if (!allLogs[todayStr]) {
    checkDate.setDate(checkDate.getDate() - 1);
  }
  
  while (true) {
    const dateStr = getFormattedDate(checkDate);
    if (allLogs[dateStr]) {
      streak++;
      checkDate.setDate(checkDate.getDate() - 1);
    } else {
      break;
    }
  }
  return streak;
}

function renderMoodBreakdown(allLogs, totalDays) {
  const container = document.getElementById('moodBreakdownContainer');
  container.innerHTML = '';
  
  const counts = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
  Object.keys(allLogs).forEach(d => {
    const m = allLogs[d].mood;
    if (counts[m] !== undefined) counts[m]++;
  });
  
  const labels = ["", "Stressed", "Low", "Neutral", "Calm", "Energetic"];
  const colors = ["", "var(--accent-mood-1)", "var(--accent-mood-2)", "var(--accent-mood-3)", "var(--accent-mood-4)", "var(--accent-mood-5)"];
  
  for (let mood = 5; mood >= 1; mood--) {
    const count = counts[mood];
    const pct = totalDays > 0 ? Math.round((count / totalDays) * 100) : 0;
    
    const row = document.createElement('div');
    row.className = 'mood-breakdown-row';
    
    row.innerHTML = `
      <span style="width: 100px; display: inline-flex; align-items: center; gap: 6px; font-weight: 600; font-size: 13px;">
        ${moodSVGs[mood]}
        ${labels[mood]}
      </span>
      <div class="breakdown-bar-bg">
        <div class="breakdown-bar-fill" style="width: ${pct}%; --bar-color: ${colors[mood]}"></div>
      </div>
      <span class="breakdown-percent">${pct}%</span>
    `;
    container.appendChild(row);
  }
}

function renderHabitsMasterAnalytics(allLogs) {
  const container = document.getElementById('habitAnalyticsContainer');
  container.innerHTML = '';
  
  if (appState.habits.length === 0) {
    container.innerHTML = `<p class="description">No habits defined yet.</p>`;
    return;
  }
  
  const dates = Object.keys(allLogs);
  const totalLoggedDays = dates.length;
  
  appState.habits.forEach(habit => {
    let checkedDays = 0;
    
    dates.forEach(d => {
      const log = allLogs[d];
      if (log.habits && log.habits[habit] === true) {
        checkedDays++;
      }
    });
    
    const pct = totalLoggedDays > 0 ? Math.round((checkedDays / totalLoggedDays) * 100) : 0;
    const streak = calculateHabitStreak(habit);
    
    let statusLabel = "Active";
    let statusColor = "var(--text-muted)";
    let badgeSvg = `<svg width="11" height="11" viewBox="0 0 24 24" style="display:inline-block; vertical-align:middle; margin-right:4px;"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" fill="#EAE2D7" stroke="#4A3E3D" stroke-width="1.8"/></svg>`;

    if (totalLoggedDays < 4) {
      statusLabel = "Active";
      statusColor = "var(--text-muted)";
      badgeSvg = `<svg width="11" height="11" viewBox="0 0 24 24" style="display:inline-block; vertical-align:middle; margin-right:4px;"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" fill="#EAE2D7" stroke="#4A3E3D" stroke-width="1.8"/></svg>`;
    } else if (streak >= 5) {
      statusLabel = "Unstoppable!";
      statusColor = "#EF6C00";
      badgeSvg = `<svg width="11" height="11" viewBox="0 0 24 24" style="display:inline-block; vertical-align:middle; margin-right:4px;"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" fill="#FFE082" stroke="#4A3E3D" stroke-width="1.8"/></svg>`;
    } else if (streak === 0 && checkedDays === 0) {
      statusLabel = "Needs Love";
      statusColor = "#C62828";
      badgeSvg = `<svg width="11" height="11" viewBox="0 0 24 24" style="display:inline-block; vertical-align:middle; margin-right:4px;"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" fill="#FFCDD2" stroke="#4A3E3D" stroke-width="1.8"/></svg>`;
    } else if (pct >= 80 && totalLoggedDays >= 7) {
      statusLabel = "Mastered!";
      statusColor = "#2E7D32";
      badgeSvg = `<svg width="11" height="11" viewBox="0 0 24 24" style="display:inline-block; vertical-align:middle; margin-right:4px;"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" fill="#a3b19b" stroke="#4A3E3D" stroke-width="1.8"/></svg>`;
    } else {
      statusLabel = "Cozy Pace";
      statusColor = "var(--text-muted)";
      badgeSvg = `<svg width="11" height="11" viewBox="0 0 24 24" style="display:inline-block; vertical-align:middle; margin-right:4px;"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" fill="#EAE2D7" stroke="#4A3E3D" stroke-width="1.8"/></svg>`;
    }
    
    // Choose custom SVG sticker icon depending on habit name
    let habitSvg = `<svg width="18" height="18" viewBox="0 0 24 24" style="display:inline-block; vertical-align:middle; margin-right:4px;"><circle cx="12" cy="12" r="10" fill="#FFE5D9" stroke="#4A3E3D" stroke-width="1.8"/><path d="M9 12l2 2 4-4" stroke="#4A3E3D" stroke-width="2" stroke-linecap="round" fill="none"/></svg>`;
    
    if (habit.toLowerCase().includes("water") || habit.toLowerCase().includes("hydrate")) {
      habitSvg = `<svg width="18" height="18" viewBox="0 0 24 24" style="display:inline-block; vertical-align:middle; margin-right:4px;"><path d="M5 8h12v4a6 6 0 0 1-6 6H10a6 6 0 0 1-6-6V8z" fill="#FFE5D9" stroke="#4A3E3D" stroke-width="1.8"/><path d="M17 10h2a2 2 0 0 1 0 4H17" fill="none" stroke="#4A3E3D" stroke-width="1.8"/></svg>`;
    } else if (habit.toLowerCase().includes("read") || habit.toLowerCase().includes("book")) {
      habitSvg = `<svg width="18" height="18" viewBox="0 0 24 24" style="display:inline-block; vertical-align:middle; margin-right:4px;"><path d="M4 6c3 0 6 0 8 2M20 6c-3 0-6 0-8 2" fill="none" stroke="#4A3E3D" stroke-width="1.8" stroke-linejoin="round"/><rect x="4" y="6" width="16" height="12" rx="1" fill="#FFFFFF" stroke="#4A3E3D" stroke-width="1.8"/></svg>`;
    }

    const row = document.createElement('div');
    row.className = 'habit-analytics-row';
    row.innerHTML = `
      <div class="habit-analytics-info">
        <span style="display:inline-flex; align-items:center; gap:6px;">
          ${habitSvg}
          ${habit}
        </span>
        <span style="font-weight: 700; color: ${statusColor}; font-size: 12px; display: inline-flex; align-items: center; gap: 4px;">
          ${badgeSvg}
          ${statusLabel} (${checkedDays}/${totalLoggedDays} days)
        </span>
      </div>
      <div class="habit-bar-bg">
        <div class="habit-bar-fill" style="width: ${pct}%; background: ${pct >= 80 ? '#a3b19b' : 'var(--color-accent)'};"></div>
      </div>
    `;
    container.appendChild(row);
  });
}

// Polar Radar Chart rendering in raw SVG
function renderPolarBalanceChart(allLogs) {
  const svg = document.getElementById('balancePolarChart');
  const legend = document.getElementById('chartLegend');
  if (!svg || !legend) return;
  svg.innerHTML = '';
  legend.innerHTML = '';
  
  if (appState.activities.length === 0) {
    return;
  }
  
  // Dynamically map activities from appState
  const activities = appState.activities.map(act => {
    return {
      key: act.id,
      label: act.name,
      color: act.color || 'var(--color-rose)'
    };
  });
  
  const dates = Object.keys(allLogs);
  const total = dates.length;
  
  // Calculate average hours per activity dynamically
  const avgs = {};
  activities.forEach(act => {
    avgs[act.key] = 0;
  });
  
  dates.forEach(d => {
    const acts = allLogs[d].activities;
    if (acts) {
      activities.forEach(act => {
        avgs[act.key] += acts[act.key] || 0;
      });
    }
  });
  
  activities.forEach(act => {
    avgs[act.key] = total > 0 ? (avgs[act.key] / total) : 0;
  });
  
  // SVG Center parameters
  const cx = 100;
  const cy = 100;
  const maxRadius = 80;
  const maxHoursVal = 10; // Max bound hours for 100% chart radius
  
  // Render grid background rings
  for (let ring = 1; ring <= 4; ring++) {
    const r = (ring / 4) * maxRadius;
    const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    circle.setAttribute("cx", cx);
    circle.setAttribute("cy", cy);
    circle.setAttribute("r", r);
    circle.setAttribute("fill", "none");
    circle.setAttribute("stroke", "rgba(74, 62, 61, 0.08)");
    circle.setAttribute("stroke-dasharray", "4 4");
    svg.appendChild(circle);
  }
  
  // Gather coordinates for the radar polygon path
  const points = [];
  const numActivities = activities.length;
  
  activities.forEach((act, i) => {
    const val = Math.min(avgs[act.key], maxHoursVal);
    const radius = (val / maxHoursVal) * maxRadius;
    
    // Angle in radians (distribute evenly around 360 degrees)
    const angle = (i * 2 * Math.PI / numActivities) - (Math.PI / 2); // Start at top
    
    const x = cx + radius * Math.cos(angle);
    const y = cy + radius * Math.sin(angle);
    points.push(`${x},${y}`);
    
    // Draw Axis grid lines
    const lineX = cx + maxRadius * Math.cos(angle);
    const lineY = cy + maxRadius * Math.sin(angle);
    const axisLine = document.createElementNS("http://www.w3.org/2000/svg", "line");
    axisLine.setAttribute("x1", cx);
    axisLine.setAttribute("y1", cy);
    axisLine.setAttribute("x2", lineX);
    axisLine.setAttribute("y2", lineY);
    axisLine.setAttribute("stroke", "rgba(74, 62, 61, 0.08)");
    svg.appendChild(axisLine);
    
    // Add Label points
    const textDist = maxRadius + 14;
    const tx = cx + textDist * Math.cos(angle);
    const ty = cy + textDist * Math.sin(angle) + 4; // Adjust vertical centering
    const labelText = document.createElementNS("http://www.w3.org/2000/svg", "text");
    labelText.setAttribute("x", tx);
    labelText.setAttribute("y", ty);
    labelText.setAttribute("fill", "var(--text-dark)");
    labelText.setAttribute("font-size", "9");
    labelText.setAttribute("text-anchor", "middle");
    labelText.textContent = act.label;
    svg.appendChild(labelText);
    
    // Add item to legend
    const legendItem = document.createElement('div');
    legendItem.className = 'legend-item';
    legendItem.innerHTML = `
      <div class="legend-color" style="background: ${act.color}"></div>
      <span style="color:var(--text-primary); font-weight:500;">${act.label}:</span>
      <span style="color:var(--text-muted);">${avgs[act.key].toFixed(1)} hrs</span>
    `;
    legend.appendChild(legendItem);
  });
  
  // Render central polygon area
  if (points.length > 0) {
    const polygon = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
    polygon.setAttribute("points", points.join(" "));
    polygon.setAttribute("fill", "rgba(131, 197, 190, 0.2)");
    polygon.setAttribute("stroke", "#83c5be");
    polygon.setAttribute("stroke-width", "2");
    svg.appendChild(polygon);
  }
}

function initSettingsProfile() {
  const usernameInput = document.getElementById('usernameInput');
  const aspirationInput = document.getElementById('aspirationInput');
  const saveProfileBtn = document.getElementById('saveProfileBtn');
  
  if (!usernameInput || !saveProfileBtn) return;
  
  // Set initial settings inputs values
  usernameInput.value = appState.profile.username || "Guest Tracker";
  if (aspirationInput) aspirationInput.value = appState.profile.focus || "Self-Improvement";
  
  // Handle avatar color choices (LIVE PREVIEW & APPLY)
  const colorButtons = document.querySelectorAll('.avatar-color-btn');
  colorButtons.forEach(btn => {
    const color = btn.getAttribute('data-color');
    if (color === appState.profile.avatarColor) {
      colorButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    }
    
    btn.addEventListener('click', () => {
      colorButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      appState.profile.avatarColor = color;
      updateAvatarColorPreview(color);
      applyThemeColor(color);
      saveStateToLocalStorage();
    });
  });
  
  updateAvatarColorPreview(appState.profile.avatarColor || 'clay');

  // Handle Light / Dark Theme Mode choices
  const lightBtn = document.getElementById('lightModeBtn');
  const darkBtn = document.getElementById('darkModeBtn');
  const headerThemeBtn = document.getElementById('headerThemeToggleBtn');

  if (lightBtn) lightBtn.addEventListener('click', () => setThemeMode('light'));
  if (darkBtn) darkBtn.addEventListener('click', () => setThemeMode('dark'));
  if (headerThemeBtn) headerThemeBtn.addEventListener('click', toggleThemeMode);
  
  saveProfileBtn.addEventListener('click', () => {
    appState.profile.username = usernameInput.value.trim() || "Guest Tracker";
    if (aspirationInput) appState.profile.focus = aspirationInput.value.trim() || "Self-Improvement";
    
    saveStateToLocalStorage();
    updateNavUserDisplay();
    alert("Profile saved successfully!");
  });
  
  // Data Portability actions (safe checks)
  const expBtn = document.getElementById('exportDataBtn');
  if (expBtn) expBtn.addEventListener('click', exportData);
  
  const impFile = document.getElementById('importFile');
  if (impFile) impFile.addEventListener('change', importData);
  
  const resBtn = document.getElementById('resetDataBtn');
  if (resBtn) resBtn.addEventListener('click', resetData);

  const feedbackForm = document.getElementById('feedbackForm');
  if (feedbackForm) {
    feedbackForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const senderInput = document.getElementById('feedbackSender');
      const msgInput = document.getElementById('feedbackMessage');
      const submitBtn = feedbackForm.querySelector('button[type="submit"]');

      const sender = senderInput.value.trim();
      const msg = msgInput.value.trim();
      if (!sender || !msg) return;

      const originalBtnHtml = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = `<span>Sending feedback... ⏳</span>`;

      try {
        const response = await fetch("https://formsubmit.co/ajax/abayawikkrama@gmail.com", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
          },
          body: JSON.stringify({
            name: sender,
            message: msg,
            _subject: `Aura Website Feedback from ${sender}`
          })
        });

        if (response.ok) {
          alert("Thank you! Your feedback has been sent directly to Sanidi's inbox.");
          msgInput.value = "";
        } else {
          // Fallback if blocked
          const subject = encodeURIComponent(`Aura Website Feedback from ${sender}`);
          const body = encodeURIComponent(`Hi Sanidi,\n\nHere is feedback regarding your Aura website from ${sender}:\n\n"${msg}"`);
          window.location.href = `mailto:abayawikkrama@gmail.com?subject=${subject}&body=${body}`;
        }
      } catch (err) {
        // Fallback if offline
        const subject = encodeURIComponent(`Aura Website Feedback from ${sender}`);
        const body = encodeURIComponent(`Hi Sanidi,\n\nHere is feedback regarding your Aura website from ${sender}:\n\n"${msg}"`);
        window.location.href = `mailto:abayawikkrama@gmail.com?subject=${subject}&body=${body}`;
      } finally {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnHtml;
        if (window.lucide) window.lucide.createIcons();
      }
    });
  }
}

function updateAvatarColorPreview(colorName) {
  const avatarLarge = document.getElementById('avatarPreview');
  let gradient = "";
  switch(colorName) {
    case 'emerald': gradient = "linear-gradient(135deg, #d8e2dc, #a3b19b)"; break;
    case 'rose': gradient = "linear-gradient(135deg, #ffb5a7, #fcd5ce)"; break;
    case 'cyan': gradient = "linear-gradient(135deg, #d6e2e9, #a9c6e2)"; break;
    case 'amber': gradient = "linear-gradient(135deg, #ffe5d9, #ffcad4)"; break;
    case 'clay':
    default: gradient = "linear-gradient(135deg, #f2d5c4, #dfbca7)"; // Clay
  }
  if (avatarLarge) avatarLarge.style.background = gradient;
  
  // Update nav avatar color too
  const navAv = document.getElementById('navAvatar');
  if (navAv) navAv.style.background = gradient;

  // Apply theme color to whole website
  applyThemeColor(colorName);
}

function applyThemeColor(colorName) {
  const root = document.documentElement;
  let accent = "";
  let accentHover = "";
  let accentGlow = "";
  let accentSecondary = "";
  let accentDark = "";

  switch(colorName) {
    case 'emerald':
      accent = "#a3b19b";
      accentHover = "#d8e2dc";
      accentGlow = "rgba(163, 177, 155, 0.2)";
      accentSecondary = "#c5d2be";
      accentDark = "#52604d";
      break;
    case 'rose':
      accent = "#ffb5a7";
      accentHover = "#fcd5ce";
      accentGlow = "rgba(255, 181, 167, 0.2)";
      accentSecondary = "#fec5bb";
      accentDark = "#e29578";
      break;
    case 'cyan':
      accent = "#a9c6e2";
      accentHover = "#d6e2e9";
      accentGlow = "rgba(169, 198, 226, 0.2)";
      accentSecondary = "#b5cdf5";
      accentDark = "#4682b4";
      break;
    case 'amber':
      accent = "#ffcad4";
      accentHover = "#ffe5d9";
      accentGlow = "rgba(255, 202, 212, 0.2)";
      accentSecondary = "#ffd2da";
      accentDark = "#e07a5f";
      break;
    case 'clay':
    default:
      accent = "#dfbca7"; // Cozy clay accent
      accentHover = "#f5dfd3";
      accentGlow = "rgba(223, 188, 167, 0.2)";
      accentSecondary = "#f2d5c4";
      accentDark = "#b56b45"; // Terracotta clay text/icon color
      break;
  }

  root.style.setProperty('--color-accent', accent);
  root.style.setProperty('--color-accent-hover', accentHover);
  root.style.setProperty('--color-accent-glow', accentGlow);
  root.style.setProperty('--color-accent-secondary', accentSecondary);
  root.style.setProperty('--color-accent-dark', accentDark);
  root.style.setProperty('--border-focus', accent);
}

function setThemeMode(mode) {
  const root = document.documentElement;
  const body = document.body;
  appState.themeMode = mode || 'light';
  
  root.setAttribute('data-theme', appState.themeMode);
  if (body) body.setAttribute('data-theme', appState.themeMode);

  // Update theme-color meta tag so app window bar blends 100% with background
  const themeMeta = document.querySelector('meta[name="theme-color"]');
  if (themeMeta) {
    themeMeta.setAttribute('content', appState.themeMode === 'dark' ? '#141210' : '#FAF6F0');
  }

  // Update Settings buttons state
  const lightBtn = document.getElementById('lightModeBtn');
  const darkBtn = document.getElementById('darkModeBtn');
  if (lightBtn && darkBtn) {
    if (appState.themeMode === 'dark') {
      darkBtn.classList.add('active');
      lightBtn.classList.remove('active');
    } else {
      lightBtn.classList.add('active');
      darkBtn.classList.remove('active');
    }
  }

  saveStateToLocalStorage();
}

function toggleThemeMode() {
  const currentMode = appState.themeMode === 'dark' ? 'light' : 'dark';
  setThemeMode(currentMode);
}

function updateNavUserDisplay() {
  const user = appState.profile.username || "User";
  const initial = user.charAt(0).toUpperCase();
  
  document.getElementById('navUsername').textContent = user;
  document.getElementById('greeting').textContent = (user === "User" || user === "Guest") ? "Welcome to Bloom" : `Welcome to Bloom, ${user}`;
  document.getElementById('navAvatar').textContent = initial;
  document.getElementById('avatarPreview').textContent = initial;
  
  updateAvatarColorPreview(appState.profile.avatarColor);
}

// Export State to JSON file download
function exportData() {
  const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(appState, null, 2));
  const downloadAnchor = document.createElement('a');
  downloadAnchor.setAttribute("href", dataStr);
  downloadAnchor.setAttribute("download", `aura_dashboard_backup_${todayTracking.date}.json`);
  document.body.appendChild(downloadAnchor);
  downloadAnchor.click();
  downloadAnchor.remove();
}

// Import State from JSON file upload
function importData(event) {
  const file = event.target.files[0];
  if (!file) return;
  
  const reader = new FileReader();
  reader.onload = function(e) {
    try {
      const parsed = JSON.parse(e.target.result);
      // Validate structure basics
      if (parsed.profile && parsed.habits && parsed.logs) {
        appState = parsed;
        saveStateToLocalStorage();
        
        // Full Refresh UI
        loadTodayFromState();
        renderHabitsList();
        renderHistoryView();
        renderAnalyticsView();
        updateNavUserDisplay();
        
        alert("Aura history successfully restored from backup!");
      } else {
        alert("Invalid file format. Please upload a valid Aura backup file.");
      }
    } catch(err) {
      alert("Error parsing backup file. Make sure it is a valid JSON file.");
    }
  };
  reader.readAsText(file);
}

// Reset data fully
function resetData() {
  if (confirm("WARNING: Are you absolutely sure you want to clear your entire Aura history? This cannot be undone.")) {
    localStorage.removeItem('aura_dashboard_state');
    appState = {
      profile: { username: "User", focus: "Productivity & Health", avatarColor: "clay" },
      habits: [...DEFAULT_HABITS],
      activities: [...DEFAULT_ACTIVITIES],
      logs: {},
      memories: {},
      pinnedPriorities: []
    };
    saveStateToLocalStorage();
    
    // Reset inputs
    const dailyStatusEl = document.getElementById('dailyStatus');
    if (dailyStatusEl) dailyStatusEl.value = '';
    const charCountEl = document.getElementById('charCount');
    if (charCountEl) charCountEl.textContent = '0';
    
    todayTracking = {
      date: getFormattedDate(new Date()),
      mood: 0,
      status: "",
      activities: {},
      habits: {}
    };

    appState.activities.forEach(act => {
      todayTracking.activities[act.id] = 0;
    });
    appState.habits.forEach(h => {
      todayTracking.habits[h] = false;
    });
    
    // Refresh GUI
    loadTodayFromState();
    renderHabitsList();
    renderActivitiesList();
    renderHistoryView();
    renderAnalyticsView();
    renderPriorityTasks();
    updateNavUserDisplay();
    
    alert("Your request has been successful. Your Aura dashboard data has been reset.");
  }
}

function hashCode(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  return Math.abs(hash);
}

function getSeededReflection(dateStr, missedGym, missedWater) {
  const seed = hashCode(dateStr);
  
  const waterQuotes = [
    "A drop of water is worth more than gold to your body. Remember to hydrate tomorrow!",
    "Water is the source of life and energy. Let's make sure we drink enough water tomorrow!",
    "Your brain and body need hydration to stay sharp. Drink a fresh glass of water to refresh!",
    "Small sips of water lead to huge boosts in focus. Keep a bottle nearby tomorrow!",
    "Nourish your cells and keep your aura bright. Let's prioritize clean hydration!",
    "Feel tired? Clean hydration is the best natural cure. Give your body the water it needs!"
  ];
  
  const gymQuotes = [
    "Take care of your body. It is the only place you have to live. Let's get moving tomorrow!",
    "No matter how short your workout is, it keeps your heart healthy and your mind clear.",
    "Physical movement is the key to mental clarity and stress relief. Let's find time for it tomorrow!",
    "Your health is a lifelong investment. Find just 10 minutes to stretch or walk tomorrow!",
    "Every drop of sweat is a deposit into your future health. Let's bring back the movement!",
    "Keep consistency alive! Even a light walk or quick workout does wonders for your aura."
  ];
  
  const bothQuotes = [
    "Your health is your true wealth. Tomorrow is a perfect fresh page to hydrate and move your body!",
    "Clean water and daily movement are the foundations of health. You can restart tomorrow!",
    "Let's prioritize what is mandatory for a long, happy life. Hydrate and get moving tomorrow!",
    "Take a deep breath and start fresh tomorrow with a glass of water and a quick workout. You've got this!"
  ];
  
  const successQuotes = [
    "Wow, you did great! Your hydration and fitness are aligning perfectly today. Keep shining!",
    "Superb alignment! You nourished your body and stayed active. You are doing amazing!",
    "Everything is aligning! Beautiful work on maintaining your physical health and hydration today.",
    "Outstanding effort! You successfully hydrated and moved your body. Keep this beautiful momentum going!"
  ];

  if (missedGym && missedWater) {
    const q = bothQuotes[seed % bothQuotes.length];
    return `<strong>Reflection Point:</strong> ${q}`;
  } else if (missedGym) {
    const q = gymQuotes[seed % gymQuotes.length];
    return `<strong>Reflection Point (Fitness skipped):</strong> ${q}`;
  } else if (missedWater) {
    const q = waterQuotes[seed % waterQuotes.length];
    return `<strong>Reflection Point (Water skipped):</strong> ${q}`;
  } else {
    const q = successQuotes[seed % successQuotes.length];
    return `<strong>Wow, you did great!</strong> ${q}`;
  }
}

// 📌 COZY PASTEL STICKY NOTE LOGIC (MULTI-TASK PINNED PRIORITIES)
// ----------------------------------------------------------------
function initPriorityStickyNote() {
  if (!appState.pinnedPriorities) {
    appState.pinnedPriorities = [];
  }

  const priorityInput = document.getElementById('priorityInput');
  const addBtn = document.getElementById('addPriorityBtn');

  if (addBtn && priorityInput) {
    const handleAdd = () => {
      const text = priorityInput.value.trim();
      if (!text) return;

      const newTask = {
        id: Date.now().toString(),
        text: text,
        createdDate: getFormattedDate(new Date())
      };

      appState.pinnedPriorities.push(newTask);
      saveStateToLocalStorage();
      priorityInput.value = '';
      renderPriorityTasks();
    };

    addBtn.addEventListener('click', handleAdd);
    priorityInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') handleAdd();
    });
  }

  renderPriorityTasks();
}

function renderPriorityTasks() {
  const container = document.getElementById('stickyTasksContainer');
  if (!container) return;

  container.innerHTML = '';

  if (!appState.pinnedPriorities) {
    appState.pinnedPriorities = [];
  }

  // Filter tasks for today's date so they refresh day by day
  const todayKey = todayTracking.date || getFormattedDate(new Date());
  const tasks = appState.pinnedPriorities.filter(t => t.createdDate === todayKey);

  if (tasks.length === 0) {
    container.innerHTML = `<p class="description" style="font-size: 11.5px; margin: 4px 0; text-align: center; color: var(--text-muted);">No priority tasks pinned for today. Add one above!</p>`;
    return;
  }

  tasks.forEach(task => {
    const item = document.createElement('div');
    item.className = `spotlight-task-item ${task.isDone ? 'completed' : ''}`;
    item.dataset.id = task.id;

    item.innerHTML = `
      <div style="display: flex; align-items: center; gap: 8px; flex-grow: 1;">
        <i data-lucide="pin" style="width: 14px; height: 14px; color: var(--color-accent-dark); flex-shrink: 0;"></i>
        <span>${task.text}</span>
      </div>
      <div style="display: flex; align-items: center; gap: 6px;">
        <button class="priority-done-btn" title="Toggle Completion">
          <i data-lucide="check" style="width: 12px; height: 12px;"></i>
          <span>${task.isDone ? 'Completed' : 'Done'}</span>
        </button>
        <button class="priority-del-btn" title="Delete Task">
          <i data-lucide="trash-2" style="width: 13px; height: 13px;"></i>
        </button>
      </div>
    `;

    const doneBtn = item.querySelector('.priority-done-btn');
    const delBtn = item.querySelector('.priority-del-btn');

    doneBtn.addEventListener('click', () => {
      task.isDone = !task.isDone;
      saveStateToLocalStorage();
      renderPriorityTasks();
    });

    delBtn.addEventListener('click', () => {
      deletePriorityTask(task.id);
    });

    container.appendChild(item);
  });

  if (window.lucide) window.lucide.createIcons();
}

function deletePriorityTask(id) {
  if (!appState.pinnedPriorities) return;
  appState.pinnedPriorities = appState.pinnedPriorities.filter(t => t.id !== id);
  saveStateToLocalStorage();
  renderPriorityTasks();
}
