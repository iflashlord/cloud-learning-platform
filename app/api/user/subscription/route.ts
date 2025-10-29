import { NextResponse } from "next/server"
import { auth } from "@clerk/nextjs/server"
import { getUserSubscription } from "@/db/queries"

export const dynamic = "force-dynamic"

export async function GET() {
  try {
    const { userId } = await auth()

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const subscription = await getUserSubscription()

    return NextResponse.json({
      isActive: !!subscription?.isActive,
      hasActiveCouponSubscription:
        subscription?.proType === "coupon" && subscription?.activeCouponRedemption,
      subscription: subscription
        ? {
            id: subscription.id,
            stripeCustomerId: subscription.stripeCustomerId,
            stripeSubscriptionId: subscription.stripeSubscriptionId,
            stripePriceId: subscription.stripePriceId,
            stripeCurrentPeriodEnd: subscription.stripeCurrentPeriodEnd,
            proType: subscription.proType,
            activeCouponRedemption: subscription.activeCouponRedemption,
          }
        : null,
    })
  } catch (error) {
    console.log("[USER_SUBSCRIPTION_GET]", error)
    return new NextResponse("Internal Error", { status: 500 })
  }
}
