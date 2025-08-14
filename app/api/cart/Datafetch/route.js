import { NextResponse } from "next/server";
import { connectDB } from "@/dbConfig/dbConfig";
import User from "@/models/dbModel";

connectDB()
export async function POST(request) {
    try {
        const reqbody = await request.json()
        const { userId, Name, Email } = reqbody;
        console.log("Email==",Email)
        const user = await User.findOne({_id:userId})
        if (!user) {
            return NextResponse.json(
                {message:"User not found"}
            )
        }
        return NextResponse.json({
            message: "Cart and Wishlist data Fetch completed",
            cart: user.CartList,
            wishlist: user.WishList, 
        })
        
    } catch (error) {
        return NextResponse.json(
            {error:error.message},{status:400}
        )
    }
}