import { IMiddleware, Middleware, QueryParams, Req } from "@tsed/common";
import { Unauthorized } from "@tsed/exceptions";
import { Request } from "express";
import { authorization_cookie_token, authorization_header_token } from "../../config/authentication";
import { getLogger } from "../../core/utils/logger";
import { AuthenticationService } from "../../core/services/authentication.service";
import { Inject } from "@tsed/di";

@Middleware()
export class RequireLogin implements IMiddleware {
	private static logger = getLogger.middleware(RequireLogin);

	@Inject()
	authenticationService!: AuthenticationService;

	public async use(@Req() req: Request, @QueryParams("token") token?: string) {
		const exception = new Unauthorized("You must be logged to access to this resource see https://elyspio.fr/authentication/");

		// Sanitize token param
		if (token === "") token = undefined;

		try {
			const cookieAuth = req.cookies[authorization_cookie_token];
			const headerToken = req.headers[authorization_header_token];

			RequireLogin.logger.info("RequireLogin", {
				cookieAuth,
				headerToken,
				uriToken: token,
				auth: this.authenticationService.isAuthenticated,
			});

			token = token ?? cookieAuth;
			token = token ?? (headerToken as string);

			let validate = await this.authenticationService.isAuthenticated(token);
			console.error({ validate });
			if (validate) {
				req.auth = {
					username: await this.authenticationService.getUsername(token),
					token,
				};
				return true;
			} else throw exception;
		} catch (e) {
			throw e;
		}
	}
}

declare global {
	namespace Express {
		interface Request {
			auth?: {
				username: string;
				token: string;
			};
			appAuth: {
				token: string;
			};
		}
	}
}
