// Available themes (harus sesuai nama file CSS di folder tema, tanpa ekstensi .css)
const AVAILABLE_THEMES = ['Classic', 'Modern', 'Aurora', 'Board', 'Night'];

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
  initThemeSetting();
  initRunningTextSpeed();
  $('#running-text').val(dataRunningText);
  
  $('.data-kolom').on('change', function () {
      const section = $(this).data('section');  // "keberangkatan" atau "kedatangan"
      const field   = $(this).data('field');    // "seri", "plat", dll
      const value   = $(this).is(':checked') ? 1 : 0;

      // Update variabel dataKolom
      dataKolom[section][field] = value;

      saveBusSchedule();
  });

  $('.data-jadwal').on('change', function () {
    currentDataJadwal = collectDataJadwal();
    dataJadwal = currentDataJadwal;
    saveBusSchedule();
  });

  $('#running-text').on('input', function () {
    const value = $(this).val();
    dataRunningText = value;
    saveBusSchedule();
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

    currentDataJadwal = collectDataJadwal();
    // swap di array dataJadwal
    swapArray(currentDataJadwal[section], index, index - 1);

    // update nomer baru
    updateNomer(currentDataJadwal[section]);

    // simpan & render ulang
    dataJadwal = currentDataJadwal;
    saveBusSchedule();
    applyDataJadwal(currentDataJadwal);
  });


  // Klik tombol Turun
  $(document).on('click', '.urutan-turun', function () {
    const tr = $(this).closest('tr');
    const table = tr.closest('.jadwal-tabel');
    const section = table.data('section');

    let index = parseInt(tr.data('index'), 10);
    const maxIndex = dataJadwal[section].length - 1;

    if (index === maxIndex) return; // baris paling bawah tidak bisa turun

    currentDataJadwal = collectDataJadwal();
    // swap
    swapArray(currentDataJadwal[section], index, index + 1);

    // update nomer
    updateNomer(currentDataJadwal[section]);

    // simpan & render ulang
    dataJadwal = currentDataJadwal;
    saveBusSchedule();
    applyDataJadwal(currentDataJadwal);
  });
 
});

// fungsi-fungsi

function normalizeThemeName(themeName) {
  const rawTheme = String(themeName || 'Classic').trim() || 'Classic';
  return rawTheme.charAt(0).toUpperCase() + rawTheme.slice(1);
}

function initThemeSetting() {
  const $selectTheme = $('#select-theme');
  if ($selectTheme.length === 0) return;

  const savedTheme = normalizeThemeName(dataSetting?.theme);
  const validTheme = AVAILABLE_THEMES.includes(savedTheme) ? savedTheme : 'Classic';

  $selectTheme.empty();
  AVAILABLE_THEMES.forEach(function (theme) {
    $selectTheme.append($('<option>', { value: theme, text: theme }));
  });

  applyTheme(validTheme);
  $selectTheme.val(validTheme);
  dataSetting = Object.assign({}, dataSetting, { theme: validTheme });
  saveBusSchedule();

  $selectTheme.on('change', function () {
    const selected = normalizeThemeName($(this).val());
    const nextTheme = AVAILABLE_THEMES.includes(selected) ? selected : 'Classic';

    dataSetting = Object.assign({}, dataSetting, { theme: nextTheme });
    applyTheme(nextTheme);
    saveBusSchedule();
  });
}

function initRunningTextSpeed() {
  const $speedInput = $('#running-text-speed');
  if ($speedInput.length === 0) return;

  const currentSpeed = Number(dataSetting?.speed);
  const safeSpeed = Number.isFinite(currentSpeed) && currentSpeed > 0 ? currentSpeed : 60;

  dataSetting = Object.assign({}, dataSetting, { speed: safeSpeed });
  $speedInput.val(safeSpeed);

  $speedInput.on('input change', function () {
    const value = Number($(this).val());
    if (!Number.isFinite(value) || value <= 0) return;

    dataSetting = Object.assign({}, dataSetting, { speed: value });
    saveBusSchedule();
  });

  $speedInput.on('blur', function () {
    const value = Number($(this).val());
    const nextSpeed = Number.isFinite(value) && value > 0 ? value : (dataSetting?.speed || 60);
    dataSetting = Object.assign({}, dataSetting, { speed: nextSpeed });
    $(this).val(nextSpeed);
    saveBusSchedule();
  });
}

function applyTheme(themeName) {
  const normalized = normalizeThemeName(themeName);
  const href = 'tema/' + normalized + '.css';
  const $activeTheme = $('#active-theme');
  if ($activeTheme.length > 0) {
    $activeTheme.attr('href', href);
  }
}

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
