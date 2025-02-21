import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { decryptSession } from "./app/(auth)/utils/session";

const PROTECTED_ROUTES = ["/dashboard"];
const PUBLIC_ROUTES = ["/", "/sign-in", "/sign-up"];

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const isProtectedRoute = PROTECTED_ROUTES.includes(path);
  const isPublicRoute = PUBLIC_ROUTES.includes(path);

  const cookie = (await cookies()).get("session")?.value;
  const session = await decryptSession(cookie);

  if (isProtectedRoute && !session?.userId) {
    return NextResponse.redirect(new URL("/sign-in", req.nextUrl).toString());
  }

  if (isPublicRoute && session?.userId) {
    return NextResponse.redirect(new URL("/dashboard", req.nextUrl).toString());
  }

  return NextResponse.next();
}
