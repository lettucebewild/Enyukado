// ======================================================
// ENYUKADO FULL SCRIPT (FIXED)
// Intro always plays on refresh
// ======================================================


// ---------- INTRO SEQUENCE (login page only) ----------
window.addEventListener('load', () => {
  const overlay = document.querySelector('.intro-overlay');
  const brand = document.querySelector('.intro-brand');
  const tagline = document.querySelector('.intro-tagline');
  const pageWrapper = document.querySelector('.page-wrapper');

  if (!overlay || !brand) return;

  // Reset animation state every refresh
  overlay.style.display = 'flex';
  overlay.classList.remove('fade-out');
  pageWrapper?.classList.remove('slide-in');

  brand.classList.remove('brand-in', 'brand-out');
  tagline?.classList.remove('tagline-in', 'tagline-out');

  // ---------- INTRO ANIMATION ----------
  setTimeout(() => brand.classList.add('brand-in'), 500);

  setTimeout(() => {
    if (tagline) tagline.classList.add('tagline-in');
  }, 1600);

  setTimeout(() => {
    brand.classList.add('brand-out');
    if (tagline) tagline.classList.add('tagline-out');
  }, 3000);

  setTimeout(() => {
    overlay.classList.add('fade-out');
    pageWrapper?.classList.add('slide-in');
  }, 3500);

  setTimeout(() => {
    overlay.style.display = 'none';
  }, 5200);
});


// ---------- DOM READY ----------
document.addEventListener('DOMContentLoaded', () => {
  attachTogglePasswordEvents();
  attachLoginEvents();
  attachSignupEvents();
  attachAuthSwitch();
});


// ---------- PASSWORD TOGGLE ----------
function attachTogglePasswordEvents() {
  document.querySelectorAll('.toggle-pw').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();

      const targetId = btn.getAttribute('data-target');
      const input = document.getElementById(targetId);

      if (!input) return;

      const isHidden = input.type === 'password';
      input.type = isHidden ? 'text' : 'password';

      const svg = btn.querySelector('svg');
      if (!svg) return;

      svg.innerHTML = input.type === 'text'
        ? `<path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/><path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23"/>`
        : `<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>`;
    });
  });
}


// ---------- LOGIN ----------
function attachLoginEvents() {
  const loginBtn = document.getElementById('submitLoginBtn');
  if (!loginBtn) return;

  loginBtn.addEventListener('click', () => {
    const studentId = document.getElementById('loginStudentId')?.value.trim();
    const password = document.getElementById('loginPassword')?.value;

    if (!studentId) return showError('loginStudentId', 'Please enter your Student ID');
    if (studentId.length < 5) return showError('loginStudentId', 'Valid Student ID required');
    if (!password) return showError('loginPassword', 'Please enter your password');

    showToast('Logged in successfully! Welcome back.', 'success');

    setTimeout(() => {
      window.location.href = 'dashboard.html';
    }, 1200);
  });
}


// ---------- SIGNUP ----------
function attachSignupEvents() {
  const signupBtn = document.getElementById('submitSignupBtn');
  if (!signupBtn) return;

  signupBtn.addEventListener('click', () => {
    const firstName  = document.getElementById('signupFirst')?.value.trim();
    const lastName   = document.getElementById('signupLast')?.value.trim();
    const email      = document.getElementById('signupEmail')?.value.trim();
    const studentId  = document.getElementById('signupStudentId')?.value.trim();
    const password   = document.getElementById('signupPassword')?.value;
    const confirmPwd = document.getElementById('signupConfirm')?.value;

    if (!firstName) return showError('signupFirst', 'First name is required');
    if (!lastName) return showError('signupLast', 'Last name is required');
    if (!email || !email.includes('@')) return showError('signupEmail', 'Valid email required');
    if (!studentId) return showError('signupStudentId', 'Student ID required');
    if (!password || password.length < 6) return showError('signupPassword', 'Min 6 characters');
    if (password !== confirmPwd) return showError('signupConfirm', 'Passwords do not match');

    showToast(`Welcome ${firstName}! Account created successfully.`, 'success');

    setTimeout(() => {
      window.location.href = 'index.html';
    }, 1500);
  });
}


// ---------- LOGIN/SIGNUP SWITCH ----------
function attachAuthSwitch() {
  const loginCard = document.getElementById("loginCard");
  const signupCard = document.getElementById("signupCard");

  const showSignup = document.getElementById("showSignup");
  const showLogin = document.getElementById("showLogin");

  if (showSignup && loginCard && signupCard) {
    showSignup.addEventListener("click", (e) => {
      e.preventDefault();
      loginCard.classList.add("hidden-card");
      signupCard.classList.remove("hidden-card");
    });
  }

  if (showLogin && loginCard && signupCard) {
    showLogin.addEventListener("click", (e) => {
      e.preventDefault();
      signupCard.classList.add("hidden-card");
      loginCard.classList.remove("hidden-card");
    });
  }
}


// ---------- SHAKE ERROR ----------
function showError(fieldId, message) {
  showToast(message, 'error');

  const input = document.getElementById(fieldId);
  if (!input) return;

  input.style.borderColor = '#e0504a';
  input.style.animation = 'shake 0.4s ease';

  setTimeout(() => {
    input.style.borderColor = '';
    input.style.animation = '';
  }, 500);
}


// ---------- TOAST ----------
let toastTimeout;

function showToast(message, type = 'success') {
  const toast = document.getElementById('toast');
  const toastMsg = document.getElementById('toastMsg');

  if (!toast) return;

  toastMsg.textContent = message;

  const icon = toast.querySelector('svg');
  if (icon) {
    icon.style.color = type === 'error' ? '#e0504a' : '#5ddf7a';
  }

  toast.classList.add('show');

  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => toast.classList.remove('show'), 3000);
}