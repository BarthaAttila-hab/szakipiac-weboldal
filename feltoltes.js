// feltoltes.js

document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("feltoltesForm");
    form.addEventListener("submit", saveAd);

    async function saveAd(e) {
        e.preventDefault();

        const title = document.getElementById("title").value.trim();
        const description = document.getElementById("description").value.trim();
        const price = document.getElementById("price").value.trim();
        const csomag = document.querySelector('input[name="csomag"]:checked').value;

        // Csak azokat a képeket gyűjti be, amiket ténylegesen kiválasztottak
        const files = [];
        for (let i = 1; i <= 5; i++) {
            const fileInput = document.getElementById('file' + i);
            if (fileInput && fileInput.files.length > 0) {
                files.push(fileInput.files[0]);
            }
        }

        if (!title || !description || !price || !csomag) {
            alert("Minden mezőt tölts ki!");
            return;
        }

        // Itt kellene a képfeltöltés logika (Supabase Storage vagy más)
        // Ez csak minta üzenet, a valódi képfeltöltéshez később bővítsd!
        document.getElementById("result").innerText = 
            "A hirdetés adatai elküldve (DE a képfeltöltést még fejleszteni kell!)";

        // Itt lehet a Supabase adatmentés logika is, ha kell!
    }
});
