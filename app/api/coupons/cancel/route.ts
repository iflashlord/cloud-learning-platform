import { NextResponse } from "next/server"
import { cancelMyCouponRedemption } from "@/actions/coupon"

export async function POST() {
  try {
    const result = await cancelMyCouponRedemption()
    return NextResponse.json(result)
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || String(err) }, { status: 400 })
  }
}
