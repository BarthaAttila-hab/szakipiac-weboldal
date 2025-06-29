async function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  document.getElementById("message").textContent = error ? error.message : "Sikeres bejelentkezés!";
}

async function signup() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const { error } = await supabase.auth.signUp({ email, password });
  document.getElementById("message").textContent = error ? error.message : "Sikeres regisztráció!";
}