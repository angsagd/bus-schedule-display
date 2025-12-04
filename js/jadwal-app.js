$(function() {
  let lastRunningText = null;

  TanggalWaktu.init({
    tanggalSelector: '#teks-tanggal',
    waktuSelector: '#teks-waktu',
    locale: 'id-ID',
    enableTanggal: true,
    enableWaktu: true
  });

  refreshJadwalFromStorage();
  applyKolomVisibility(dataKolom);
  // Inisialisasi pertama kali saat halaman siap

  lastRunningText = localStorage.getItem('runningText') || '';
  $('#running-text').text(lastRunningText);

  setInterval(function () {
    const cfg = loadKolomFromStorage();
    applyKolomVisibility(cfg);
    refreshJadwalFromStorage();
    refreshRunningText();
  }, 1000);  

})

function loadJadwalFromStorage() {
  const raw = localStorage.getItem('jadwal');
  if (!raw) return null;

  try {
    return JSON.parse(raw);    // { keberangkatan: [...], kedatangan: [...] }
  } catch (e) {
    console.error('Data jadwal di localStorage tidak valid:', e);
    return null;
  }
  
}

function applySectionToTable(sectionName, tableSelector, dataJadwal) {
  const $table = $(tableSelector);
  if ($table.length === 0) return;             // tabel tidak ada, abaikan

  const rows = dataJadwal[sectionName];
  if (!rows || !Array.isArray(rows)) return;   // tidak ada data untuk section ini

  $table.find('tbody tr').each(function (rowIndex) {
    const rowData = rows[rowIndex];
    if (!rowData) return;                      // jika data kurang, baris sisanya tidak diubah

    const $tr = $(this);

    // perbarui atribut data-index & data-nomer di <tr>
    $tr.attr('data-index', rowIndex);
    $tr.attr('data-nomer', rowData.nomer || (rowIndex + 1));

    // isi setiap <td> yang punya data-field
    $tr.find('td[data-field]').each(function () {
      const field = $(this).data('field');     // nomer / seri / plat / mesin / kota / waktu / status
      if (!field) return;

      if (Object.prototype.hasOwnProperty.call(rowData, field)) {
        $(this).text(rowData[field]);
      }
    });
  });
}

function refreshJadwalFromStorage() {
  const data = loadJadwalFromStorage();
  if (!data) return; // jika belum ada di localStorage, tidak melakukan apa-apa

  // Jika tabel keberangkatan ada, isi data keberangkatan
  if ($('#tabel-keberangkatan').length) {
    applySectionToTable('keberangkatan', '#tabel-keberangkatan', data);
  }

  // Jika tabel kedatangan ada, isi data kedatangan
  if ($('#tabel-kedatangan').length) {
    applySectionToTable('kedatangan', '#tabel-kedatangan', data);
  }
}

function loadKolomFromStorage() {
  const raw = localStorage.getItem('kolom');

  if (!raw) return dataKolom; // pakai default

  try {
    const parsed = JSON.parse(raw);

    // tetap gabungkan dengan data default agar field tidak hilang
    return {
      keberangkatan: Object.assign({}, dataKolom.keberangkatan, parsed.keberangkatan || {}),
      kedatangan:   Object.assign({}, dataKolom.kedatangan,   parsed.kedatangan   || {})
    };

  } catch (e) {
    console.error("localStorage 'kolom' invalid, pakai default.", e);
    return dataKolom;
  }
}

function applyKolomVisibility(cfg) {
  ['keberangkatan', 'kedatangan'].forEach(function (section) {

    const $table = $('.jadwal-tabel[data-section="' + section + '"]');
    if ($table.length === 0) return;

    const sectionCfg = cfg[section];
    if (!sectionCfg) return;

    Object.keys(sectionCfg).forEach(function (field) {
      const visible = sectionCfg[field] === 1;
      const selector = '.col-' + field;

      if (visible) {
        $table.find(selector).show();
      } else {
        $table.find(selector).hide();
      }
    });
  });
}

function refreshRunningText() {
    // Ambil dari localStorage
    const current = localStorage.getItem('runningText');

    // Jika tidak ada sama sekali, boleh dibiarkan kosong
    // atau isi default (opsional):
    // if (current === null) {
    //     localStorage.setItem(STORAGE_KEY_RUNNING_TEXT, 'Selamat datang di Aplikasi Monitoring Data');
    // }

    // Hanya update kalau ada perubahan
    if (current !== null && current !== lastRunningText) {
        lastRunningText = current;
        $('#running-text').text(current);

        // Optional: reset animasi agar mulai dari awal setiap kali teks berubah
        const $el = $('#running-text');
        $el.removeClass('running-text');
        void $el[0].offsetWidth; // trigger reflow
        $el.addClass('running-text');
    }
}
