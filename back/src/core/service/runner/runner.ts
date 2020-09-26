import { $log } from '@tsed/common';
import {Helper} from "../../../util/helper";
import ExecReturn = Helper.ExecReturn;


type run = (command: string, option?: {path: string}) => Promise<ExecReturn>

export namespace RunnerService {

    export const run: run = async (command, options) => {
        return await isContainer() || await isWsl() ? runFromContainer(command, options) : runFromRealMachine(command, options);
    }

    const runFromContainer: run = async (command, options) => {

        const hostIp = process.env.SSH_HOST ?? await runFromRealMachine("/sbin/ip route|awk '/default/ { print $3 }'")
        const user = process.env.SSH_USER
        if (!user) {
            throw new Error("Environment variable SSH_USER must be set")
        }

        if(options?.path) {
            command  = `"cd ${options.path} && ${command}"`
        }

        $log.info("Run from container", {user, hostIp, command})
        command = `ssh ${user}@${hostIp} ${command}`



        return (await Helper.exec(command))
    }

    const runFromRealMachine: run = async (command, options) => {
        $log.info("Run on host", {command})

        if(options?.path) {
            command  = `cd ${options.path} && ${command}`
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
