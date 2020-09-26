import {Helper} from "../helper";
import {Config} from "../../config";

export function goToLoginPage() {

    let ref;

    if (process.env.NODE_ENV !== "production") {
        ref = "http://elyspio.fr/authentication/"
    } else {
        const {origin} = window.location
        ref = `${origin}/authentication/`
    }
    window.location.href = `${ref}?target=${window.location.href}`;
}

/**
 * Return if the user has the login token
 */
export function isAuthenticated() {
    return !!Helper.Cookie.getCookie(Config.Account.authorization_cookie_name) || Helper.Utils.isDev()
}
