import { NextResponse } from "next/server"
import { createCoupon, getAllCoupons } from "@/actions/coupon"

export async function GET() {
  try {
    const coupons = await getAllCoupons()
    return NextResponse.json(coupons)
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || String(err) }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { code, description, maxUsages, durationDays, expiresAt } = body

    const result = await createCoupon({
      code,
      description,
      maxUsages: Number(maxUsages || 1),
      durationDays: Number(durationDays || 30),
      expiresAt: expiresAt ? new Date(expiresAt) : undefined,
    })

    return NextResponse.json(result)
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || String(err) }, { status: 400 })
  }
}
