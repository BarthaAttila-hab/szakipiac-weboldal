// auth.js
const loginForm = document.getElementById('login-form');
const registerForm = document.getElementById('register-form');
const forgotForm = document.getElementById('forgot-form');
const toggle = document.getElementById('toggle-auth');
const title = document.getElementById('auth-title');
const error = document.getElementById('auth-error');
const forgotLink = document.getElementById('forgot-link');
const backToLogin = document.getElementById('back-to-login');

// Váltás regisztráció <-> bejelentkezés
toggle.onclick = (e) => {
  e.preventDefault();
  loginForm.style.display = loginForm.style.display === 'none' ? '' : 'none';
  registerForm.style.display = registerForm.style.display === 'none' ? '' : 'none';
  forgotForm.style.display = 'none';
  title.innerText = loginForm.style.display === 'none' ? 'Regisztráció' : 'Bejelentkezés';
  toggle.innerText = loginForm.style.display === 'none' ? 'Van már fiókod? Bejelentkezés!' : 'Nincs fiókod? Regisztrálj!';
  error.textContent = '';
};

// Elfelejtett jelszó link
forgotLink.onclick = (e) => {
  e.preventDefault();
  loginForm.style.display = 'none';
  registerForm.style.display = 'none';
  forgotForm.style.display = '';
  title.innerText = 'Elfelejtett jelszó';
  toggle.style.display = 'none';
  error.textContent = '';
};
if (backToLogin) {
  backToLogin.onclick = (e) => {
    e.preventDefault();
    loginForm.style.display = '';
    registerForm.style.display = 'none';
    forgotForm.style.display = 'none';
    title.innerText = 'Bejelentkezés';
    toggle.style.display = '';
    error.textContent = '';
  };
}

// Bejelentkezés
loginForm.onsubmit = async (e) => {
  e.preventDefault();
  error.textContent = 'Bejelentkezés folyamatban...';
  const { error: err } = await supabase.auth.signInWithPassword({
    email: loginForm['login-email'].value,
    password: loginForm['login-password'].value,
  });
  if (err) {
    if (err.message.includes('Invalid login credentials')) {
      error.textContent = 'Hibás e-mail vagy jelszó!';
    } else {
      error.textContent = 'Hiba: ' + err.message;
    }
  } else {
    error.textContent = 'Sikeres bejelentkezés!';
    setTimeout(() => location.href = "feltoltes.html", 1000);
  }
};

// Regisztráció
registerForm.onsubmit = async (e) => {
  e.preventDefault();
  error.textContent = 'Regisztráció folyamatban...';
  const { error: err } = await supabase.auth.signUp({
    email: registerForm['register-email'].value,
    password: registerForm['register-password'].value,
  });
  if (err) {
    if (err.message.includes('User already registered')) {
      error.textContent = 'Ez az e-mail cím már regisztrált!';
    } else if (err.message.includes('password')) {
      error.textContent = 'Túl egyszerű vagy rövid jelszó!';
    } else {
      error.textContent = 'Hiba: ' + err.message;
    }
  } else {
    error.textContent = 'Sikeres regisztráció! Ellenőrizd az e-mail fiókod!';
    setTimeout(() => toggle.click(), 2000);
  }
};

// Elfelejtett jelszó
forgotForm.onsubmit = async (e) => {
  e.preventDefault();
  error.textContent = 'Jelszó helyreállítás folyamatban...';
  const email = forgotForm['forgot-email'].value;
  const { error: err } = await supabase.auth.resetPasswordForEmail(email, { redirectTo: window.location.origin + '/auth.html' });
  if (err) {
    error.textContent = 'Hiba: ' + err.message;
  } else {
    error.textContent = 'Ha létezik ilyen e-mail cím, elküldtük a helyreállító levelet!';
    setTimeout(() => {
      loginForm.style.display = '';
      forgotForm.style.display = 'none';
      toggle.style.display = '';
      title.innerText = 'Bejelentkezés';
      error.textContent = '';
    }, 2500);
  }
};

