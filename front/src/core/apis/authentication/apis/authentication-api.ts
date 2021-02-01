/* tslint:disable */
/* eslint-disable */
/**
 * Api documentation
 * No description provided (generated by Swagger Codegen https://github.com/swagger-api/swagger-codegen)
 *
 * OpenAPI spec version: 1.0.0
 *
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */
import globalAxios, {AxiosInstance, AxiosPromise} from 'axios';
import {Configuration} from '../configuration';
// Some imports not used depending on template conditions
// @ts-ignore
import {BASE_PATH, BaseAPI, COLLECTION_FORMATS, RequestArgs, RequiredError} from '../base';
import {Body, Body1, PostLoginInitRequest, PostLoginModel, PostLoginModelWithSalt, PostLoginRequest} from '../models';

/**
 * AuthenticationApi - axios parameter creator
 * @export
 */
export const AuthenticationApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         *
         * @param {Body1} [body]
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        authenticationDeleteToken: async (body?: Body1, options: any = {}): Promise<RequestArgs> => {
            const localVarPath = `/core/authentication/valid`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, 'https://example.com');
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = {method: 'DELETE', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            localVarHeaderParameter['Content-Type'] = 'application/json';

            const query = new URLSearchParams(localVarUrlObj.search);
            for (const key in localVarQueryParameter) {
                query.set(key, localVarQueryParameter[key]);
            }
            for (const key in options.query) {
                query.set(key, options.query[key]);
            }
            localVarUrlObj.search = (new URLSearchParams(query)).toString();
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            const needsSerialization = (typeof body !== "string") || localVarRequestOptions.headers['Content-Type'] === 'application/json';
            localVarRequestOptions.data = needsSerialization ? JSON.stringify(body !== undefined ? body : {}) : (body || "");

            return {
                url: localVarUrlObj.pathname + localVarUrlObj.search + localVarUrlObj.hash,
                options: localVarRequestOptions,
            };
        },
        /**
         *
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        authenticationGet: async (options: any = {}): Promise<RequestArgs> => {
            const localVarPath = `/core/authentication`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, 'https://example.com');
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = {method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            const query = new URLSearchParams(localVarUrlObj.search);
            for (const key in localVarQueryParameter) {
                query.set(key, localVarQueryParameter[key]);
            }
            for (const key in options.query) {
                query.set(key, options.query[key]);
            }
            localVarUrlObj.search = (new URLSearchParams(query)).toString();
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: localVarUrlObj.pathname + localVarUrlObj.search + localVarUrlObj.hash,
                options: localVarRequestOptions,
            };
        },
        /**
         *
         * @param {PostLoginRequest} [body]
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        authenticationLogin: async (body?: PostLoginRequest, options: any = {}): Promise<RequestArgs> => {
            const localVarPath = `/core/authentication/login`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, 'https://example.com');
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = {method: 'POST', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            localVarHeaderParameter['Content-Type'] = 'application/json';

            const query = new URLSearchParams(localVarUrlObj.search);
            for (const key in localVarQueryParameter) {
                query.set(key, localVarQueryParameter[key]);
            }
            for (const key in options.query) {
                query.set(key, options.query[key]);
            }
            localVarUrlObj.search = (new URLSearchParams(query)).toString();
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            const needsSerialization = (typeof body !== "string") || localVarRequestOptions.headers['Content-Type'] === 'application/json';
            localVarRequestOptions.data = needsSerialization ? JSON.stringify(body !== undefined ? body : {}) : (body || "");

            return {
                url: localVarUrlObj.pathname + localVarUrlObj.search + localVarUrlObj.hash,
                options: localVarRequestOptions,
            };
        },
        /**
         *
         * @param {PostLoginInitRequest} [body]
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        authenticationLoginInit: async (body?: PostLoginInitRequest, options: any = {}): Promise<RequestArgs> => {
            const localVarPath = `/core/authentication/login/init`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, 'https://example.com');
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = {method: 'POST', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            localVarHeaderParameter['Content-Type'] = 'application/json';

            const query = new URLSearchParams(localVarUrlObj.search);
            for (const key in localVarQueryParameter) {
                query.set(key, localVarQueryParameter[key]);
            }
            for (const key in options.query) {
                query.set(key, options.query[key]);
            }
            localVarUrlObj.search = (new URLSearchParams(query)).toString();
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            const needsSerialization = (typeof body !== "string") || localVarRequestOptions.headers['Content-Type'] === 'application/json';
            localVarRequestOptions.data = needsSerialization ? JSON.stringify(body !== undefined ? body : {}) : (body || "");

            return {
                url: localVarUrlObj.pathname + localVarUrlObj.search + localVarUrlObj.hash,
                options: localVarRequestOptions,
            };
        },
        /**
         *
         * @param {Body} [body]
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        authenticationValidToken: async (body?: Body, options: any = {}): Promise<RequestArgs> => {
            const localVarPath = `/core/authentication/valid`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, 'https://example.com');
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = {method: 'POST', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            localVarHeaderParameter['Content-Type'] = 'application/json';

            const query = new URLSearchParams(localVarUrlObj.search);
            for (const key in localVarQueryParameter) {
                query.set(key, localVarQueryParameter[key]);
            }
            for (const key in options.query) {
                query.set(key, options.query[key]);
            }
            localVarUrlObj.search = (new URLSearchParams(query)).toString();
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            const needsSerialization = (typeof body !== "string") || localVarRequestOptions.headers['Content-Type'] === 'application/json';
            localVarRequestOptions.data = needsSerialization ? JSON.stringify(body !== undefined ? body : {}) : (body || "");

            return {
                url: localVarUrlObj.pathname + localVarUrlObj.search + localVarUrlObj.hash,
                options: localVarRequestOptions,
            };
        },
    }
};

/**
 * AuthenticationApi - functional programming interface
 * @export
 */
export const AuthenticationApiFp = function (configuration?: Configuration) {
    return {
        /**
         *
         * @param {Body1} [body]
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async authenticationDeleteToken(body?: Body1, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<void>> {
            const localVarAxiosArgs = await AuthenticationApiAxiosParamCreator(configuration).authenticationDeleteToken(body, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         *
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async authenticationGet(options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<void>> {
            const localVarAxiosArgs = await AuthenticationApiAxiosParamCreator(configuration).authenticationGet(options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         *
         * @param {PostLoginRequest} [body]
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async authenticationLogin(body?: PostLoginRequest, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<PostLoginModel>> {
            const localVarAxiosArgs = await AuthenticationApiAxiosParamCreator(configuration).authenticationLogin(body, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         *
         * @param {PostLoginInitRequest} [body]
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async authenticationLoginInit(body?: PostLoginInitRequest, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<PostLoginModelWithSalt>> {
            const localVarAxiosArgs = await AuthenticationApiAxiosParamCreator(configuration).authenticationLoginInit(body, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         *
         * @param {Body} [body]
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async authenticationValidToken(body?: Body, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<void>> {
            const localVarAxiosArgs = await AuthenticationApiAxiosParamCreator(configuration).authenticationValidToken(body, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
    }
};

/**
 * AuthenticationApi - factory interface
 * @export
 */
export const AuthenticationApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    return {
        /**
         *
         * @param {Body1} [body]
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        authenticationDeleteToken(body?: Body1, options?: any): AxiosPromise<void> {
            return AuthenticationApiFp(configuration).authenticationDeleteToken(body, options).then((request) => request(axios, basePath));
        },
        /**
         *
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        authenticationGet(options?: any): AxiosPromise<void> {
            return AuthenticationApiFp(configuration).authenticationGet(options).then((request) => request(axios, basePath));
        },
        /**
         *
         * @param {PostLoginRequest} [body]
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        authenticationLogin(body?: PostLoginRequest, options?: any): AxiosPromise<PostLoginModel> {
            return AuthenticationApiFp(configuration).authenticationLogin(body, options).then((request) => request(axios, basePath));
        },
        /**
         *
         * @param {PostLoginInitRequest} [body]
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        authenticationLoginInit(body?: PostLoginInitRequest, options?: any): AxiosPromise<PostLoginModelWithSalt> {
            return AuthenticationApiFp(configuration).authenticationLoginInit(body, options).then((request) => request(axios, basePath));
        },
        /**
         *
         * @param {Body} [body]
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        authenticationValidToken(body?: Body, options?: any): AxiosPromise<void> {
            return AuthenticationApiFp(configuration).authenticationValidToken(body, options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * AuthenticationApi - object-oriented interface
 * @export
 * @class AuthenticationApi
 * @extends {BaseAPI}
 */
export class AuthenticationApi extends BaseAPI {
    /**
     *
     * @param {Body1} [body]
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof AuthenticationApi
     */
    public authenticationDeleteToken(body?: Body1, options?: any) {
        return AuthenticationApiFp(this.configuration).authenticationDeleteToken(body, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     *
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof AuthenticationApi
     */
    public authenticationGet(options?: any) {
        return AuthenticationApiFp(this.configuration).authenticationGet(options).then((request) => request(this.axios, this.basePath));
    }

    /**
     *
     * @param {PostLoginRequest} [body]
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof AuthenticationApi
     */
    public authenticationLogin(body?: PostLoginRequest, options?: any) {
        return AuthenticationApiFp(this.configuration).authenticationLogin(body, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     *
     * @param {PostLoginInitRequest} [body]
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof AuthenticationApi
     */
    public authenticationLoginInit(body?: PostLoginInitRequest, options?: any) {
        return AuthenticationApiFp(this.configuration).authenticationLoginInit(body, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     *
     * @param {Body} [body]
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof AuthenticationApi
     */
    public authenticationValidToken(body?: Body, options?: any) {
        return AuthenticationApiFp(this.configuration).authenticationValidToken(body, options).then((request) => request(this.axios, this.basePath));
    }
}
