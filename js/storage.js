let dataKolom = {
  "keberangkatan":{"nomer":0,"seri":1,"plat":0,"mesin":1,"kota":1,"waktu":1,"status":1},
  "kedatangan":{"nomer":0,"seri":1,"plat":0,"mesin":1,"kota":1,"waktu":1,"status":1}
};
// let dataJadwal = {
//   'keberangkatan': [
//     {"nomer":"1","seri":"","plat":"","mesin":"","kota":"","waktu":"00:00","status":"Pilih Status"},
//     {"nomer":"2","seri":"","plat":"","mesin":"","kota":"","waktu":"00:00","status":"Pilih Status"},
//     {"nomer":"3","seri":"","plat":"","mesin":"","kota":"","waktu":"00:00","status":"Pilih Status"},
//     {"nomer":"4","seri":"","plat":"","mesin":"","kota":"","waktu":"00:00","status":"Pilih Status"},
//     {"nomer":"5","seri":"","plat":"","mesin":"","kota":"","waktu":"00:00","status":"Pilih Status"},
//     {"nomer":"6","seri":"","plat":"","mesin":"","kota":"","waktu":"00:00","status":"Pilih Status"}
//   ],
//   'kedatangan': [
//     {"nomer":"1","seri":"","plat":"","mesin":"","kota":"","waktu":"00:00","status":"Pilih Status"},
//     {"nomer":"2","seri":"","plat":"","mesin":"","kota":"","waktu":"00:00","status":"Pilih Status"},
//     {"nomer":"3","seri":"","plat":"","mesin":"","kota":"","waktu":"00:00","status":"Pilih Status"},
//     {"nomer":"4","seri":"","plat":"","mesin":"","kota":"","waktu":"00:00","status":"Pilih Status"},
//     {"nomer":"5","seri":"","plat":"","mesin":"","kota":"","waktu":"00:00","status":"Pilih Status"},
//     {"nomer":"6","seri":"","plat":"","mesin":"","kota":"","waktu":"00:00","status":"Pilih Status"}
//   ]
// };

let dataJadwal = {
  'keberangkatan': [
    {
      "nomer": "1",
      "seri": "B-01",
      "plat": "B 1234 AB",
      "mesin": "Hino Turbo",
      "kota": "Jakarta",
      "waktu": "05:30",
      "status": "Sudah Berangkat"
    },
    {
      "nomer": "2",
      "seri": "B-02",
      "plat": "D 5678 CD",
      "mesin": "Isuzu Elf",
      "kota": "Bandung",
      "waktu": "06:00",
      "status": "Sesuai Jadwal"
    },
    {
      "nomer": "3",
      "seri": "B-03",
      "plat": "L 9087 EF",
      "mesin": "Mitsubishi Fuso",
      "kota": "Surabaya",
      "waktu": "06:45",
      "status": "Segera Berangkat"
    },
    {
      "nomer": "4",
      "seri": "B-04",
      "plat": "H 4455 GH",
      "mesin": "Hino RG",
      "kota": "Semarang",
      "waktu": "07:15",
      "status": "Diundur"
    },
    {
      "nomer": "5",
      "seri": "B-05",
      "plat": "AB 7788 IJ",
      "mesin": "Mercedes OH 1521",
      "kota": "Yogyakarta",
      "waktu": "08:00",
      "status": "Sesuai Jadwal"
    },
    {
      "nomer": "6",
      "seri": "B-06",
      "plat": "N 9911 KL",
      "mesin": "Isuzu Giga",
      "kota": "Malang",
      "waktu": "09:30",
      "status": "Dibatalkan"
    }
  ],

  'kedatangan': [
    {
      "nomer": "1",
      "seri": "A-01",
      "plat": "E 1122 MN",
      "mesin": "Hino Turbo",
      "kota": "Cirebon",
      "waktu": "05:25",
      "status": "Sudah Tiba"
    },
    {
      "nomer": "2",
      "seri": "A-02",
      "plat": "S 3344 OP",
      "mesin": "Isuzu Elf",
      "kota": "Surakarta",
      "waktu": "06:10",
      "status": "Sesuai Jadwal"
    },
    {
      "nomer": "3",
      "seri": "A-03",
      "plat": "K 5566 QR",
      "mesin": "Mercedes OH 1521",
      "kota": "Kudus",
      "waktu": "06:50",
      "status": "Segera Tiba"
    },
    {
      "nomer": "4",
      "seri": "A-04",
      "plat": "F 7788 ST",
      "mesin": "Mitsubishi Fuso",
      "kota": "Bogor",
      "waktu": "07:40",
      "status": "Diundur"
    },
    {
      "nomer": "5",
      "seri": "A-05",
      "plat": "G 9900 UV",
      "mesin": "Isuzu Giga",
      "kota": "Tegal",
      "waktu": "08:20",
      "status": "Sudah Tiba"
    },
    {
      "nomer": "6",
      "seri": "A-06",
      "plat": "L 2211 WX",
      "mesin": "Hino RG",
      "kota": "Madiun",
      "waktu": "09:15",
      "status": "Dibatalkan"
    }
  ]
};


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

}