import { NextResponse } from "next/server";
import { connectDB } from "@/dbConfig/dbConfig";
import User from "@/models/dbModel";
import bcryptjs from 'bcryptjs';

connectDB();
export async function POST(request) {
    try {
        const reqbody = await request.json()
        const { Firstname, Lastname, Email, Password } = reqbody;
        const user = await User.findOne({ Email })
        if (user) {
            return NextResponse.json(
                {message:"User Email Already Exists"}
            )
        }
        const salt = await bcryptjs.genSalt(10)
        const hashedPassword = await bcryptjs.hash(Password, salt)
        const newUser = new User({
            Firstname,
            Lastname,
            Email,
            Password:hashedPassword
        })
        console.log(newUser)
        await newUser.save()
        return NextResponse.json(
            { message: "Signup Completed", success: true }, { status: 200 }
        )

    } catch (error) {
        return NextResponse.json(
            { error: error.message }, { status: 500 })
    }
}