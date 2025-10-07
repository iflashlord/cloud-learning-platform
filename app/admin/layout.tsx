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
    <div className="h-full">
      <AdminHeader />
      <div className="flex h-[calc(100vh-4rem)]">
        <AdminSidebar />
        <main className="flex-1 overflow-auto p-6 bg-gray-50">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;