let dataKolom = {"keberangkatan":{"nomer":0,"seri":1,"plat":0,"mesin":1,"kota":1,"waktu":1,"status":1},"kedatangan":{"nomer":0,"seri":1,"plat":0,"mesin":1,"kota":1,"waktu":1,"status":1}}
let dataJadwal = {
  'keberangkatan': [
    {"nomer":"1","seri":"","plat":"","mesin":"","kota":"","waktu":"00:00","status":"Pilih Status"},
    {"nomer":"2","seri":"","plat":"","mesin":"","kota":"","waktu":"00:00","status":"Pilih Status"},
    {"nomer":"3","seri":"","plat":"","mesin":"","kota":"","waktu":"00:00","status":"Pilih Status"},
    {"nomer":"4","seri":"","plat":"","mesin":"","kota":"","waktu":"00:00","status":"Pilih Status"},
    {"nomer":"5","seri":"","plat":"","mesin":"","kota":"","waktu":"00:00","status":"Pilih Status"},
    {"nomer":"6","seri":"","plat":"","mesin":"","kota":"","waktu":"00:00","status":"Pilih Status"}
  ],
  'kedatangan': [
    {"nomer":"1","seri":"","plat":"","mesin":"","kota":"","waktu":"00:00","status":"Pilih Status"},
    {"nomer":"2","seri":"","plat":"","mesin":"","kota":"","waktu":"00:00","status":"Pilih Status"},
    {"nomer":"3","seri":"","plat":"","mesin":"","kota":"","waktu":"00:00","status":"Pilih Status"},
    {"nomer":"4","seri":"","plat":"","mesin":"","kota":"","waktu":"00:00","status":"Pilih Status"},
    {"nomer":"5","seri":"","plat":"","mesin":"","kota":"","waktu":"00:00","status":"Pilih Status"},
    {"nomer":"6","seri":"","plat":"","mesin":"","kota":"","waktu":"00:00","status":"Pilih Status"}
  ]
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