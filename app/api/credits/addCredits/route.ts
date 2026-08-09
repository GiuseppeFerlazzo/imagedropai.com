import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongo";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";

import Stripe from "stripe";
import { getSession } from "next-auth/react";

const stripe = new Stripe(process.env.stripe_secret_key!, {
  apiVersion: "2026-07-29.dahlia",
  typescript: true,
});
const withApiAuthRequiredExtended = withPageAuthRequired as any;
export const GET = withApiAuthRequiredExtended(
  async (request: NextRequest, response: NextResponse) => {
    const { db } = await connectToDatabase();
    try {
      const session = await getSession(request as any);
      const user = session?.user;
      if (!user) {
        return NextResponse.error();
      }

      const purchasedItems = [
        {
          price: process.env.STRIPE_PRICE_ID,
          quantity: 1,
        },
      ];

      const uid: string | number | null = user.id ?? null;

      const stripeSession = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: purchasedItems,
        mode: "payment",
        success_url: `${process.env.NEXT_PUBLIC_URL}/success`,
        cancel_url: `${process.env.NEXT_PUBLIC_URL}/profile`,
        payment_intent_data: {
          metadata: {
            uid,
          },
        },
        metadata: {
          uid,
        },
      });

      return NextResponse.json(
        { success: true, session: stripeSession },
        { status: 200 },
      );
    } catch (error) {
      return NextResponse.error();
    }
  },
);
