import { AuthenticationService } from "../services/authentication.service";
import { ThemeService } from "../services/theme.service";
import { LocalStorageService } from "../services/localStorage.service";
import { DiKeysService } from "./di.keys.service";
import { container } from "./index";
import { RunnerService } from "../services/runner.service";

container.bind<AuthenticationService>(DiKeysService.authentication).to(AuthenticationService);

container.bind<RunnerService>(DiKeysService.core.runner).to(RunnerService);

container.bind<ThemeService>(DiKeysService.theme).to(ThemeService);

container.bind<LocalStorageService>(DiKeysService.localStorage.settings).toConstantValue(new LocalStorageService("elyspio-authentication-settings"));

container.bind<LocalStorageService>(DiKeysService.localStorage.validation).toConstantValue(new LocalStorageService("elyspio-authentication-validation"));
