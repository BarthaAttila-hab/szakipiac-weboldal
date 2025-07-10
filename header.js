// header.js
document.body.insertAdjacentHTML("afterbegin", `
  <header style="background: #2d8532; padding: 1rem; display: flex; align-items: center; color: white; justify-content: space-between; position: relative;">
    <div style="display:flex;align-items:center;">
      <img src="logo.png" alt="SzakiPiac logó" style="height: 40px; margin-right: 1rem;">
      <nav>
        <a href="index.html" style="color:white;margin:0 1rem;text-decoration:none;font-weight:bold;">Főoldal</a>
        <a href="rolunk.html" style="color:white;margin:0 1rem;text-decoration:none;font-weight:bold;">Rólunk</a>
        <a href="kapcsolat.html" style="color:white;margin:0 1rem;text-decoration:none;font-weight:bold;">Kapcsolat</a>
        <a href="feltoltes.html" style="color:white;margin:0 1rem;text-decoration:none;font-weight:bold;">Hirdetés feltöltés</a>
        <a href="auth.html" style="color:white;margin:0 1rem;text-decoration:none;font-weight:bold;">Bejelentkezés</a>
      </nav>
    </div>
  </header>
  <aside id="reklam-jobb" style="position:fixed;top:110px;right:20px;z-index:1001;max-width:160px;display:flex;flex-direction:column;align-items:center;">
    <img src="reklam1.png" alt="HIRDESS ITT!" style="width:150px;max-width:100%;margin-bottom:8px;border-radius:18px;box-shadow:0 2px 12px #0003;">
    <div style="background:#2d8532;color:#fff;font-weight:bold;padding:10px 16px;border-radius:16px;text-align:center;box-shadow:0 2px 8px #0002;letter-spacing:1px;">
      HIRDESS<br>ITT!
    </div>
  </aside>
  <style>
    @media (max-width: 700px) {
      #reklam-jobb { position:static; max-width:100%; flex-direction:row; margin-top:10px; justify-content:center; }
      #reklam-jobb img { width:80px; }
      #reklam-jobb div { font-size:0.85em; padding:8px 10px; }
    }
  </style>
`);

