import {$log, Cookies, IMiddleware, Middleware, QueryParams, Req} from "@tsed/common";
import {ArrayOf, Integer, Property, Returns} from "@tsed/schema";
import {Unauthorized} from "@tsed/exceptions"
import {Services} from "../../core/services";
import {Request} from "express"
import {authorization_cookie_login, authorization_cookie_token} from "../../config/authentication";

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
    public async use(@Req() {headers, cookies}: Request, @QueryParams("token") token: string) {


        $log.info("New request checking IGNORE_AUTH value", process.env.IGNORE_AUTH)

        if (!process.env.IGNORE_AUTH) {
            try {

                const cookieAuth = cookies[authorization_cookie_token]
                const headerToken = headers[authorization_cookie_token];

                $log.info("RequireLogin", {cookies: cookies.authorization_cookie_token, token, header: headerToken})

                token = token ?? cookieAuth;
                token = token ?? headerToken


                if (await Services.authentication.isAuthenticated(token)) {
                    return true
                } else throw ""
            } catch (e) {
                throw new Unauthorized("You must be logged to access to this resource see https://elyspio.fr/authentication");
            }
        }
    }
}
