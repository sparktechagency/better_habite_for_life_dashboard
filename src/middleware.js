import { NextResponse } from "next/server";

/**
 * Next.js Middleware for route protection
 * This runs on the edge and can prevent unauthorized access before the page loads
 *
 * @param {Request} request - The incoming request
 * @returns {NextResponse} Response or redirect
 */
export function middleware(request) {
  const { pathname } = request.nextUrl;
  console.log("Middleware called for path:", pathname);

  // Public routes that don't require authentication
  const publicRoutes = [
    "/auth/login",
    "/auth/forgot-password",
    "/auth/reset-password",
    "/auth/verify-email",
    "/auth/verify-email",
  ];

  // Check if the current route is public
  const isPublicRoute = publicRoutes.some((route) =>
    pathname.startsWith(route)
  );

  // If it's a public route, allow access
  if (isPublicRoute) {
    return NextResponse.next();
  }

  // Get tokens from cookies
  const accessToken = request.cookies.get("accessToken")?.value;
  const userRole =
    request.cookies.get("userRole")?.value ||
    // Fallback: try to get from headers if set by client
    request.headers.get("x-user-role");

  // Debug logging (remove in production)
  console.log("Middleware check:", {
    pathname,
    hasAccessToken: !!accessToken,
    userRole,
    allCookies: Object.fromEntries(
      request.cookies.getAll().map((c) => [c.name, c.value])
    ),
  });

  // If no access token, redirect to login
  if (!accessToken) {
    const loginUrl = new URL("/auth/login", request.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Role-based route protection
  // Admin routes (admin and super_admin are treated the same)
  if (pathname.startsWith("/admin")) {
    if (userRole !== "admin" && userRole !== "super_admin") {
      console.log("Admin route blocked - userRole:", userRole);
      const redirectUrl = new URL("/auth/login", request.url);
      redirectUrl.searchParams.set("error", "unauthorized");
      redirectUrl.searchParams.set("redirect", pathname);
      return NextResponse.redirect(redirectUrl);
    }
  }

  // BHA (doctor) routes
  if (pathname.startsWith("/bha") && !pathname.startsWith("/bhaa")) {
    if (userRole !== "doctor") {
      console.log("BHA route blocked - userRole:", userRole);
      const redirectUrl = new URL("/auth/login", request.url);
      redirectUrl.searchParams.set("error", "unauthorized");
      redirectUrl.searchParams.set("redirect", pathname);
      return NextResponse.redirect(redirectUrl);
    }
  }

  // BHAA (assistant) routes
  if (pathname.startsWith("/bhaa")) {
    if (userRole !== "assistant") {
      console.log(
        "BHAA route blocked - userRole:",
        userRole,
        "expected: assistant"
      );
      console.log(
        "All available cookies:",
        Array.from(request.cookies.getAll()).map((c) => `${c.name}=${c.value}`)
      );
      const redirectUrl = new URL("/auth/login", request.url);
      redirectUrl.searchParams.set("error", "unauthorized");
      redirectUrl.searchParams.set("redirect", pathname);
      return NextResponse.redirect(redirectUrl);
    }
  }

  // Allow the request to proceed
  return NextResponse.next();
}

// Configure which routes this middleware should run on
export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - api routes
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder files
     */
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
