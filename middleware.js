import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function middleware(req) {
    const token = await getToken(
        { req, secret: process.env.NEXTAUTH_SECRET });
    // console.log("Token ===", token)

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