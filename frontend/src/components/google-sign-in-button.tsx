"use client";

import { loginWithProvider } from "@/actions/login";

interface SocialSignInButtonProps {
    provider: "google" | "apple",
    child: React.ReactNode,
};

const SocialSignInButton = ({provider, child}: SocialSignInButtonProps) => {
    return (
        <button
            className={`
                flex items-center justify-center gap-x-2
                bg-white text-black
                rounded-md p-2
                hover:bg-gray-100
            `}
            onClick={() => {loginWithProvider(provider)}}
        >
            {child}
        </button>
    );
}

export default SocialSignInButton;