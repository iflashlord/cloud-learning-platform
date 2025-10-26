import { redirect } from "next/navigation"
import { isAdmin } from "@/lib/admin"
import { CouponManagementClient } from "./client-wrapper"

const AdminCouponsPage = async () => {
  if (!(await isAdmin())) {
    redirect("/")
  }

  return <CouponManagementClient />
}

export default AdminCouponsPage
