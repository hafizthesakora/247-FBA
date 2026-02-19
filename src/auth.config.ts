import type { NextAuthConfig } from "next-auth";

export const authConfig = {
  pages: {
    signIn: "/login",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnPortal = nextUrl.pathname.startsWith("/portal");
      const isOnAdmin = nextUrl.pathname.startsWith("/admin");
      const isOnOps = nextUrl.pathname.startsWith("/ops");
      const isOnAuth =
        nextUrl.pathname.startsWith("/login") ||
        nextUrl.pathname.startsWith("/register") ||
        nextUrl.pathname.startsWith("/forgot-password");

      const role = auth?.user?.role;

      if (isOnPortal || isOnAdmin || isOnOps) {
        if (!isLoggedIn) return false; // Redirect to /login

        if (isOnAdmin && role !== "ADMIN") {
          const redirectTo = role === "OPERATOR" ? "/ops" : "/portal";
          return Response.redirect(new URL(redirectTo, nextUrl));
        }

        if (isOnOps && role !== "OPERATOR" && role !== "ADMIN") {
          return Response.redirect(new URL("/portal", nextUrl));
        }

        if (isOnPortal && role === "OPERATOR") {
          return Response.redirect(new URL("/ops", nextUrl));
        }

        return true;
      }

      // Redirect logged-in users away from auth pages
      if (isOnAuth && isLoggedIn) {
        const redirectTo =
          role === "ADMIN" ? "/admin" : role === "OPERATOR" ? "/ops" : "/portal";
        return Response.redirect(new URL(redirectTo, nextUrl));
      }

      return true;
    },
  },
  providers: [],
} satisfies NextAuthConfig;
