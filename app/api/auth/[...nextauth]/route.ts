import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import connectDB from "@/lib/db";
import User from "@/models/User";

export const authOptions: NextAuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID || "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
        }),
    ],
    callbacks: {
        async signIn({ user, account }) {
            if (account?.provider === "google") {
                const { name, email, image } = user;
                try {
                    await connectDB();
                    const userExists = await User.findOne({ email });

                    if (!userExists) {
                        if (!name || !email) {
                            return false;
                        }
                        await User.create({
                            name,
                            email,
                            image: image || undefined,
                        });
                    }
                    return true;
                } catch (error) {
                    console.log(error);
                    return false;
                }
            }
            return true;
        },
        async session({ session }) {
            if (session.user?.email) {
                await connectDB();
                const dbUser = await User.findOne({ email: session.user.email });
                if (dbUser) {
                    // @ts-expect-error adding id to session
                    session.user.id = dbUser._id.toString();
                }
            }
            return session;
        },
    },
    secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
