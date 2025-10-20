import { Footer } from "./footer";
import { Header } from "./header";

type Props = {
  children: React.ReactNode;
};

const MarketingLayout = ({ children }: Props) => {
  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        {/* Subtle animated patterns */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-300 dark:bg-purple-700 rounded-full mix-blend-multiply dark:mix-blend-overlay filter blur-xl animate-blob"></div>
          <div className="absolute top-0 -right-4 w-72 h-72 bg-yellow-300 dark:bg-yellow-700 rounded-full mix-blend-multiply dark:mix-blend-overlay filter blur-xl animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 dark:bg-pink-700 rounded-full mix-blend-multiply dark:mix-blend-overlay filter blur-xl animate-blob animation-delay-4000"></div>
        </div>
      </div>
      
      {/* Content */}
      <div className="relative z-10 flex flex-col min-h-screen">
        <Header />
        <main className="flex-1 flex flex-col">
          {children}
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default MarketingLayout;
