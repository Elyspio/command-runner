import { $log } from '@tsed/common';
import {Helper} from "../../../util/helper";
import ExecReturn = Helper.ExecReturn;


type run = (command: string) => ExecReturn

export namespace RunnerService {

    export const run: run = async (command) => {
        return await isContainer() || await isWsl() ? runFromContainer(command) : runFromRealMachine(command);
    }

    const runFromContainer: run = async (command) => {

        const hostIp = process.env.SSH_HOST ?? await runFromRealMachine("/sbin/ip route|awk '/default/ { print $3 }'")
        const user = process.env.SSH_USER
        if (!user) {
            throw new Error("Environment variable SSH_USER must be set")
        }
        $log.info("Run from container", {user, hostIp, command})
        command = `ssh ${user}@${hostIp} ${command}`

        return (await Helper.exec(command))
    }

    const runFromRealMachine: run = async (command) => {
        $log.info("Run on host", {command})
        return (await Helper.exec(command))
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
