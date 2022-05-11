import * as path from "path";
import * as process from "process";
import { Configuration } from "@tsed/common";
import { swaggersConf } from "./swagger/swagger";

export const rootDir = path.resolve(__dirname, "..");

export const webConfig: Partial<Configuration> = {
	rootDir,
	acceptMimes: ["application/json", "text/plain"],
	httpPort: process.env.HTTP_PORT || 5200,
	httpsPort: false,
	mount: {
		"/api": [`${rootDir}/web/controllers/*.ts`, `${rootDir}/web/controllers/**/*.ts`],
	},
	componentsScan: [`${rootDir}/core/**/*.ts`],
	exclude: ["**/*.spec.ts", "**/*.d.ts"],
	swagger: swaggersConf,
	logger: { level: "debug" },
};
