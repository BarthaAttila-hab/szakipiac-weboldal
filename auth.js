
const supabase = supabase.createClient(
  "https://tzmcofiuqeanftviquwp.supabase.co",
  "public-anon-key",
  {
    persistSession: true,
    autoRefreshToken: true
  }
);

const signUpForm = document.getElementById("signup-form");
const signInForm = document.getElementById("login-form");
const userInfo = document.getElementById("user-info");
const logoutButton = document.getElementById("logout-button");

// REGISZTRÁCIÓ
if (signUpForm) {
  signUpForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = document.getElementById("signup-email").value;
    const password = document.getElementById("signup-password").value;
    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error) {
      alert("Hiba a regisztrációnál: " + error.message);
    } else {
      alert("Sikeres regisztráció! Most már bejelentkezhetsz.");
      window.location.href = "auth.html";
    }
  });
}

// BEJELENTKEZÉS
if (signInForm) {
  signInForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = document.getElementById("login-email").value;
    const password = document.getElementById("login-password").value;
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      alert("Bejelentkezési hiba: " + error.message);
    } else {
      window.location.href = "feltoltes.html";
    }
  });
}

// KIJELENTKEZÉS
if (logoutButton) {
  logoutButton.addEventListener("click", async () => {
    await supabase.auth.signOut();
    window.location.href = "auth.html";
  });
}

// AUTOMATIKUS FELHASZNÁLÓ BETÖLTÉS
async function checkUser() {
  const { data, error } = await supabase.auth.getUser();
  if (data?.user) {
    if (userInfo) {
      userInfo.innerHTML = `<p>Bejelentkezve: <strong>${data.user.email}</strong></p>`;
    }
  }
}

checkUser();
