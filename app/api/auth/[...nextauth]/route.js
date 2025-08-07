import NextAuth from "next-auth";
import { connectDB } from "@/dbConfig/dbConfig";
import User from "@/models/dbModel";
import bcryptjs from "bcryptjs";
import Github from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

connectDB()
const handler = NextAuth({
    session: {
        strategy:"jwt"
    },
    providers: [
        Github({
            clientId: process.env.GITHUB_CLIENT_ID,
            clientSecret:process.env.GITHUB_CLIENT_SECRET
        }),

        Google({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret:process.env.GOOGLE_CLIENT_SECRET
        }),

        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: {},
                password:{}
            },
            async authorize(credentials) {
                try {
                    await connectDB()
                    const user = await User.findOne({ Email: credentials?.email })
                    if (!user) {
                        throw new Error("Invalid Email")
                    }
                    const isValidPassword = await bcryptjs.compare(credentials?.password , user.Password, );
                    if (!isValidPassword) {
                        throw new Error("Incorrect Password")
                    }
                    return user;

                } catch (error) {
                    return null
                }
            }
        })],
    callbacks: {
        async signIn({user,account}) {
            await connectDB()
            if (account?.provider === 'google' ||
                account?.provider === 'github') {
                const existingUser =
                    await User.findOne({ Email: user.email })
                if (!existingUser) {
                    const newUser = new User({
                        Firstname: user.name,
                        Lastname: "",
                        Email: user.email,
                        Password: ""
                    });
                    await newUser.save()
                }
            }
            return true;
        }
    },
    pages: {
        signin:'/signin'
    },
    secret:process.env.NEXTAUTH_SECRET
})


export {handler as GET , handler as POST}