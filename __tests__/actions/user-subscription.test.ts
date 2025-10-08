const {
  mockAuth,
  mockCurrentUser,
  mockGetUserSubscription,
  billingPortalCreate,
  checkoutCreate,
} = vi.hoisted(() => ({
  mockAuth: vi.fn(),
  mockCurrentUser: vi.fn(),
  mockGetUserSubscription: vi.fn(),
  billingPortalCreate: vi.fn(),
  checkoutCreate: vi.fn(),
}));

vi.mock("@clerk/nextjs/server", () => ({
  auth: mockAuth,
  currentUser: mockCurrentUser,
}));

vi.mock("@/db/queries", () => ({
  getUserSubscription: mockGetUserSubscription,
}));

vi.mock("@/lib/utils", () => ({
  absoluteUrl: (path: string) => `https://app.example${path}`,
}));

vi.mock("@/lib/stripe", () => ({
  stripe: {
    billingPortal: {
      sessions: {
        create: billingPortalCreate,
      },
    },
    checkout: {
      sessions: {
        create: checkoutCreate,
      },
    },
  },
}));

const { createStripeUrl } = await import("@/actions/user-subscription");

describe("createStripeUrl", () => {
  beforeEach(() => {
    mockAuth.mockReset().mockResolvedValue({ userId: "user_1" });
    mockCurrentUser.mockReset().mockResolvedValue({
      emailAddresses: [{ emailAddress: "ada@example.com" }],
    });
    mockGetUserSubscription.mockReset();
    billingPortalCreate.mockReset().mockResolvedValue({ url: "https://billing.example" });
    checkoutCreate.mockReset().mockResolvedValue({ url: "https://checkout.example" });
  });

  it("throws when the user is not authenticated", async () => {
    mockAuth.mockResolvedValueOnce({ userId: null });

    await expect(createStripeUrl()).rejects.toThrow("Unauthorized");
  });

  it("returns a billing portal URL when the user already has a subscription", async () => {
    mockGetUserSubscription.mockResolvedValue({
      stripeCustomerId: "cus_123",
    });

    const result = await createStripeUrl();

    expect(result).toEqual({ data: "https://billing.example" });
    expect(billingPortalCreate).toHaveBeenCalledWith({
      customer: "cus_123",
      return_url: "https://app.example/shop",
    });
    expect(checkoutCreate).not.toHaveBeenCalled();
  });

  it("creates a checkout session for new subscribers", async () => {
    mockGetUserSubscription.mockResolvedValue(null);

    const result = await createStripeUrl();

    expect(result).toEqual({ data: "https://checkout.example" });
    expect(checkoutCreate).toHaveBeenCalledWith(
      expect.objectContaining({
        mode: "subscription",
        metadata: { userId: "user_1" },
        success_url: "https://app.example/shop",
        cancel_url: "https://app.example/shop",
      }),
    );
    expect(billingPortalCreate).not.toHaveBeenCalled();
  });
});
