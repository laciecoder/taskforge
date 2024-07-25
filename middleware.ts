import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isProtectedRoute = createRouteMatcher([
  "/",
  "/signin(.*)",
  "/signup(.*)",
  "/api/webhook",
]);

export default clerkMiddleware((auth, req) => {
  const { userId, orgId } = auth();
  if (!isProtectedRoute(req)) auth().protect();
  if (userId && req.nextUrl.pathname === "/") {
    let path = "/select-org";
    if (orgId) path = `/organization/${orgId}`;
    const url = new URL(path, req.url);
    return NextResponse.redirect(url);
  }
  if (userId && !orgId && req.nextUrl.pathname !== "/select-org") {
    const url = new URL("/select-org", req.url);
    return NextResponse.redirect(url);
  }
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
