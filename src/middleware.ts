import NextAuth from "next-auth";
import { authConfig } from "./auth.config";

export default NextAuth(authConfig).auth;

export const config = {
  matcher: ["/portal/:path*", "/admin/:path*", "/ops/:path*", "/login", "/register", "/forgot-password"],
};
