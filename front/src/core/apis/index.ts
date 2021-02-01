import {RunnerApi} from "./back";
import {getEndpoint} from "../../store/module/config/reducer";
import {AuthenticationApi} from "./authentication";


type Apis = {
    core: {
        runner: RunnerApi,
    },
    authentication: AuthenticationApi
}


export function createApis(): Apis {
    Apis = {
        core: {
            runner: new RunnerApi({basePath: getEndpoint("core")}),
        },
        authentication: new AuthenticationApi({basePath: getEndpoint("authentication")})
    }
    return Apis;
}

export var Apis: Apis = createApis();
