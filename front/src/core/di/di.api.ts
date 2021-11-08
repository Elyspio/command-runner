import { DiKeysApi } from "./di.keys.api";
import { RunnerApi } from "../apis/backend";
import { AuthenticationApi } from "../apis/authentication";
import { container } from "./index";

container.bind<RunnerApi>(DiKeysApi.runner).to(RunnerApi);

container.bind<AuthenticationApi>(DiKeysApi.authentication).to(AuthenticationApi);
