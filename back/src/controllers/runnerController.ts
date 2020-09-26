import {BodyParams, Controller, Cookies, Post} from "@tsed/common";
import {Forbidden} from "@tsed/exceptions"
import {authorization_cookie_name} from '../config/accounts';
import {Account, Runner} from "../core/service";


@Controller("/run")
export class RunnerController {

    @Post("/")
    async run(@BodyParams("command") command: string, @Cookies() cookies) {

        if (!process.env.IGNORE_AUTH && !await Account.isAuthorized(cookies[authorization_cookie_name])) {
            throw new Forbidden("You are not logged in")
        } else {
            return Runner.run(command);
        }
    }
}
