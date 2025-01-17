import NextAuth, { User } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { UserModel } from "./data/user";
import { LoginSchema } from "./schemas";
import Google from "next-auth/providers/google";
import Apple from "next-auth/providers/apple";

type UserResponse = {
    name: string;
    username: string;
    email: string;
    role: string;
    is_verified: boolean;
    token: string;
}

export const {
    handlers: { GET, POST },
    auth,
    signIn,
    signOut
} = NextAuth({

    callbacks: {
        async session({ session, token }: { session: any, token: any }) {
            if(session.user){
                console.log("token", token);
                session.user.token = token.token;
            }
            return session;
        },
        async jwt({ token, user, account, session }) {
            
            if (account) {

                if (user && user.key) {
                    token.token = user.key;
                    return token;
                }

                const newUser = await fetch(`${process.env.BASE_API_URL}/api/auth/v1/google/login/`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        access_token: account.access_token
                    })
                })
                    .then(async (res) => {
                        if (res.ok) {
                            return await res.json();
                        } else {
                            throw new Error('Login failed');
                        }
                    })
                    .then((data) => {
                        console.log("login data ||||||| ", data);
                        return data as { key: string };
                    })
                    .catch((err) => {
                        return null;
                    });
                
                if (newUser) {
                    token.token = newUser.key;
                }
            } else if (user) {
                console.log("user ||||||| ", user);
                const usermodel = user as UserResponse;
                token.token = usermodel.token;
            }
            console.log("token ||||||| ", token);
            return token;
        },
    },
    providers: [
        Credentials({
            async authorize(credentials) {
                const validatedFields = LoginSchema.safeParse(credentials);

                if (!validatedFields.success) {
                    console.error(validatedFields.error.errors);
                    return null;
                }

                const { username, password } = validatedFields.data;

                const user = await fetch(`${process.env.BASE_API_URL}/api/auth/v1/login/`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        username,
                        password: password
                    })
                })
                    .then(async (res) => {
                        if (res.ok) {
                            return await res.json();
                        } else {
                            throw new Error('Login failed');
                        }
                    })
                    .then((data) => {
                        console.log("login data ||||||| ", data);
                        return {key: data.key};
                    })
                    .catch((err) => {
                        return null;
                    });


                return user;
            },
        }),
        Google,
        Apple,

    ],
    session: {
        strategy: "jwt",
    }
});
