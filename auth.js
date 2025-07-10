let mode = "login"; // vagy "register" vagy "reset"

const form = document.getElementById("auth-form");
const title = document.getElementById("auth-title");
const btn = document.getElementById("auth-btn");
const switchLink = document.getElementById("switch-link");
const forgotPwLink = document.getElementById("forgot-pw-link");
const message = document.getElementById("auth-message");
const emailInput = document.getElementById("email-input");
const passwordInput = document.getElementById("password-input");

function setMode(newMode) {
  mode = newMode;
  message.textContent = "";
  if (mode === "login") {
    title.textContent = "Bejelentkezés";
    btn.textContent = "Bejelentkezés";
    switchLink.textContent = "Nincs fiókod? Regisztrálj!";
    forgotPwLink.style.display = "inline";
    passwordInput.style.display = "inline";
    passwordInput.placeholder = "Jelszó";
  } else if (mode === "register") {
    title.textContent = "Regisztráció";
    btn.textContent = "Regisztráció";
    switchLink.textContent = "Van már fiókod? Bejelentkezés!";
    forgotPwLink.style.display = "none";
    passwordInput.style.display = "inline";
    passwordInput.placeholder = "Jelszó (minimum 6 karakter)";
  } else if (mode === "reset") {
    title.textContent = "Jelszó visszaállítás";
    btn.textContent = "Visszaállító email küldése";
    switchLink.textContent = "Vissza a bejelentkezéshez";
    forgotPwLink.style.display = "none";
    passwordInput.style.display = "none";
  }
  passwordInput.value = "";
}

setMode("login");

switchLink.addEventListener("click", (e) => {
  e.preventDefault();
  if (mode === "login") setMode("register");
  else if (mode === "register") setMode("login");
  else if (mode === "reset") setMode("login");
});

forgotPwLink.addEventListener("click", (e) => {
  e.preventDefault();
  setMode("reset");
});

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  message.textContent = "";
  const email = emailInput.value.trim();
  const password = passwordInput.value;

  if (mode === "login") {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      message.textContent = "Hiba: " + (error.message || "Hibás email vagy jelszó.");
    } else {
      message.style.color = "green";
      message.textContent = "Sikeres bejelentkezés! Átirányítás...";
      setTimeout(() => { window.location.href = "index.html"; }, 800);
    }
  } else if (mode === "register") {
    if (password.length < 6) {
      message.textContent = "A jelszónak legalább 6 karakteresnek kell lennie.";
      return;
    }
    const { error } = await supabase.auth.signUp({ email, password });
    if (error) {
      message.textContent = "Hiba: " + (error.message || "Nem sikerült regisztrálni.");
    } else {
      message.style.color = "green";
      message.textContent = "Sikeres regisztráció! Nézd meg az email fiókodat a megerősítő levélért.";
      setMode("login");
    }
  } else if (mode === "reset") {
    const { error } = await supabase.auth.resetPasswordForEmail(email);
    if (error) {
      message.textContent = "Hiba: " + (error.message || "Nem sikerült elküldeni a jelszó-visszaállító emailt.");
    } else {
      message.style.color = "green";
      message.textContent = "Visszaállító email elküldve! Nézd meg a postafiókodat.";
      setTimeout(() => setMode("login"), 3000);
    }
  }
});
