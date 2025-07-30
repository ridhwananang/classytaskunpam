import { useEffect, useState } from 'react';

export default function InstallButton() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);

  useEffect(() => {
    const handler = (e: any) => {
      console.log('👍 beforeinstallprompt event fired');
      e.preventDefault();
      setDeferredPrompt(e);
    };
  
    window.addEventListener('beforeinstallprompt', handler, { once: true });
  
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);
  

  const handleInstall = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      console.log(`User response to the install prompt: ${outcome}`);
      setDeferredPrompt(null);
    }
  };

  return deferredPrompt ? (
    <button onClick={handleInstall} className="px-4 py-2 bg-yellow-400 text-black rounded">
      Install Aplikasi
    </button>
  ) : null;
}
