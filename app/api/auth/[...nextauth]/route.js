import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials";
import User from "@/models/dbModel";
import { connectDB } from "@/dbConfig/dbConfig";
import bcryptjs from "bcryptjs";
import { NextResponse } from "next/server";

connectDB(); // make sure to connect DB once at the top

const handler = NextAuth({
    session: {
        strategy: "jwt",
    },
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET,
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: {},
                password: {},
            },
            async authorize(credentials) {
                try {
                    await connectDB();
                    const user = await User.findOne({ Email: credentials?.email });
                    if (!user) {
                        throw new Error("Invalid Email");
                    }
                    const isValidPassword = await bcryptjs.compare(credentials?.password, user.Password);
                    if (!isValidPassword) {
                        throw new Error("Invalid Password");
                    }

                    return user;

                } catch (error) {
                    return null
                }
            },
        }),
    ],

    callbacks: {
        async signIn({ user, account, profile }) {
            await connectDB();

            if (account?.provider === "google" || account?.provider === "github") {
                const existingUser = await User.findOne({ Email: user.email });

                if (!existingUser) {
                    const parts = user.name?.split(" ") || []
                    const newUser = new User({
                        Firstname: parts[0] || "",
                        Lastname: parts.slice(1).join(" ") || "",
                        Email: user.email,
                        Password: "",
                    });
                    await newUser.save();
                }
            }
            return true;
        },
        async jwt({ token, user }) {
            if (user) {
                token.id = user._id || user.id;
                token.email = user.email;
            }
            return token
        },
        async session({ session, token }) {
            if (token) {
                session.user = {
                    id: token.id,
                    email: token.email,
                    name: token.name,
                }
            }
            return session;
        }

    },

    pages: {
        signIn: "/signin",
    },
    secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
