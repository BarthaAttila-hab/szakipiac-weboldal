// --- Supabase config ---
const SUPABASE_URL = 'https://cvcxdeunzlhcrayutuew.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'; // a saját kulcsod
const supabase = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

// --- Reklám megjelenítése minden oldalon ---
async function loadReklam() {
  const box = document.getElementById('reklam-box');
  if (!box) return;
  const { data, error } = await supabase.from('reklamok').select('*').order('id', {ascending:false}).limit(1);
  if (data && data.length && data[0].fizetve) {
    // Aktív reklám van
    box.innerHTML = `<a href="${data[0].url}" target="_blank">
      <img src="${data[0].kep_url}" alt="Reklám" style="max-width:100%; border-radius:10px;"></a>`;
  } else {
    // Nincs reklám: helyettesítő banner
    box.innerHTML = `
      <a href="reklam_feltoltes.html"><img src="reklam.png" alt="Szabad reklámhely" style="max-width:100%; border-radius:10px;"></a>
      <p style="text-align:center;">Szabad reklámhely!<br><a href="reklam_feltoltes.html">Itt hirdethet!</a></p>
    `;
  }
}
window.addEventListener('DOMContentLoaded', loadReklam);

// --- Reklám feltöltés + PayPal fizetés ---
if (location.pathname.endsWith('reklam_feltoltes.html')) {
  document.getElementById('payBtn').onclick = async function() {
    const kepInput = document.getElementById('reklam-kep');
    const linkInput = document.getElementById('reklam-link');
    const uzenet = document.getElementById('reklam-uzenet');
    uzenet.innerText = '';

    if (!kepInput.files.length || !linkInput.value) {
      uzenet.innerText = 'Tölts fel egy képet és add meg a linket!';
      return;
    }
    // 1. Kép feltöltése Supabase storage-ba
    const file = kepInput.files[0];
    const fname = `reklam_${Date.now()}_${file.name}`;
    let upload = await supabase.storage.from('reklamkepek').upload(fname, file);
    if (upload.error) {
      uzenet.innerText = 'Hiba a kép feltöltésekor!';
      return;
    }
    // 2. PayPal fizetés indítása (egyszerű formában)
    const paypalUrl = `https://www.paypal.com/cgi-bin/webscr?cmd=_xclick&business=bartha.attila76@gmail.com&item_name=SzakiPiac reklám&amount=1490&currency_code=HUF&return=https://szakipiac.hu/reklam_siker.html&cancel_return=https://szakipiac.hu/reklam_feltoltes.html`;
    window.open(paypalUrl, '_blank');

    // 3. Reklám elmentése "fizetve: false" állapottal, csak sikeres fizetésnél aktiválod adminban vagy kiegészítjük IPN-nel (PayPal API visszahívás kellene a véglegeshez)
    const publicUrl = supabase.storage.from('reklamkepek').getPublicUrl(fname).publicURL;
    await supabase.from('reklamok').insert([
      { kep_url: publicUrl, url: linkInput.value, fizetve: false }
    ]);
    uzenet.innerText = 'Sikeres feltöltés! Kérjük, fizesd ki PayPal-lal – sikeres fizetés után aktiváljuk a reklámot!';
  };
}
