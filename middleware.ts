import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { loggedInUser } from "./app/actions";

const publicRoutes = ["/login", "/register", "/forgot-password"];
const protectedRoutes = [
  "/profile",
  "/leaderboard",
  "/performance",
  "/quizzes/:id",
];

export async function middleware(request: NextRequest) {
  //   const accessToken = request.cookies.get("accessTooken");

  const { user } = await loggedInUser();

  const { pathname } = request.nextUrl;

  // 3. Define public and protected routes.
  const isPublicRoute = publicRoutes.includes(pathname);
  const isProtectedRoute =
    pathname.startsWith("/dashboard") ||
    pathname.startsWith("/quizzes/") ||
    protectedRoutes.includes(pathname);

  // 🚫 If user is NOT logged in and tries to access a protected route
  if (!user && isProtectedRoute) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("from", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // ✅ If user IS logged in and tries to access a public route (like /login), redirect to dashboard
  if (user && isPublicRoute) {
    const isAdmin = user.role.toLocaleLowerCase() === "admin";
    const dashboardUrl = new URL(
      `${isAdmin ? "/dashboard" : "/leaderboard"}`,
      request.url
    );
    dashboardUrl.searchParams.set("from", pathname);
    return NextResponse.redirect(dashboardUrl);
  }

  //   // 4. Redirect logic.
  //   if (isPublicRoute && accessToken && user) {
  //     // If the user is logged in and tries to access a public route like
  //     // the homepage or login page, redirect them to the dashboard.
  //     console.log(
  //       `Middleware: User is logged in. Redirecting from ${pathname} to /dashboard.`
  //     );
  //     return NextResponse.redirect(new URL("/dashboard", request.url));
  //   }

  //   if (isProtectedRoute && !accessToken && !user) {
  //     // If the user is not logged in and tries to access a protected route,
  //     // redirect them to the homepage.
  //     console.log(
  //       `Middleware: User not logged in. Redirecting from ${pathname} to /.`
  //     );
  //     // You can add a `from` query param to show a message on the homepage
  //     // for a better user experience.
  //     const url = new URL("/", request.url);
  //     url.searchParams.set("from", pathname);
  //     return NextResponse.redirect(url);
  //   }

  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  // The matcher defines which routes the middleware will run on.
  // This regex matches all routes except for those starting with:
  // - api (API routes)
  // - _next/static (static files)
  // - _next/image (image optimization files)
  // - favicon.ico (favicon file)
  matcher: "/((?!api|_next/static|_next/image|favicon.ico).*)",
};
