import {Helper} from "../../util/helper";
import fs from "fs-extra"
import {logger} from "../../util/logger";

type run = (command: string) => Promise<string>

export namespace Runner {

    export const run: run = async (command) => {
        return await isContainer() || await isWsl() ? runFromContainer(command) : runFromRealMachine(command);
    }

    const runFromContainer: run = async(command) => {

        const hostIp = process.env.SSH_HOST ?? await runFromRealMachine("/sbin/ip route|awk '/default/ { print $3 }'")
        const user = process.env.SSH_USER
        if(!user) {
            throw new Error("Environment variable SSH_USER must be set")
        }
        logger.info("Run from container", {user, hostIp, command})
        command = `ssh ${user}@${hostIp} ${command}`

        return (await Helper.exec(command)).stdout
    }

    const runFromRealMachine: run = async(command) => {
        logger.info("Run on host", {command})
        return (await Helper.exec(command)).stdout
    }

}

async function isContainer(): Promise<boolean>  {
    const {stdout}  = await Helper.exec("cat /proc/1/cgroup | grep docker || true");
    return stdout.includes("docker");
}


async function isWsl(): Promise<boolean> {
    const {stdout}  = await Helper.exec("cat /proc/version");
    return stdout.toLocaleLowerCase().includes("microsoft");
}
