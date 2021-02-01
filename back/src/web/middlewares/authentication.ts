import {$log, Cookies, IMiddleware, Middleware, QueryParams, Req} from "@tsed/common";
import {ArrayOf, Integer, Property, Returns} from "@tsed/schema";
import {Unauthorized} from "@tsed/exceptions"
import {Services} from "../../core/services";
import {Request} from "express"
export class UnauthorizedModel {
    @ArrayOf(String)
    errors: []
    @Property()
    message: "You must be logged to access to this resource see https://elyspio.fr/authentication"
    @Property()
    name: "UNAUTHORIZED"
    @Integer()
    status: 401
}


@Middleware()
export class RequireLogin implements IMiddleware {
    @Returns(401, UnauthorizedModel)
    public async use(@Req() req: Request, @QueryParams("token") token: string, @Cookies() cookies) {


        if (!process.env.IGNORE_AUTH) {
            try {
                $log.info("RequireLogin", {elyspio_authorisation_token: cookies.elyspio_authorisation_token, token})
                token = token ?? cookies.elyspio_authorisation_token;

                await Services.authentication.isAuthenticated(token)
                return true
            } catch (e) {
                throw new Unauthorized("You must be logged to access to this resource see https://elyspio.fr/authentication");
            }
        }
    }
}
