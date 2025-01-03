import CredentialLoginForm from "@/components/credential-login-form";
import SocialSignInButton from "@/components/google-sign-in-button";
import { FaApple, FaGoogle } from "react-icons/fa";


const LoginPage = () => {
    return (
        <div className="w-full h-screen bg-black flex justify-center items-center gap-y-5">
            <div className={`
                    w-[350px] rounded-xl p-8
                    bg-slate-700/15 text-slate-200 
                    flex flex-col gap-y-4
                `}
            >
                <CredentialLoginForm />
                <div className="flex w-full gap-5 justify-center">
                    <SocialSignInButton
                        provider="google"
                        child={<FaGoogle />}
                    />
                    <SocialSignInButton
                        provider="apple"
                        child={<FaApple />}
                    />
                </div>

                <div className="mt-4 text-center text-xs">
                    <p>Don't have an account? <a href="/auth/register" className="text-blue-500">Sign up</a></p>
                </div>

            </div>
        </div>
    );
}

export default LoginPage;