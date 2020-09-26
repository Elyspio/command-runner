import {Interactor} from "./Interactor";
import {getApiPath} from "../../config/api";

    export class Runner extends Interactor {

        private static _instance: Runner = new Runner(getApiPath("core"));

        public static get instance() {
            return this._instance;
        }

        public async run(command: string) {

            const body  = {
                command
            };

            return await super.post("/run", undefined, body)
        }
    }

