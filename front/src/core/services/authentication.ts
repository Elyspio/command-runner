import {Apis} from "../apis";
import {getEndpoint} from "../../store/module/config/reducer";

export class AuthenticationService {
    get logged() {
        return Apis.authentication.authenticationValidToken();
    }

    redirectToLoginPage = () => {
        window.location.href = `${getEndpoint("authentication")}/?target=${window.location.href}`
    }
}
