import {Request} from "express";
import {ParsedUrlQuery} from "querystring";


// @ts-ignore
interface Uri<Query, Body> extends Request {
    body: Body,
    query: Query
}


type RequireLogin = {
    hash: string
}


export type Run = Uri<{}, RequireLogin & {
    command: string
}>


type Clientify<U extends Uri<any, any>> = {body: U["body"], query: U["query"]}
export type ClientRun = Clientify<Run>;



export type Authorization = Uri<{}, RequireLogin>
