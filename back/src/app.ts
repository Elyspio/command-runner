import { $log } from "@tsed/common";
import "@tsed/platform-express"; // /!\ keep this import
import { PlatformExpress } from "@tsed/platform-express";
import { Server } from "./web/server";
import { hostname } from "os";

if (require.main === module) {
	bootstrap();
}

async function bootstrap() {
	try {
		$log.info("Start server...");
		const platform = await PlatformExpress.bootstrap(Server, {});

		await platform.listen();
		$log.info(`Server initialized on uri http://${hostname()}:5200/swagger`);
	} catch (er) {
		$log.error(er);
	}
}
