import { Log } from "../utils/decorators/logger";
import { getLogger } from "../utils/logger";
import { AuthenticationApiClient } from "../apis/authentication";
import { Inject } from "@tsed/di";
import { Service } from "@tsed/common";
import { BaseService } from "./base.service";

@Service()
export class AuthenticationService extends BaseService {
	private logger = getLogger.service(AuthenticationService);

	@Inject()
	private authenticationApi!: AuthenticationApiClient;

	@Log.service()
	public async isAuthenticated(token: string) {
		return this.authenticationApi.clients.connection.validToken(token).then(this.unwrap);
	}

	@Log.service()
	public async getUsername(token: string) {
		return this.authenticationApi.clients.user.getUserInfo("username", token, token).then(this.unwrap);
	}
}
