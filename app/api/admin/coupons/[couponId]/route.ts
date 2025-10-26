import { NextResponse } from "next/server"
import { updateCouponStatus, updateCoupon, deleteCoupon, getCouponById } from "@/actions/coupon"

export async function GET(request: Request, { params }: { params: { couponId: string } }) {
  try {
    const couponId = Number(params.couponId)
    const result = await getCouponById(couponId)
    return NextResponse.json(result)
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || String(err) }, { status: 400 })
  }
}

export async function PATCH(request: Request, { params }: { params: { couponId: string } }) {
  try {
    const couponId = Number(params.couponId)
    const body = await request.json()
    const { isActive } = body

    const result = await updateCouponStatus(couponId, Boolean(isActive))
    return NextResponse.json(result)
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || String(err) }, { status: 400 })
  }
}

export async function PUT(request: Request, { params }: { params: { couponId: string } }) {
  try {
    const couponId = Number(params.couponId)
    const body = await request.json()

    const updateData: any = {}
    if (body.code !== undefined) updateData.code = body.code
    if (body.description !== undefined) updateData.description = body.description
    if (body.maxUsages !== undefined) updateData.maxUsages = Number(body.maxUsages)
    if (body.durationDays !== undefined) updateData.durationDays = Number(body.durationDays)
    if (body.expiresAt !== undefined)
      updateData.expiresAt = body.expiresAt ? new Date(body.expiresAt) : null
    if (body.isActive !== undefined) updateData.isActive = Boolean(body.isActive)

    const result = await updateCoupon(couponId, updateData)
    return NextResponse.json(result)
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || String(err) }, { status: 400 })
  }
}

export async function DELETE(request: Request, { params }: { params: { couponId: string } }) {
  try {
    const couponId = Number(params.couponId)
    const result = await deleteCoupon(couponId)
    return NextResponse.json(result)
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || String(err) }, { status: 400 })
  }
}
