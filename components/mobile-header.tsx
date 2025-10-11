import { MobileSidebar } from "./mobile-sidebar";

export const MobileHeader = () => {
  return (
    <nav className="lg:hidden px-6 h-[50px] flex items-center bg-orange-500 dark:bg-gray-800 border-b border-orange-600 dark:border-gray-700 fixed top-0 w-full z-50">
      <MobileSidebar />
    </nav>
  );
};
