const loginForm = document.getElementById("login-form");
const signupForm = document.getElementById("signup-form");
const statusDiv = document.getElementById("status");
const switchForm = document.getElementById("switch-form");
const formTitle = document.getElementById("form-title");

let isLogin = true;

switchForm.addEventListener("click", () => {
  isLogin = !isLogin;
  loginForm.style.display = isLogin ? "block" : "none";
  signupForm.style.display = isLogin ? "none" : "block";
  formTitle.textContent = isLogin ? "Bejelentkezés" : "Regisztráció";
  switchForm.textContent = isLogin ? "Nincs fiókod? Regisztrálj!" : "Már van fiókod? Jelentkezz be!";
  statusDiv.textContent = "";
});

loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  statusDiv.textContent = "Bejelentkezés folyamatban...";
  const email = document.getElementById("login-email").value;
  const password = document.getElementById("login-password").value;
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) {
    statusDiv.textContent = "Hiba: " + error.message;
  } else {
    window.location.href = "feltoltes.html";
  }
});

signupForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  statusDiv.textContent = "Regisztráció folyamatban...";
  const email = document.getElementById("signup-email").value;
  const password = document.getElementById("signup-password").value;
  const { error } = await supabase.auth.signUp({ email, password });
  if (error) {
    statusDiv.textContent = "Hiba: " + error.message;
  } else {
    statusDiv.textContent = "Sikeres regisztráció! Most már bejelentkezhetsz.";
    setTimeout(() => {
      isLogin = true;
      loginForm.style.display = "block";
      signupForm.style.display = "none";
      formTitle.textContent = "Bejelentkezés";
      switchForm.textContent = "Nincs fiókod? Regisztrálj!";
      statusDiv.textContent = "";
    }, 1800);
  }
});
