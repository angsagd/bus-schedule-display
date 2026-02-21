const BUS_SCHEDULE_KEY = 'busSchedule';

const defaultKolom = {
  keberangkatan: { nomer: 0, seri: 1, plat: 0, mesin: 1, kota: 1, waktu: 1, status: 1 },
  kedatangan: { nomer: 0, seri: 1, plat: 0, mesin: 1, kota: 1, waktu: 1, status: 1 }
};

const defaultJadwal = {
  keberangkatan: [
    { nomer: "1", seri: "-", plat: "-", mesin: "-", kota: "-", waktu: "00:00", status: "" },
    { nomer: "2", seri: "-", plat: "-", mesin: "-", kota: "-", waktu: "00:00", status: "" },
    { nomer: "3", seri: "-", plat: "-", mesin: "-", kota: "-", waktu: "00:00", status: "" },
    { nomer: "4", seri: "-", plat: "-", mesin: "-", kota: "-", waktu: "00:00", status: "" },
    { nomer: "5", seri: "-", plat: "-", mesin: "-", kota: "-", waktu: "00:00", status: "" },
    { nomer: "6", seri: "-", plat: "-", mesin: "-", kota: "-", waktu: "00:00", status: "" }
  ],
  kedatangan: [
    { nomer: "1", seri: "-", plat: "-", mesin: "-", kota: "-", waktu: "00:00", status: "" },
    { nomer: "2", seri: "-", plat: "-", mesin: "-", kota: "-", waktu: "00:00", status: "" },
    { nomer: "3", seri: "-", plat: "-", mesin: "-", kota: "-", waktu: "00:00", status: "" },
    { nomer: "4", seri: "-", plat: "-", mesin: "-", kota: "-", waktu: "00:00", status: "" },
    { nomer: "5", seri: "-", plat: "-", mesin: "-", kota: "-", waktu: "00:00", status: "" },
    { nomer: "6", seri: "-", plat: "-", mesin: "-", kota: "-", waktu: "00:00", status: "" }
  ]
};

const defaultSetting = { theme: "Classic", speed: 60 };

let dataKolom = JSON.parse(JSON.stringify(defaultKolom));
let dataJadwal = JSON.parse(JSON.stringify(defaultJadwal));
let dataSetting = JSON.parse(JSON.stringify(defaultSetting));
let dataRunningText = "Informasi untuk seluruh penumpang: Mohon memperhatikan jadwal keberangkatan dan kedatangan bus yang tampil pada monitor. Segera menuju area keberangkatan bila status bus menunjukkan ‘Segera Berangkat’ dan tetap menunggu apabila masih ‘Sesuai Jadwal’. Untuk keterlambatan atau perubahan perjalanan, silakan hubungi petugas. Terima kasih atas perhatian Anda.";

function deepClone(obj) {
  return JSON.parse(JSON.stringify(obj));
}

function normalizeBusSchedule(raw) {
  const normalized = {
    setting: deepClone(defaultSetting),
    kolom: deepClone(defaultKolom),
    keberangkatan: deepClone(defaultJadwal.keberangkatan),
    kedatangan: deepClone(defaultJadwal.kedatangan),
    runningText: dataRunningText
  };

  if (!raw || typeof raw !== 'object') {
    return normalized;
  }

  if (raw.setting && typeof raw.setting === 'object' && !Array.isArray(raw.setting)) {
    if (typeof raw.setting.theme === 'string' && raw.setting.theme.trim()) {
      normalized.setting = Object.assign({}, normalized.setting, { theme: raw.setting.theme.trim() });
    }
    if (typeof raw.setting.speed === 'number' && Number.isFinite(raw.setting.speed) && raw.setting.speed > 0) {
      normalized.setting.speed = raw.setting.speed;
    }
  } else if (Array.isArray(raw.setting) && raw.setting.length > 0) {
    const first = raw.setting[0];
    if (first && typeof first.theme === 'string' && first.theme.trim()) {
      normalized.setting = Object.assign({}, normalized.setting, { theme: first.theme.trim() });
    }
    if (first && typeof first.speed === 'number' && Number.isFinite(first.speed) && first.speed > 0) {
      normalized.setting.speed = first.speed;
    }
  }

  if (raw.kolom && typeof raw.kolom === 'object') {
    normalized.kolom.keberangkatan = Object.assign(
      {},
      defaultKolom.keberangkatan,
      raw.kolom.keberangkatan || {}
    );
    normalized.kolom.kedatangan = Object.assign(
      {},
      defaultKolom.kedatangan,
      raw.kolom.kedatangan || {}
    );
  }

  if (Array.isArray(raw.keberangkatan) && raw.keberangkatan.length > 0) {
    normalized.keberangkatan = raw.keberangkatan;
  }

  if (Array.isArray(raw.kedatangan) && raw.kedatangan.length > 0) {
    normalized.kedatangan = raw.kedatangan;
  }

  if (typeof raw.runningText === 'string') {
    normalized.runningText = raw.runningText;
  } else if (raw.runningText && typeof raw.runningText === 'object') {
    const text = raw.runningText.text;
    if (typeof text === 'string') {
      normalized.runningText = text;
    }
  }

  return normalized;
}

function buildBusSchedulePayload() {
  return {
    setting: deepClone(dataSetting),
    kolom: deepClone(dataKolom),
    keberangkatan: deepClone(dataJadwal.keberangkatan),
    kedatangan: deepClone(dataJadwal.kedatangan),
    runningText: dataRunningText
  };
}

function saveBusSchedule() {
  localStorage.setItem(BUS_SCHEDULE_KEY, JSON.stringify(buildBusSchedulePayload()));
}

if (typeof Storage === "undefined") {
  alert("Browser tidak mendukung Local Storage");
} else {
  let parsedBusSchedule = null;
  const rawBusSchedule = localStorage.getItem(BUS_SCHEDULE_KEY);

  if (rawBusSchedule) {
    try {
      parsedBusSchedule = JSON.parse(rawBusSchedule);
    } catch (e) {
      console.error("Data localStorage 'busSchedule' tidak valid:", e);
    }
  }

  if (!parsedBusSchedule) {
    const migrated = {
      setting: deepClone(defaultSetting),
      kolom: deepClone(defaultKolom),
      keberangkatan: deepClone(defaultJadwal.keberangkatan),
      kedatangan: deepClone(defaultJadwal.kedatangan),
      runningText: dataRunningText
    };

    const rawKolom = localStorage.getItem('kolom');
    if (rawKolom) {
      try {
        const oldKolom = JSON.parse(rawKolom);
        migrated.kolom.keberangkatan = Object.assign(
          {},
          defaultKolom.keberangkatan,
          oldKolom.keberangkatan || {}
        );
        migrated.kolom.kedatangan = Object.assign(
          {},
          defaultKolom.kedatangan,
          oldKolom.kedatangan || {}
        );
      } catch (e) {
        console.error("Data localStorage 'kolom' tidak valid:", e);
      }
    }

    const rawJadwal = localStorage.getItem('jadwal');
    if (rawJadwal) {
      try {
        const oldJadwal = JSON.parse(rawJadwal);
        if (Array.isArray(oldJadwal.keberangkatan) && oldJadwal.keberangkatan.length > 0) {
          migrated.keberangkatan = oldJadwal.keberangkatan;
        }
        if (Array.isArray(oldJadwal.kedatangan) && oldJadwal.kedatangan.length > 0) {
          migrated.kedatangan = oldJadwal.kedatangan;
        }
      } catch (e) {
        console.error("Data localStorage 'jadwal' tidak valid:", e);
      }
    }

    parsedBusSchedule = migrated;
    localStorage.removeItem('kolom');
    localStorage.removeItem('jadwal');
  }

  const normalizedBusSchedule = normalizeBusSchedule(parsedBusSchedule);
  dataSetting = deepClone(normalizedBusSchedule.setting);
  dataKolom = deepClone(normalizedBusSchedule.kolom);
  dataJadwal = {
    keberangkatan: deepClone(normalizedBusSchedule.keberangkatan),
    kedatangan: deepClone(normalizedBusSchedule.kedatangan)
  };
  if (typeof normalizedBusSchedule.runningText === 'string') {
    dataRunningText = normalizedBusSchedule.runningText;
  }
  saveBusSchedule();
}
