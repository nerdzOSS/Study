import { authkit } from "@workos-inc/authkit-nextjs";
import { NextRequest, NextResponse } from "next/server";
import jwt from 'jsonwebtoken';
import console from "console";

export const GET = async (request: NextRequest) => {
  // Use 'authkit' for edge functions that don't have access to headers
  const { session } = await authkit(request);

  if (!session || !session.user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  const decoded = jwt.decode(session.accessToken) as any;
  console.log(decoded);
  const roleSlug = decoded.role?.slug;
  
  return NextResponse.json({ name: session.user.firstName, type: session, roleSlug });
};