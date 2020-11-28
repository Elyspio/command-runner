import {Apis} from "../apis";
import {Body, UnauthorizedModel} from "../apis/back/models"
import {Api} from "../apis/api";
import {AxiosResponse} from "axios";

export class RunnerService {
    public run = async (options: Body) => {
        try {
            return await Apis.runner.runnerRun(options)
        } catch (e ) {
            const error: { response: AxiosResponse<UnauthorizedModel> } = e

            if (error.response.status === 401 || error.response.data.status === 401) {
                Api.redirect("login")
            }
            console.log("e.response", error.response);
            throw error
        }
    }
}
