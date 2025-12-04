$(function() {

  TanggalWaktu.init({
    tanggalSelector: '#teks-tanggal',
    waktuSelector: '#teks-waktu',
    locale: 'id-ID',
    enableTanggal: true,
    enableWaktu: true
  });

  applyDataKolom(dataKolom);
  applyDataJadwal(dataJadwal);
  $('#running-text').val(dataRunningText);
  
  $('.data-kolom').on('change', function () {
      const section = $(this).data('section');  // "keberangkatan" atau "kedatangan"
      const field   = $(this).data('field');    // "seri", "plat", dll
      const value   = $(this).is(':checked') ? 1 : 0;

      // Update variabel dataKolom
      dataKolom[section][field] = value;

      // Simpan perubahan ke localStorage
      localStorage.setItem('kolom', JSON.stringify(dataKolom));
  });

  $('.data-jadwal').on('change', function () {
    currentDataJadwal = collectDataJadwal();
    localStorage.setItem('jadwal', JSON.stringify(currentDataJadwal));
  });

  $('#running-text').on('input', function () {
    const value = $(this).val();
    dataRunningText = value;
    localStorage.setItem('runningText', dataRunningText);
  });

  // menangani link jadwal
  let newTab = null;

  $('.link-jadwal').on('click', function(e) {
      e.preventDefault(); // cegah perilaku default <a>

      const url = $(this).attr('href');

      // buka tab bernama "link_unik"
      newTab = window.open(url, 'link_unik');

      // fokus jika sudah ada
      if (newTab) {
          newTab.focus();
      }
  });

  // Klik tombol Naik
  $(document).on('click', '.urutan-naik', function () {
    const tr = $(this).closest('tr');
    const table = tr.closest('.jadwal-tabel');
    const section = table.data('section'); // keberangkatan / kedatangan

    let index = parseInt(tr.data('index'), 10);

    if (index === 0) return; // baris paling atas tidak bisa naik

    // swap di array dataJadwal
    swapArray(dataJadwal[section], index, index - 1);

    // update nomer baru
    updateNomer(dataJadwal[section]);

    // simpan & render ulang
    localStorage.setItem('jadwal', JSON.stringify(dataJadwal));
    applyDataJadwal(dataJadwal);
  });


  // Klik tombol Turun
  $(document).on('click', '.urutan-turun', function () {
    const tr = $(this).closest('tr');
    const table = tr.closest('.jadwal-tabel');
    const section = table.data('section');

    let index = parseInt(tr.data('index'), 10);
    const maxIndex = dataJadwal[section].length - 1;

    if (index === maxIndex) return; // baris paling bawah tidak bisa turun

    // swap
    swapArray(dataJadwal[section], index, index + 1);

    // update nomer
    updateNomer(dataJadwal[section]);

    // simpan & render ulang
    localStorage.setItem('jadwal', JSON.stringify(dataJadwal));
    applyDataJadwal(dataJadwal);
  });
 
});

// fungsi-fungsi

function applyDataKolom(dataKolom) {
  $('.data-kolom').each(function () {
    const section = $(this).data('section'); // "keberangkatan" / "kedatangan"
    const field   = $(this).data('field');   // "seri", "plat", dst

    const value = dataKolom[section]?.[field];
    $(this).prop('checked', value == 1);
  });
}

function collectDataKolom() {
  const result = {};

  $('.kolom-checkbox').each(function () {
    const section = $(this).data('section');
    const field   = $(this).data('field');

    if (!result[section]) {
      result[section] = {};
    }

    result[section][field] = $(this).is(':checked') ? 1 : 0;
  });

  return result;
}

function applyDataJadwal(dataJadwal) {
  $('.jadwal-tabel').each(function () {
    const section = $(this).data('section'); // 'keberangkatan' / 'kedatangan'
    const rows    = dataJadwal[section] || [];

    $(this).find('tbody tr[data-index]').each(function () {
      const idx     = parseInt($(this).data('index'), 10);
      const rowData = rows[idx];
      if (!rowData) return; // jaga-jaga kalau data tidak cukup

      $(this).find('.data-jadwal').each(function () {
        const field = $(this).data('field');
        if (field in rowData) {
          $(this).val(rowData[field]);
        }
      });
    });
  });
}

function collectDataJadwal() {
  const result = {};

  $('.jadwal-tabel').each(function () {
    const section = $(this).data('section'); // 'keberangkatan' / 'kedatangan'
    const rows = [];

    $(this).find('tbody tr[data-index]').each(function () {
      const rowObj = {};

      $(this).find('.data-jadwal').each(function () {
        const field = $(this).data('field');
        const value = $(this).val();
        rowObj[field] = value;
      });

      // Jika field 'nomer' tidak ada / tidak di-bind, bisa fallback:
      if (!('nomer' in rowObj)) {
        rowObj.nomer = String(
          $(this).data('nomer') ||
          (parseInt($(this).data('index'), 10) + 1)
        );
      }

      rows.push(rowObj);
    });

    result[section] = rows;
  });

  return result;
}

function swapArray(arr, i, j) {
  const temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
}

function updateNomer(list) {
  list.forEach((item, index) => {
    item.nomer = String(index + 1);
  });
}
