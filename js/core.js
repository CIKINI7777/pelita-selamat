// FUNGSI GANTI MODE (SIAGA <-> DARURAT)
window.toggleMode = function() {
  const body = document.body;
  const siagaScreen = document.getElementById('siaga-screen');
  const daruratScreen = document.getElementById('darurat-screen');
  
  // Cek apakah sedang mode darurat
  const isEmergency = body.classList.contains('emergency-mode');
  
  if (!isEmergency) {
    // MASUK MODE DARURAT
    body.classList.add('emergency-mode');
    siagaScreen.style.display = 'none';
    daruratScreen.style.display = 'flex';
    startCompass(); // Aktifkan kompas
  } else {
    // KEMBALI KE MODE SIAGA
    body.classList.remove('emergency-mode');
    siagaScreen.style.display = 'block';
    daruratScreen.style.display = 'none';
  }
};

// FUNGSI TAMPILKAN PERINGATAN
window.showAlert = function(title, message) {
  const alertBox = document.getElementById('alert-box');
  document.getElementById('alert-title').innerText = title;
  document.getElementById('alert-desc').innerText = message;
  
  alertBox.classList.add('active');
  
  // Opsional: Getar HP jika didukung
  if (navigator.vibrate) navigator.vibrate([500, 200, 500]);
};

// FUNGSI KOMPAS SEDERHANA
function startCompass() {
  if (window.DeviceOrientationEvent) {
    window.addEventListener('deviceorientation', (e) => {
      const arrow = document.getElementById('arrow');
      if (arrow && e.alpha !== null) {
        // Putar panah berlawanan arah putaran HP agar menunjuk Utara/Target
        arrow.style.transform = `rotate(${-e.alpha}deg)`;
      }
    });
  }
}

// EVENT LISTENER SAAT HALAMAN DIMUAT
document.addEventListener('DOMContentLoaded', () => {
  // Setup tombol simulasi
  const btnTest = document.getElementById('btn-test');
  if(btnTest) {
    btnTest.addEventListener('click', () => {
      showAlert('⚠️ SIMULASI BAHAYA', 'Ini hanya latihan. Silakan evakuasi ke titik kumpul terdekat.');
    });
  }
});
