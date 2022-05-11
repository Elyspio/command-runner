import { Service } from "@tsed/common";
import { Helper } from "../utils/helper";
import { Log } from "../utils/decorators/logger";
import { getLogger } from "../utils/logger";
import { platform } from "os";
import ExecReturn = Helper.ExecReturn;

type run = (command: string, option?: { path: string; admin: boolean }) => Promise<ExecReturn>;

@Service()
export class RunnerService {
	private logger = getLogger.service(RunnerService);

	public async run(command: Parameters<run>[0], options: Parameters<run>[1]): ReturnType<run> {
		const isContained = await Promise.all([this.isContainer(), this.isWsl()]);
		return (isContained[0] || isContained[1] ? this.runFromContainer : this.runFromHost).apply(this, [command, options]);
	}

	async isContainer(): Promise<boolean> {
		const { stdout } = await Helper.exec("cat /proc/1/sched | head -n 1");
		this.logger.debug("Is container", { stdout });
		return !stdout.includes("init");
	}

	async isWsl(): Promise<boolean> {
		const { stdout } = await Helper.exec("cat /proc/version");
		return stdout.toLocaleLowerCase().includes("microsoft");
	}

	@Log()
	private async runFromContainer(command: Parameters<run>[0], options: Parameters<run>[1]): ReturnType<run> {
		const hostIp = process.env.SSH_HOST ?? "host.docker.internal";
		const user = process.env.SSH_USER;
		if (!user) {
			throw new Error("Environment variable SSH_USER must be set");
		}

		let commandToRun = this.withPath(options?.path);

		commandToRun += options?.admin ? this.withSudo(command) : command;

		commandToRun = `ssh -o StrictHostKeyChecking=no ${user}@${hostIp} "${commandToRun}"`;

		return await Helper.exec(commandToRun);
	}

	@Log()
	private async runFromHost(command: Parameters<run>[0], options: Parameters<run>[1]): ReturnType<run> {
		let commandToRun = this.withPath(options?.path);

		commandToRun += options?.admin ? this.withSudo(command) : command;

		return await Helper.exec(commandToRun);
	}

	private withPath(folder?: string): string {
		return folder ? `cd ${folder} && ` : "";
	}

	private withSudo(command: string): string {
		if (platform() === "linux") {
			const password = process.env.SSH_SUDO_PASSWORD;
			if (!password) {
				throw new Error("Environment variable SSH_SUDO_PASSWORD must be set");
			}
			return `unset HISTFILE && echo ${password} | sudo -S ${command}`;
		}
		return command;
	}
}
