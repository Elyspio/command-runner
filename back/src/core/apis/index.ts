import {AuthenticationApi} from "./authentication";


export const getEnv = (name: string, fallback: string) => {
    return process.env[name] ?? fallback;
}

export const Apis = {
    authentication: new AuthenticationApi({
        basePath: getEnv("AUTHENTICATION_HOST", "https://elyspio.fr/authentication")
    })
}
