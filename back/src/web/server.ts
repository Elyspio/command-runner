import { Configuration, Inject } from "@tsed/di";
import { PlatformApplication } from "@tsed/common";
import "@tsed/swagger";
import { middlewares } from "./middlewares/common/raw";
import { webConfig } from "../config/server";

@Configuration(webConfig)
export class Server {
	@Inject()
	app!: PlatformApplication;

	@Configuration()
	settings!: Configuration;

	$beforeRoutesInit() {
		this.app.use(...middlewares);
		return null;
	}
}
