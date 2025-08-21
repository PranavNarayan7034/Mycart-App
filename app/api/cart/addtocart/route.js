import { NextResponse } from "next/server";
import { connectDB } from "@/dbConfig/dbConfig";
import User from "@/models/dbModel";


connectDB()
export async function POST(request) {
    try {

        const reqbody = await request.json()
        const { user, productId } = reqbody;
        const userId = user.userId

        const mongoUser = await User.findOne({ _id: userId })
        if (!mongoUser) {
            return NextResponse.json(
                { message: "User not found" }
            )
        }

        await User.updateOne(
            { _id: userId },
            { $addToSet: { CartList: productId } }     // $addToSet -- ensures no duplicates
        )                                              // $pull     -- remove items

        console.log("cart updated on mongodb")

        return NextResponse.json(
            { message: "Add To Cart completed" }
        )

    } catch (error) {
        return NextResponse.json(
            { error: error.message }, { status: 500 }
        )
    }
}