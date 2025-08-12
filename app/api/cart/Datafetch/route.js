import { NextResponse } from "next/server";

export async function POST(request) {
    try {
        const reqbody = await request.json()
        const { userId, Name, Email } = reqbody;
        console.log(userId)

    } catch (error) {
        console.log("Errorrrrrrrrrr")
        return NextResponse.json(
            {error:error.message},{status:400}
        )
    }
}