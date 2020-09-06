import {Interactor} from "./Interactor";
import {getApiPath} from "../../config/api";
import {Account as IAccount} from "../../../../back/core/account/types";
import {Model} from "../model";


export class Account extends Interactor {

    private static _instance: Account = new Account(getApiPath("account"));

    public static get instance() {
        return this._instance;
    }


    public async isAuthorized({name, password}: IAccount): Promise<boolean> {
        const hash = Model.Account.hash(name, password);
        try {
            const res = await super.post("/authorize", undefined, {hash});
            if (res.status === 200) return true;
        } catch (e) {
        }
        return false;
    }
}



