// ---------- INTRO SEQUENCE (login page only) ----------
window.addEventListener('load', () => {
  const overlay = document.querySelector('.intro-overlay');
  const brand = document.querySelector('.intro-brand');
  const tagline = document.querySelector('.intro-tagline');
  const pageWrapper = document.querySelector('.page-wrapper');

  // Only run intro if overlay and brand elements exist (login page)
  if (!overlay || !brand) return;

  // If the user is returning from another page (e.g. terms/privacy), skip intro
  if (sessionStorage.getItem('enyukado_intro_done') === '1') {
    overlay.style.display = 'none';
    if (pageWrapper) {
      pageWrapper.style.transition = 'none';
      pageWrapper.classList.add('slide-in');
    }
    return;
  }

  setTimeout(() => brand.classList.add('brand-in'), 500);
  setTimeout(() => tagline && tagline.classList.add('tagline-in'), 1600);
  setTimeout(() => {
    brand.classList.add('brand-out');
    tagline && tagline.classList.add('tagline-out');
  }, 3000);
  setTimeout(() => {
    overlay.classList.add('fade-out');
    pageWrapper && pageWrapper.classList.add('slide-in');
  }, 3500);
  setTimeout(() => {
    overlay.style.display = 'none';
    // Mark intro as done for this session so it won't replay on back-navigation
    sessionStorage.setItem('enyukado_intro_done', '1');
  }, 5200);
});

// ---------- ATTACH EVENTS on DOM ready ----------
document.addEventListener('DOMContentLoaded', () => {
  attachTogglePasswordEvents();
  attachLoginEvents();
  attachSignupEvents();
});

// ---------- Toggle password visibility ----------
function attachTogglePasswordEvents() {
  document.querySelectorAll('.toggle-pw').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = btn.getAttribute('data-target');
      const input = document.getElementById(targetId);
      if (input) {
        const isHidden = input.type === 'password';
        input.type = isHidden ? 'text' : 'password';
        const svg = btn.querySelector('svg');
        if (svg) {
          if (input.type === 'text') {
            svg.innerHTML = `<path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/><path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23"/>`;
          } else {
            svg.innerHTML = `<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>`;
          }
        }
      }
    });
  });
}

const loginCard = document.getElementById("loginCard");
const signupCard = document.getElementById("signupCard");

const showSignup = document.getElementById("showSignup");
const showLogin = document.getElementById("showLogin");

showSignup.addEventListener("click", (e) => {
  e.preventDefault();

  loginCard.classList.add("hidden-card");
  signupCard.classList.remove("hidden-card");
});

showLogin.addEventListener("click", (e) => {
  e.preventDefault();

  signupCard.classList.add("hidden-card");
  loginCard.classList.remove("hidden-card");
});

// ---------- LOGIN submit handler ----------
function attachLoginEvents() {
  const loginBtn = document.getElementById('submitLoginBtn');
  if (!loginBtn) return;

  loginBtn.addEventListener('click', () => {
    const studentId = document.getElementById('loginStudentId')?.value.trim();
    const password = document.getElementById('loginPassword')?.value;

    if (!studentId) {
      showToast('Please enter your Student ID', 'error');
      shakeField('loginStudentId');
      return;
    }
    if (studentId.length < 5) {
      showToast('Valid Student ID required', 'error');
      shakeField('loginStudentId');
      return;
    }
    if (!password) {
      showToast('Please enter your password', 'error');
      shakeField('loginPassword');
      return;
    }
    showToast('Logged in successfully! Welcome back.', 'success');
    setTimeout(() => {
      window.location.href = 'dashboard.html';
    }, 1200);
  });
}

// ---------- SIGNUP submit handler ----------
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

    if (!firstName)  { showToast('First name is required', 'error');            shakeField('signupFirst');     return; }
    if (!lastName)   { showToast('Last name is required', 'error');             shakeField('signupLast');      return; }
    if (!email || !email.includes('@')) { showToast('Valid university email required', 'error'); shakeField('signupEmail'); return; }
    if (!studentId)  { showToast('Student ID number is required', 'error');     shakeField('signupStudentId'); return; }
    if (!password || password.length < 6) { showToast('Password must be at least 6 characters', 'error'); shakeField('signupPassword'); return; }
    if (password !== confirmPwd) { showToast('Passwords do not match', 'error'); shakeField('signupConfirm'); return; }

    showToast(`Welcome ${firstName}! Account created successfully.`, 'success');
    setTimeout(() => {
      window.location.href = 'index.html';
    }, 1500);
  });
}

function shakeField(fieldId) {
  const input = document.getElementById(fieldId);
  if (input) {
    input.style.borderColor = '#e0504a';
    input.style.animation = 'shake 0.4s ease';
    setTimeout(() => {
      input.style.borderColor = '';
      input.style.animation = '';
    }, 500);
  }
}

// ---------- Toast notification ----------
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