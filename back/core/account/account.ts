import {files, Storage} from "../storage";
import {Accounts} from "./types";

export namespace Account {
    export async function isAuthorized(hash: string) : Promise<boolean>{
        const accounts: Accounts = JSON.parse(await Storage.read(files.account))
        return accounts.includes(hash)
    }
}
