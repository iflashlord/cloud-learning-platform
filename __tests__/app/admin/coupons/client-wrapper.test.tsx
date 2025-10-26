import { render, screen, waitFor } from "@testing-library/react"
import { describe, it, expect, vi, beforeEach } from "vitest"

import { CouponManagementClient, groupRedemptions } from "@/app/admin/coupons/client-wrapper"

vi.mock("sonner", () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
  },
}))

const sampleCoupon = {
  id: 1,
  code: "TRIAL100",
  description: "Test description",
  maxUsages: 10,
  currentUsages: 1,
  durationDays: 30,
  expiresAt: "2099-12-31T00:00:00.000Z",
  isActive: true,
}

const sampleRedemptions = [
  {
    id: 1,
    userId: "user-1",
    coupon: { code: "TRIAL100" },
    user: { userId: "user-1", userName: "Test User" },
    isActive: true,
    redeemedAt: "2024-01-01T00:00:00.000Z",
    proEndsAt: "2099-01-01T00:00:00.000Z",
  },
  {
    id: 2,
    userId: "user-1",
    coupon: { code: "TRIAL100" },
    user: { userId: "user-1", userName: "Test User" },
    isActive: false,
    redeemedAt: "2023-01-01T00:00:00.000Z",
    proEndsAt: "2023-02-01T00:00:00.000Z",
  },
]

const buildFetchMock = (coupons: any[], redemptions: any[]) => {
  const spy = vi.fn((input: RequestInfo | URL) => {
    const url = typeof input === "string" ? input : input.toString()

    if (url.endsWith("/api/admin/coupons")) {
      return Promise.resolve({
        ok: true,
        json: async () => coupons,
      })
    }

    if (url.endsWith("/api/admin/coupons/redemptions")) {
      return Promise.resolve({
        ok: true,
        json: async () => redemptions,
      })
    }

    return Promise.resolve({
      ok: true,
      json: async () => ({ message: "ok" }),
    })
  })

  return { spy, fetcher: spy as unknown as typeof fetch }
}

describe("CouponManagementClient", () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it("shows the empty state when no coupons are available", async () => {
    const { fetcher, spy } = buildFetchMock([], [])
    render(<CouponManagementClient fetcher={fetcher} />)

    await waitFor(() =>
      expect(
        screen.getByText(/No coupons created yet\. Click "Create Coupon" to get started\./i),
      ).toBeInTheDocument(),
    )

    const calledUrls = spy.mock.calls.map((call) => call[0])
    expect(calledUrls).toEqual(
      expect.arrayContaining([
        "/api/admin/coupons",
        "/api/admin/coupons/redemptions",
      ]),
    )
  })

  it("renders coupon info and redemption history after data loads", async () => {
    const { fetcher } = buildFetchMock([sampleCoupon], sampleRedemptions)
    render(<CouponManagementClient fetcher={fetcher} />)

    await waitFor(() => expect(screen.getByText("TRIAL100")).toBeInTheDocument())
    expect(screen.getByText("Test description")).toBeInTheDocument()
    expect(screen.getByText("History")).toBeInTheDocument()
    expect(screen.getByText("Test User")).toBeInTheDocument()
    expect(screen.getByText(/Code: TRIAL100/i)).toBeInTheDocument()
  })
})

describe("groupRedemptions", () => {
  it("groups by user and coupon code and sorts by redeemed date", () => {
    const grouped = groupRedemptions([
      {
        id: 1,
        userId: "user-1",
        coupon: { code: "TRIAL30" },
        redeemedAt: "2024-01-01T00:00:00.000Z",
      },
      {
        id: 2,
        user: { userId: "user-1" },
        coupon: { code: "TRIAL30" },
        redeemedAt: "2024-02-01T00:00:00.000Z",
      },
      {
        id: 3,
        userId: "user-2",
        coupon: { code: "TRIAL30" },
        redeemedAt: "2024-03-01T00:00:00.000Z",
      },
    ])

    expect(Object.keys(grouped)).toEqual(["user-1__TRIAL30", "user-2__TRIAL30"])
    expect(grouped["user-1__TRIAL30"][0].id).toBe(2)
    expect(grouped["user-1__TRIAL30"][1].id).toBe(1)
    expect(grouped["user-2__TRIAL30"]).toHaveLength(1)
  })
})
