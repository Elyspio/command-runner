import {RunnerService} from "./runner";
import {AuthenticationService} from "./authentication"
import {StorageService} from "./storage";


export const Services = {
    runner: new RunnerService(),
    authentication: new AuthenticationService(),
    storage: new StorageService()
}
