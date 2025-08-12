import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function middleware(req) {

    const path = req.nextUrl.pathname
    if (
        req.nextUrl.pathname.startsWith("/_next") ||
        req.nextUrl.pathname.startsWith("/api") ||
        req.nextUrl.pathname.startsWith("/static") ||
        req.nextUrl.pathname.endsWith(".json") ||
        req.nextUrl.pathname.endsWith(".png") ||
        req.nextUrl.pathname.endsWith(".jpg")
    ) {
        return NextResponse.next();
    }

    const isAuthpath = path === '/signin' || path === '/signup'
    const isPrivatepath = path === '/cart' || path === '/account'

    const token = await getToken(
        { req, secret: process.env.NEXTAUTH_SECRET });
    
    if (isAuthpath && token) {
        return NextResponse.redirect(new URL('/',req.url))
    }
    if (isPrivatepath && !token) {
        return NextResponse.redirect(new URL('/signin',req.url))
    }

    if (!token) {
        console.log("No Token Available")
        return NextResponse.next()
    }

    const response = NextResponse.next()
    response.headers.set("x-user-id", token.id)
    response.headers.set("x-user-name", token.name)
    response.headers.set("x-user-email", token.email)
    
    return response
}