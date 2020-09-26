import {Interactor} from "./Interactor";
import {getApiPath} from "../../config/api";
import {Helper} from "../../../../back/src/util/helper";

    export class Runner extends Interactor {

        private static _instance: Runner = new Runner(getApiPath("core"));

        public static get instance() {
            return this._instance;
        }

        public async run(command: string, cwd: string): Promise<Helper.ExecReturn> {

            const body  = {
                command,
                cwd
            };

            return JSON.parse(await (await super.post("/run", undefined, body)).text())
        }
    }

