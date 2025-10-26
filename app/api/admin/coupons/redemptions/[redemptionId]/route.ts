import { NextResponse } from "next/server"
import { disableUserCouponRedemption, enableUserCouponRedemption } from "@/actions/coupon"

export async function PATCH(request: Request, { params }: { params: { redemptionId: string } }) {
  try {
    const redemptionId = Number(params.redemptionId)
    const body = await request.json()
    const { action } = body // 'enable' | 'disable'

    if (action === "disable") {
      const res = await disableUserCouponRedemption(redemptionId)
      return NextResponse.json(res)
    }

    if (action === "enable") {
      const res = await enableUserCouponRedemption(redemptionId)
      return NextResponse.json(res)
    }

    return NextResponse.json({ error: "Unknown action" }, { status: 400 })
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || String(err) }, { status: 400 })
  }
}
