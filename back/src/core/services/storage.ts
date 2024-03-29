import { promises } from "fs";
import * as path from "path";
import * as os from "os";

const { writeFile, readFile } = promises;

export class StorageService {
	async store(name: string, data: string) {
		if (name[0] === "~") {
			name = path.join(os.homedir(), name.slice(1));
		}

		return writeFile(path.resolve(name), data);
	}

	async read(name: string) {
		return (await readFile(name)).toString();
	}
}
