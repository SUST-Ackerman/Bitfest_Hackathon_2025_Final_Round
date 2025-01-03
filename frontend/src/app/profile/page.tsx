import { getProfileInformation } from "@/actions/getProfileInformation";
import { signOut } from "@/auth";
import { Button } from "@/components/ui/button";



const ProfilePage = async () => {
    const profileInformation = getProfileInformation();
    

    return (
        <>
            <pre>{profileInformation}</pre>
            
            
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

export default ProfilePage;