import * as path from "path";
import { SwaggerSettings } from "@tsed/swagger";

const jsTemplateFilePath = path.resolve(__dirname, "swagger-ui.js");

export const swaggersConf: SwaggerSettings[] = [
	{
		path: "/swagger",
		specVersion: "3.0.3",
		operationIdPattern: "%m",
		jsPath: jsTemplateFilePath,
	},
];
