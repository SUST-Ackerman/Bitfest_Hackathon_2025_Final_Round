import { auth, signOut } from "@/auth";
import { Button } from "@/components/ui/button";

const SettingsPage = async () => {
    const session = await auth();

    return (
        <>
            <pre>{JSON.stringify(session, null, 2)}</pre>
            <form action={async ()=>{
                "use server";
                await signOut();
            }}>
                <Button 
                    type="submit"
                    variant={"destructive"}
                >
                    Sign out
                </Button>
            </form>
        </>
    )
}

export default SettingsPage;