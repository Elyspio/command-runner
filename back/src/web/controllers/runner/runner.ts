import { BodyParams, Controller, Post } from "@tsed/common";
import { Services } from "../../../core/services";
import { Required, Returns } from "@tsed/schema";
import { RunRequest, RunResponse } from "./models";
import { AppProtected, Protected } from "../../middlewares/protected";

@Controller("/run")
export class Runner {
	@Post("/")
	@Protected()
	@Returns(200, RunResponse)
	async run(@Required(true) @BodyParams() { command, cwd, admin }: RunRequest) {
		return Services.runner.run(command, { path: cwd, admin });
	}


	@Post("/app")
	@AppProtected()
	@Returns(200, RunResponse)
	async runFromApp(@Required(true) @BodyParams() { command, cwd, admin }: RunRequest) {
		return Services.runner.run(command, { path: cwd, admin });
	}
}
