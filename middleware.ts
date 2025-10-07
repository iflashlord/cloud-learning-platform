import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
 
const isPublicRoute = createRouteMatcher([
  "/",
  "/api/webhooks/stripe"
]);

export default clerkMiddleware((auth, request) => {
  if (!isPublicRoute(request)) {
    auth().protect();
  }
});
 
export const config = {
  // Protects all routes, including api/trpc.
  // See https://clerk.com/docs/references/nextjs/clerk-middleware
  // for more information about configuring your Middleware
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};