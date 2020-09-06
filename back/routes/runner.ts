import {Router} from "express";
import {Runner} from "../../../command-runner/back/core/runner/runner";
import {Run} from "./types/request";
import {Account} from "../../../command-runner/back/core/account/account";

export const router = Router();

router.get("/test", async(req, res) => {

    const result = (await Runner.run("powercfg /l")).split("\r\n")

    res.json({result});
})



router.get("/run", async(req: Run, res) => {

    if(await Account.isAuthorized(req.body.hash)) {
        res.json(Runner.run(req.body.command))
    }
    else {
        res.sendStatus(403)
    }
})
