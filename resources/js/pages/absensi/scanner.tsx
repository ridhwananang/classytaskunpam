// import React, { useEffect } from 'react';
// import { Html5Qrcode } from 'html5-qrcode';
// import { router } from '@inertiajs/react';

// export default function Scanner() {
//   useEffect(() => {
//     const html5QrCode = new Html5Qrcode("reader");

//     html5QrCode.start(
//       { facingMode: "environment" },
//       { fps: 10, qrbox: 250 },
//       (decodedText) => {
//         html5QrCode.stop();
//         router.post('/absensi', { qr: decodedText });
//       },
//       (errorMessage) => {
//         // console.warn(`QR error: ${errorMessage}`);
//       }
//     );

//     return () => {
//       html5QrCode.stop().catch(() => {});
//     };
//   }, []);

//   return (
//     <div className="p-4 text-center">
//       <h1 className="text-xl font-bold mb-4">Scan QR untuk Absensi</h1>
//       <div id="reader" className="mx-auto" style={{ width: '300px' }}></div>
//     </div>
//   );
// }
