import type { NextAuthConfig } from "next-auth";

export const authConfig = {
  pages: {
    signIn: "/login",
  },
  callbacks: {
    // jwt callback runs in middleware — puts role into the token
    jwt({ token, user }) {
      if (user) {
        token.id = user.id!;
        token.role = (user as { role?: string }).role;
      }
      return token;
    },
    // session callback runs in middleware — maps token.role → session.user.role
    session({ session, token }) {
      if (token && session.user) {
        const u = session.user as unknown as { id?: unknown; role?: unknown };
        u.id   = token.id;
        u.role = token.role;
      }
      return session;
    },
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnPortal = nextUrl.pathname.startsWith("/portal");
      const isOnAdmin  = nextUrl.pathname.startsWith("/admin");
      const isOnOps    = nextUrl.pathname.startsWith("/ops");
      const isOnAuth   =
        nextUrl.pathname.startsWith("/login") ||
        nextUrl.pathname.startsWith("/register") ||
        nextUrl.pathname.startsWith("/forgot-password");

      const role = (auth?.user as Record<string, unknown> | undefined)?.role as string | undefined;

      if (isOnPortal || isOnAdmin || isOnOps) {
        if (!isLoggedIn) return false; // redirect to /login

        if (isOnAdmin && role !== "ADMIN") {
          return Response.redirect(new URL(role === "OPERATOR" ? "/ops" : "/portal", nextUrl));
        }

        if (isOnOps && role !== "OPERATOR" && role !== "ADMIN") {
          return Response.redirect(new URL("/portal", nextUrl));
        }

        if (isOnPortal && role === "ADMIN") {
          return Response.redirect(new URL("/admin", nextUrl));
        }

        if (isOnPortal && role === "OPERATOR") {
          return Response.redirect(new URL("/ops", nextUrl));
        }

        return true;
      }

      // Redirect already-logged-in users away from auth pages
      if (isOnAuth && isLoggedIn) {
        const dest = role === "ADMIN" ? "/admin" : role === "OPERATOR" ? "/ops" : "/portal";
        return Response.redirect(new URL(dest, nextUrl));
      }

      return true;
    },
  },
  providers: [],
} satisfies NextAuthConfig;
