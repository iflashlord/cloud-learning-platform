import type { Meta, StoryObj } from "@storybook/react"

import { CouponManagementClient } from "./client-wrapper"

const baseCoupons = [
  {
    id: 1,
    code: "TRIAL30",
    description: "30 day trial for top creators",
    maxUsages: 50,
    currentUsages: 12,
    durationDays: 30,
    expiresAt: "2099-12-31T00:00:00.000Z",
    isActive: true,
  },
  {
    id: 2,
    code: "GROWTH15",
    description: "15-day boost for power users",
    maxUsages: 15,
    currentUsages: 15,
    durationDays: 15,
    expiresAt: "2099-12-31T00:00:00.000Z",
    isActive: false,
  },
]

const baseRedemptions = [
  {
    id: 10,
    userId: "user-1",
    user: { userId: "user-1", userName: "Ada Lovelace" },
    coupon: { code: "TRIAL30" },
    isActive: true,
    redeemedAt: "2024-02-01T10:00:00.000Z",
    proEndsAt: "2024-03-01T10:00:00.000Z",
  },
  {
    id: 11,
    userId: "user-1",
    user: { userId: "user-1", userName: "Ada Lovelace" },
    coupon: { code: "TRIAL30" },
    isActive: false,
    redeemedAt: "2024-01-01T10:00:00.000Z",
    proEndsAt: "2024-02-01T10:00:00.000Z",
  },
  {
    id: 12,
    userId: "user-2",
    user: { userId: "user-2", userName: "Grace Hopper" },
    coupon: { code: "GROWTH15" },
    isActive: false,
    redeemedAt: "2024-03-10T12:00:00.000Z",
    proEndsAt: "2024-03-25T12:00:00.000Z",
  },
]

const jsonResponse = (data: unknown, init?: ResponseInit) =>
  new Response(JSON.stringify(data), {
    status: init?.status ?? 200,
    headers: { "Content-Type": "application/json" },
    ...init,
  })

const createMockFetcher = () => {
  let coupons = [...baseCoupons]
  let redemptions = [...baseRedemptions]

  return (async (input: RequestInfo | URL, init?: RequestInit) => {
    const url = typeof input === "string" ? input : input.toString()
    const method = (init?.method || "GET").toUpperCase()

    if (url.endsWith("/api/admin/coupons") && method === "GET") {
      return jsonResponse(coupons)
    }

    if (url.endsWith("/api/admin/coupons/redemptions") && method === "GET") {
      return jsonResponse(redemptions)
    }

    if (url.endsWith("/api/admin/coupons") && method === "POST") {
      const rawBody = init?.body
      const body =
        rawBody && typeof rawBody === "string"
          ? JSON.parse(rawBody)
          : typeof rawBody === "object"
            ? rawBody
            : {}

      const nextId = Math.max(0, ...coupons.map((c) => c.id)) + 1
      const newCoupon = {
        id: nextId,
        currentUsages: 0,
        isActive: true,
        ...body,
      }
      coupons = [...coupons, newCoupon]
      return jsonResponse(newCoupon, { status: 201 })
    }

    if (url.includes("/api/admin/coupons/") && method === "PATCH") {
      const couponId = Number(url.split("/").pop())
      coupons = coupons.map((coupon) =>
        coupon.id === couponId ? { ...coupon, isActive: !coupon.isActive } : coupon,
      )
      return jsonResponse({ message: "updated" })
    }

    if (url.includes("/api/admin/coupons/") && method === "DELETE") {
      const couponId = Number(url.split("/").pop())
      coupons = coupons.filter((coupon) => coupon.id !== couponId)
      return jsonResponse({ message: "deleted" })
    }

    if (url.includes("/api/admin/coupons/redemptions/") && method === "PATCH") {
      const redemptionId = Number(url.split("/").pop())
      redemptions = redemptions.map((redemption) =>
        redemption.id === redemptionId ? { ...redemption, isActive: !redemption.isActive } : redemption,
      )
      return jsonResponse({ message: "redemption updated" })
    }

    return jsonResponse({ message: "ok" })
  }) as typeof fetch
}

const meta = {
  title: "Admin/Coupons/CouponManagementClient",
  component: CouponManagementClient,
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof CouponManagementClient>

export default meta
type Story = StoryObj<typeof meta>

export const DefaultExperience: Story = {
  render: () => <CouponManagementClient fetcher={createMockFetcher()} />,
}
