import {RunnerApi} from "./back";
import {getApiPath} from "../../config/api";

export const Apis = {
    runner: new RunnerApi({basePath: getApiPath()})
}
