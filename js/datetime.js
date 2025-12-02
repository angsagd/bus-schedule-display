// datetime.js
(function (global) {
    'use strict';

    const DEFAULT_OPTIONS = {
        tanggalSelector: '#teks-tanggal',
        waktuSelector: '#teks-waktu',
        locale: 'id-ID',
        enableTanggal: true,
        enableWaktu: true
    };

    let _config = null;
    let _tanggalEl = null;
    let _waktuEl = null;

    let _waktuIntervalId = null;
    let _tanggalIntervalId = null;
    let _midnightTimeoutId = null;
    let _initialized = false;

    function pad2(num) {
        return String(num).padStart(2, '0');
    }

    function formatTanggal(now, locale) {
        const opsiFormat = {
            weekday: 'long',
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        };
        return now.toLocaleDateString(locale || 'id-ID', opsiFormat);
    }

    function updateTanggal() {
        if (!_config || !_config.enableTanggal || !_tanggalEl) return;
        const now = new Date();
        const teksTanggal = formatTanggal(now, _config.locale);
        _tanggalEl.textContent = teksTanggal;
    }

    function updateWaktu() {
        if (!_config || !_config.enableWaktu || !_waktuEl) return;
        const now = new Date();
        const hh = pad2(now.getHours());
        const mm = pad2(now.getMinutes());
        const ss = pad2(now.getSeconds());
        const teksWaktu = `${hh}:${mm}:${ss}`;
        _waktuEl.textContent = teksWaktu;
    }

    function msMenujuMidnight() {
        const now = new Date();
        const midnight = new Date(
            now.getFullYear(),
            now.getMonth(),
            now.getDate() + 1,
            0, 0, 0, 0
        );
        return midnight - now;
    }

    function scheduleTanggalUpdate() {
        if (!_config || !_config.enableTanggal || !_tanggalEl) return;

        if (_midnightTimeoutId) {
            clearTimeout(_midnightTimeoutId);
            _midnightTimeoutId = null;
        }
        if (_tanggalIntervalId) {
            clearInterval(_tanggalIntervalId);
            _tanggalIntervalId = null;
        }

        _midnightTimeoutId = setTimeout(function () {
            updateTanggal(); // update tepat jam 00:00:00
            _tanggalIntervalId = setInterval(updateTanggal, 24 * 60 * 60 * 1000);
        }, msMenujuMidnight());
    }

    const TanggalWaktu = {

        init: function (options) {
            if (_initialized) return;

            _config = Object.assign({}, DEFAULT_OPTIONS, options || {});
            _initialized = true;

            if (_config.enableTanggal) {
                _tanggalEl = document.querySelector(_config.tanggalSelector) || null;
            }
            if (_config.enableWaktu) {
                _waktuEl = document.querySelector(_config.waktuSelector) || null;
            }

            if (_config.enableTanggal && _tanggalEl) {
                updateTanggal();
                scheduleTanggalUpdate();
            }

            if (_config.enableWaktu && _waktuEl) {
                updateWaktu();
                _waktuIntervalId = setInterval(updateWaktu, 1000);
            }
        },

        destroy: function () {
            if (_waktuIntervalId) clearInterval(_waktuIntervalId);
            if (_tanggalIntervalId) clearInterval(_tanggalIntervalId);
            if (_midnightTimeoutId) clearTimeout(_midnightTimeoutId);

            _waktuIntervalId = null;
            _tanggalIntervalId = null;
            _midnightTimeoutId = null;

            _tanggalEl = null;
            _waktuEl = null;
            _config = null;
            _initialized = false;
        }
    };

    global.TanggalWaktu = TanggalWaktu;

})(window);
