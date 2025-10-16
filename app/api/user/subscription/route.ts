import { NextResponse } from "next/server"
import { auth } from "@clerk/nextjs/server"
import { getUserSubscription } from "@/db/queries"

export async function GET() {
  try {
    const { userId } = await auth()

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const subscription = await getUserSubscription()

    return NextResponse.json({
      isActive: !!subscription?.isActive,
      subscription: subscription
        ? {
            id: subscription.id,
            stripeCustomerId: subscription.stripeCustomerId,
            stripeSubscriptionId: subscription.stripeSubscriptionId,
            stripePriceId: subscription.stripePriceId,
            stripeCurrentPeriodEnd: subscription.stripeCurrentPeriodEnd,
          }
        : null,
    })
  } catch (error) {
    console.log("[USER_SUBSCRIPTION_GET]", error)
    return new NextResponse("Internal Error", { status: 500 })
  }
}
