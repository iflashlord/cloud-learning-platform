import { NextResponse } from "next/server"
import { redeemCoupon } from "@/actions/coupon"

export async function POST(request: Request) {
  try {
    const { code } = await request.json()
    const result = await redeemCoupon(code)
    return NextResponse.json(result)
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || String(err) }, { status: 400 })
  }
}
