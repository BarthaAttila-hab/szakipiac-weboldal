const loginForm = document.getElementById('login-form');
const registerForm = document.getElementById('register-form');
const toggle = document.getElementById('toggle-auth');
const title = document.getElementById('auth-title');
const error = document.getElementById('auth-error');

toggle.onclick = (e) => {
  e.preventDefault();
  if (registerForm.style.display === 'none') {
    registerForm.style.display = '';
    loginForm.style.display = 'none';
    title.innerText = 'Regisztráció';
    toggle.innerText = 'Van már fiókod? Bejelentkezés!';
  } else {
    registerForm.style.display = 'none';
    loginForm.style.display = '';
    title.innerText = 'Bejelentkezés';
    toggle.innerText = 'Nincs fiókod? Regisztrálj!';
  }
  error.textContent = '';
};

loginForm.onsubmit = async (e) => {
  e.preventDefault();
  error.textContent = 'Bejelentkezés folyamatban...';
  const { error: err } = await supabase.auth.signInWithPassword({
    email: loginForm['login-email'].value,
    password: loginForm['login-password'].value,
  });
  error.textContent = err ? err.message : 'Sikeres bejelentkezés!';
  if (!err) location.href = "feltoltes.html";
};

registerForm.onsubmit = async (e) => {
  e.preventDefault();
  error.textContent = 'Regisztráció folyamatban...';
  const { error: err } = await supabase.auth.signUp({
    email: registerForm['register-email'].value,
    password: registerForm['register-password'].value,
  });
  error.textContent = err ? err.message : 'Sikeres regisztráció! Ellenőrizd az e-mail fiókod!';
  if (!err) setTimeout(() => toggle.click(), 1500);
};

