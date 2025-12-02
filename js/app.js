$(function() {

  TanggalWaktu.init({
    tanggalSelector: '#teks-tanggal',
    waktuSelector: '#teks-waktu',
    locale: 'id-ID',
    enableTanggal: true,
    enableWaktu: true
  });

  applyDataKolom(dataKolom);
  
  $('.data-kolom').on('change', function () {
      const section = $(this).data('section');  // "keberangkatan" atau "kedatangan"
      const field   = $(this).data('field');    // "seri", "plat", dll
      const value   = $(this).is(':checked') ? 1 : 0;

      // Update variabel dataKolom
      dataKolom[section][field] = value;

      // Simpan perubahan ke localStorage
      localStorage.setItem('kolom', JSON.stringify(dataKolom));
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
