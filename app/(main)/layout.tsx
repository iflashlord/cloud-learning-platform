import { Sidebar } from "@/components/sidebar";
import { MobileHeader } from "@/components/mobile-header";

type Props = {
  children: React.ReactNode;
};

const MainLayout = ({
  children,
}: Props) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <MobileHeader />
      <Sidebar className="hidden lg:flex" />
      <main className="lg:pl-[256px] h-full pt-[50px] lg:pt-0">
        <div className="max-w-[1056px] mx-auto pt-6 h-full">
          {children}
        </div>
      </main>
    </div>
  );
};
 
export default MainLayout;
