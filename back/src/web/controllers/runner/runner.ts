import { BodyParams, Controller, Post } from "@tsed/common";
import { Services } from "../../../core/services";
import { Required, Returns } from "@tsed/schema";
import { RunRequest, RunResponse } from "./models";
import { Protected } from "../../middlewares/protected";

@Controller("/run")
export class Runner {
	@Post("/")
	@Protected()
	@Returns(200, RunResponse)
	async run(@Required @BodyParams() { command, cwd }: RunRequest) {
		return Services.runner.run(command, { path: cwd });
	}
}
