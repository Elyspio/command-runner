import {Helper} from "../helper";
import md5 from "md5";
import {Config} from "../../config";

export const hash = (name: string, password: string) => md5(name + password)
export const isAuthenticated = () => {
   return  Helper.Cookie.getCookie(Config.Account.authorization_cookie_name)
}
