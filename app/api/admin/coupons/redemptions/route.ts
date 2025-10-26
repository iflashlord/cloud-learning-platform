import { NextResponse } from "next/server"
import { getAllCouponRedemptions } from "@/actions/coupon"

export async function GET() {
  try {
    const redemptions = await getAllCouponRedemptions()
    return NextResponse.json(redemptions)
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || String(err) }, { status: 500 })
  }
}
