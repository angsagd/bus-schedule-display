let dataKolom = {
  "keberangkatan":{"nomer":0,"seri":1,"plat":0,"mesin":1,"kota":1,"waktu":1,"status":1},
  "kedatangan":{"nomer":0,"seri":1,"plat":0,"mesin":1,"kota":1,"waktu":1,"status":1}
};
let dataJadwal = {
  'keberangkatan': [
    {"nomer":"1","seri":"-","plat":"-","mesin":"-","kota":"-","waktu":"00:00","status":""},
    {"nomer":"2","seri":"-","plat":"-","mesin":"-","kota":"-","waktu":"00:00","status":""},
    {"nomer":"3","seri":"-","plat":"-","mesin":"-","kota":"-","waktu":"00:00","status":""},
    {"nomer":"4","seri":"-","plat":"-","mesin":"-","kota":"-","waktu":"00:00","status":""},
    {"nomer":"5","seri":"-","plat":"-","mesin":"-","kota":"-","waktu":"00:00","status":""},
    {"nomer":"6","seri":"-","plat":"-","mesin":"-","kota":"-","waktu":"00:00","status":""}
  ],
  'kedatangan': [
    {"nomer":"1","seri":"-","plat":"-","mesin":"-","kota":"-","waktu":"00:00","status":""},
    {"nomer":"2","seri":"-","plat":"-","mesin":"-","kota":"-","waktu":"00:00","status":""},
    {"nomer":"3","seri":"-","plat":"-","mesin":"-","kota":"-","waktu":"00:00","status":""},
    {"nomer":"4","seri":"-","plat":"-","mesin":"-","kota":"-","waktu":"00:00","status":""},
    {"nomer":"5","seri":"-","plat":"-","mesin":"-","kota":"-","waktu":"00:00","status":""},
    {"nomer":"6","seri":"-","plat":"-","mesin":"-","kota":"-","waktu":"00:00","status":""}
  ]
};
let dataRunningText = "Informasi untuk seluruh penumpang: Mohon memperhatikan jadwal keberangkatan dan kedatangan bus yang tampil pada monitor. Segera menuju area keberangkatan bila status bus menunjukkan ‘Segera Berangkat’ dan tetap menunggu apabila masih ‘Sesuai Jadwal’. Untuk keterlambatan atau perubahan perjalanan, silakan hubungi petugas. Terima kasih atas perhatian Anda.";

if (typeof(Storage) === "undefined") {
    alert("Browser tidak mendukung Local Storage");
} else {

  // get/set data kolom ke/dari localStorage
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

  // get/set data jadwal ke/dari localStorage
  if (localStorage.getItem('jadwal')) {
    try {
      const stored = JSON.parse(localStorage.getItem('jadwal'));
      dataJadwal = stored;  
    } catch (e) {
      console.error("Data localStorage 'jadwal' tidak valid:", e);
    }
  } else {
    localStorage.setItem('jadwal', JSON.stringify(dataJadwal));
  }

  // get/set data running text ke/dari localStorage
  if (localStorage.getItem('runningText')) {
    try {
      const stored = localStorage.getItem('runningText');
      dataRunningText = stored;  
    } catch (e) {
      console.error("Data localStorage 'runningText' tidak valid:", e);
    }
  } else {
    localStorage.setItem('runningText', dataRunningText);
  }

}