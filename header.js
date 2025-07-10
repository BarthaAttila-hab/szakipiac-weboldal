document.body.insertAdjacentHTML("afterbegin", `
<header style="background: #2d8532; padding: 1rem; display: flex; align-items: center; color: white; justify-content: space-between;">
  <div style="display:flex;align-items:center;">
    <img src="logo.png" alt="SzakiPiac logó" style="height: 40px; margin-right: 1rem;">
    <nav>
      <a href="index.html" style="color:white; margin:0 1rem; font-weight:bold;">Főoldal</a>
      <a href="rolunk.html" style="color:white; margin:0 1rem; font-weight:bold;">Rólunk</a>
      <a href="kapcsolat.html" style="color:white; margin:0 1rem; font-weight:bold;">Kapcsolat</a>
      <a href="feltoltes.html" style="color:white; margin:0 1rem; font-weight:bold;">Hirdetés feltöltés</a>
      <a href="auth.html" style="color:white; margin:0 1rem; font-weight:bold;">Bejelentkezés</a>
    </nav>
  </div>
  <div class="reklam-sav" style="margin-left:2rem;">
    <a href="https://example.com" target="_blank">
      <img src="reklam1.png" alt="Reklám" style="max-height: 60px;">
    </a>
  </div>
</header>
`);

