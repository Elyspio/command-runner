import {Apis} from "../apis";
import {Body, UnauthorizedModel} from "../apis/back/models"
import {AxiosResponse} from "axios";
import {Services} from "./index";

export class RunnerService {
    public run = async (options: Body) => {
        try {
            return await Apis.core.runner.runnerRun(options)
        } catch (e) {
            const error: { response: AxiosResponse<UnauthorizedModel> } = e

            if (error.response.status === 401 || error.response.data.status === 401) {
                Services.authentication.redirectToLoginPage()
            }
            console.log("e.response", error.response);
            throw error
        }
    }
}
