import {$log} from '@tsed/common';
import {Helper} from "../../util/helper";
import ExecReturn = Helper.ExecReturn;


type run = (command: string, option?: { path: string }) => Promise<ExecReturn>

export class RunnerService {

    run: run = async (command, options) => {
        return await isContainer() || await isWsl() ? this.runFromContainer(command, options) : this.runOnCurrentMachine(command, options);
    }

    runFromContainer: run = async (command, options) => {

        $log.debug("runFromContainer -- enter")

        const hostIp = process.env.SSH_HOST ?? "host.docker.internal"
        const user = process.env.SSH_USER
        if (!user) {
            throw new Error("Environment variable SSH_USER must be set")
        }

        if (options?.path) {
            command = `"cd ${options.path} && ${command}"`
        }

        $log.info("Run from container", {user, hostIp, command})
        command = `ssh ${user}@${hostIp} ${command}`


        return (await Helper.exec(command))
    }

    runOnCurrentMachine: run = async (command, options) => {
        $log.info("Run on host", {command})

        if (options?.path) {
            command = `cd ${options.path} && ${command}`
        }

        return await Helper.exec(command)
    }

}

async function isContainer(): Promise<boolean> {
    const {stdout} = await Helper.exec("cat /proc/1/cgroup | grep docker || true");
    return stdout.includes("docker");
}


async function isWsl(): Promise<boolean> {
    const {stdout} = await Helper.exec("cat /proc/version");
    return stdout.toLocaleLowerCase().includes("microsoft");
}
