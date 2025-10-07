import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/admin";
import db from "@/db/drizzle";
import { userSubscription } from "@/db/schema";

export async function GET() {
  if (!isAdmin()) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  try {
    // Get all subscriptions
    const subscriptions = await db.query.userSubscription.findMany();

    return NextResponse.json(subscriptions);
  } catch (error) {
    console.log("[ADMIN_PAYMENTS_GET]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function POST(request: Request) {
  if (!isAdmin()) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  try {
    const { action, subscriptionId } = await request.json();

    if (action === "refund" || action === "cancel") {
      // Here you would implement Stripe refund/cancel logic
      // For now, we'll just return success
      console.log(`${action} subscription:`, subscriptionId);
      
      return NextResponse.json({ success: true });
    }

    return new NextResponse("Invalid action", { status: 400 });
  } catch (error) {
    console.log("[ADMIN_PAYMENTS_POST]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}