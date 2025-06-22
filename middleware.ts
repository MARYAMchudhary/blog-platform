// middleware.ts
import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

// Wrap withAuth to use custom callback
export default withAuth(
    function middleware(req) {
        // If not authenticated, redirect to login
        const url = req.nextUrl.clone();
        url.pathname = "/login";
        return NextResponse.redirect(url);
    },
    {
        pages: {
            signIn: "/login",
        },
    }
);

// Protect these routes
export const config = {
    matcher: [
        "/dashboard/:path*",
        "/api/posts/:path*",
    ],
};
