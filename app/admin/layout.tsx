import { redirect } from "next/navigation";
import { isAdmin } from "@/lib/admin";
import { AdminSidebar } from "./components/admin-sidebar";
import { AdminHeader } from "./components/admin-header";

type Props = {
  children: React.ReactNode;
};

const AdminLayout = ({ children }: Props) => {
  if (!isAdmin()) {
    redirect("/");
  }

  return (
    <div className="h-full min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <AdminHeader />
      <div className="flex h-[calc(100vh-4rem)]">
        <AdminSidebar />
        <main className="flex-1 overflow-auto p-6 bg-white/70 dark:bg-gray-900/70 backdrop-blur-sm">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;