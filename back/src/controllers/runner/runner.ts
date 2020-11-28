import {BodyParams, Controller, Cookies, Post, UseBefore} from "@tsed/common";
import {Services} from "../../core/service";
import {Returns} from "@tsed/schema";
import {RunResponse} from "./models";
import {RequireLogin, UnauthorizedModel} from "../../middlewares/authentication";


@Controller("/run")
export class Runner {

    @Post("/")
    @UseBefore(RequireLogin)
    @Returns(401, UnauthorizedModel)
    @Returns(200, RunResponse)
    async run(@BodyParams("command") command: string, @BodyParams("cwd") cwd: string, @Cookies() cookies) {
        return Services.runner.run(command, {path: cwd});
    }
}
