import { registerSW } from 'virtual:pwa-register';

const updateSW = registerSW({
  onNeedRefresh() {
    if (confirm("Aplikasi memiliki update baru. Muat ulang sekarang?")) {
      updateSW(true);
    }
  },
  onOfflineReady() {
    console.log('✅ Aplikasi siap offline!');
  },
});
