let dataKolom = {"keberangkatan":{"nomer":0,"seri":1,"plat":0,"mesin":1,"tujuan":1,"waktu":1,"status":1},"kedatangan":{"nomer":0,"seri":1,"plat":0,"mesin":1,"tujuan":1,"waktu":1,"status":1}}
let dataJadwal = {
  'keberangkatan': [],
  'kedatangan': []
}

if (typeof(Storage) === "undefined") {
    alert("Browser tidak mendukung Local Storage");
} else {
  if (localStorage.getItem('kolom')) {
    try {
      const stored = JSON.parse(localStorage.getItem('kolom'));
      dataKolom = stored;  
    } catch (e) {
      console.error("Data localStorage 'kolom' tidak valid:", e);
    }
  } else {
    localStorage.setItem('kolom', JSON.stringify(dataKolom));
  }

}