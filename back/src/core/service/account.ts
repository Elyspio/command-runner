import fetch from "node-fetch"

export namespace Account {
    export async function isAuthorized(token: string): Promise<boolean> {

        try {
            await fetch("http://elyspio.fr/authentication/valid", {method: "POST", body: JSON.stringify({token})})
            return true;
        } catch (e) {
            return false;
        }
    }
}
