import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongo";
// Use the main package import to avoid missing 'edge' module errors
import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import { getSession } from "next-auth/react";

const withApiAuthRequiredExtended = withPageAuthRequired as any;
export const GET = withApiAuthRequiredExtended(
  async (request: NextRequest, response: NextResponse) => {
    const { db } = await connectToDatabase();
    try {
      const session = await getSession(request as any);
      const user = session?.user as any;
      if (!user) {
        return NextResponse.error();
      }

      let profile;
      const data = await db
        .collection("profiles")
        .find({
          uid: user.sub,
        })
        .toArray();

      if (data.length === 0) {
        await db.collection("profiles").insertOne({
          uid: user.sub,
          credits: 1,
        });
        profile = {
          uid: user.sub,
          credits: 1,
        };
      } else {
        profile = data[0];
      }
      return NextResponse.json(
        { success: true, profile: profile },
        { status: 200 },
      );
    } catch (error) {
      return NextResponse.error();
    }
  },
);
