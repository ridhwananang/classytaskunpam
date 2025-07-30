import AppLogoIcon from './app-logo-icon';

export default function AppLogo() {
  return (
    <div className="flex items-center  rounded-xl gap-2 px-2 py-1 w-full">
      {/* Logo */}
      <div className="flex-shrink-0">
        <AppLogoIcon className="w-8 h-8 rounded-full" />
      </div>

      {/* Teks */}
      <div className="flex flex-col justify-center leading-tight overflow-hidden">
        <span className="text-2xl font-bold text-[#006359] dark:text-yellow-300 truncate">
          ClassyTask
        </span>
        {/* <span className="text-xs text-gray-600 dark:text-gray-300 truncate">
          Selesaikan tugas...
        </span> */}
      </div>
    </div>
  );
}
