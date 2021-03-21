import {createReducer} from "@reduxjs/toolkit";
import {setEndpoints, setEnvironment} from "./action";
import store from "../../index";

function removeDuplicationSlash(str: string) {
    return str.replaceAll("//", "/");
}

const xhr = new XMLHttpRequest()
xhr.open("GET", window.location.origin + removeDuplicationSlash(window.location.pathname + "/conf.json"), false)
xhr.send()
const initConf: ConfigState = JSON.parse(xhr.responseText)

export function getEnv(name: keyof ConfigState["envs"]): string {
    return store?.getState().config.envs[name] ?? defaultState.envs[name]
}

/**
 * Returns the endpoint without the trailing /
 * @param name
 */
export function getEndpoint(name: keyof ConfigState["endpoints"]) {
    let endpoint = store?.getState().config.endpoints[name] ?? defaultState.endpoints[name]

    if (endpoint.endsWith("/")) endpoint = endpoint.slice(0, endpoint.length - 1);

    return endpoint;
}

export interface ConfigState {
    envs: { [key in string]: string },
    endpoints: {
        core: string,
        authentication: string
    }
}

const defaultState: ConfigState = {
    envs: {},
    endpoints: {
        core: initConf.endpoints.core,
        authentication: initConf.endpoints.authentication
    }
};

export const reducer = createReducer(defaultState, ({addCase}) => {
    addCase(setEnvironment, (state, action) => {
        state.envs = action.payload;
    })
    addCase(setEndpoints, (state, action) => {
        state.endpoints = action.payload;
    })
});
