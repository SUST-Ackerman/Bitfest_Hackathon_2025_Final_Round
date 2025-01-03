import { auth } from "@/auth"

export const getProfileInformation = async () => {
    return await auth()
    .then((session) => {
        if(session && session.user && (session.user as any).token){
            const userToken = (session.user as any).token;
            return fetch(`${process.env.BASE_API_URL}/api/accounts/v2/user-info/`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Token ${userToken}`
                }
            }).then((res) => {
                if (res.ok) {
                    return res.json();
                } else {
                    throw new Error('Login failed');
                }
            }
            ).then((data) => {
                return JSON.stringify(data, null, 2);
            }).catch((err) => {
                return null;
            });
        }
    })
    .catch((err) => {
        return err
    });
}