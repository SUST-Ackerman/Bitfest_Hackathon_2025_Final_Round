"use server";

import { signIn } from '@/auth';
import { DEFAULT_LOGIN_REDIRECT } from '@/routes';
import { LoginSchema } from '@/schemas';
import { AuthError } from 'next-auth';
import * as z from 'zod';

export const login = async (values: z.infer<typeof LoginSchema>) =>{
    const { email, password } = values;

    try {
        await signIn('credentials', {
            email,
            password,
            redirectTo: DEFAULT_LOGIN_REDIRECT,
        })
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case "CredentialsSignin":
                    return { error: "Invalid credentials" };
                default:
                    return { error: "An error occurred" };
            }
        }

        throw error;
    }
}

export const loginWithProvider = async (provider: "google" | "apple" ) => {
    try {
        await signIn(provider, {
            callbackUrl: DEFAULT_LOGIN_REDIRECT,
        })
    } catch (error) {
        throw error;
    }
}