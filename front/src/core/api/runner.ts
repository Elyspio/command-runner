import {Interactor} from "./Interactor";
import {getApiPath} from "../../config/api";
import {ClientRun} from "../../../../back/routes/types/request";
import store from "../../view/store";
import {AccountStateType} from "../../view/store/module/account/reducer";
import {Errors} from "../error";
import {Model} from "../model";


export namespace Api {
    export class Runner extends Interactor {

        private static _instance: Runner = new Runner(getApiPath("core"));

        public static get instance() {
            return this._instance;
        }

        public async run(command: string) {
            let account = store.getState().account;
            if (account.state.status === AccountStateType.succeeded && account.current) {
                const {password, username} = account.current

                const body: ClientRun["body"] = {
                    hash: Model.Account.hash(username, password),
                    command
                };

                return await super.get("/run", {}, body)
            } else {
                throw Errors.Account.requireLogin()
            }
        }
    }

}

