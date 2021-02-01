import {RunnerService} from "./runner";
import {AuthenticationService} from "./authentication";

export const Services = {
    runner: new RunnerService(),
    authentication: new AuthenticationService()
}
