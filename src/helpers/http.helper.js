//  * ==============================================================================
//  *
//  * This file is used to create a helper for axios requests
//  *
//  * ==============================================================================

import axios from 'axios'

/**
 * @description Creating a new axios instance for each request
 * @param {string} token
 * @returns {AxiosRequestConfig}
 */

const options = (token) => ({
    timeout: 10000,
    timeoutErrorMessage: 'Request timed out',
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'x-access-token': token, //? Authorization header is set to 'x-access-token' : token
    },
})

/**
 * @description Registering global $http on window object
 * @returns {void}
 */
export const init = () => {
    console.log('hello')
    Window.$http = $http
}

/**
 * @description $http is a helper for axios requests, it is used to create a new axios instance for each request
 * @description $http.get is used to make get requests
 * @description $http.post is used to make post requests
 * @description $http.put is used to make put requests
 * @description $http.delete is used to make delete requests
 */

export const $http = {
    /**
     * @param {string} url url to be used for request
     * @param {string} token token to be used for authorization
     * @returns {Promise<AxiosResponse<any, any>>} Promise with axios response
     */

    get: async (url, token) => {
        const { data } = await axios.get(url, options(token))
        console.log(data)
        return data
    },

    /**
     * @param {string} url url to be used for request
     * @param {string} token token to be used for authorization
     * @param {object} data data to be sent in request
     * @returns {Promise<AxiosResponse<any, any>>} Promise with axios response
     */

    post: async (url, body, token) => {
        const { data } = await axios.post(url, body, options(token))
        return data
    },
    /**
     * @param {string} url url to be used for request
     * @param {string} token token to be used for authorization
     * @param {object} data data to be sent in request
     * @returns {Promise<AxiosResponse<any, any>>} Promise with axios response
     */

    put: async (url, body, token) => {
        const { data } = await axios.put(url, body, options(token))
        return data
    },

    /**
     * @param {string} url url to be used for request
     * @param {string} token token to be used for authorization
     * @returns {Promise<AxiosResponse<any, any>>} Promise with axios response
     */

    delete: async (url, token) => {
        const { data } = await axios.delete(url, options(token))
        return data
    },
}

//#sourceMappingURL=http.helper.js.map

//? Making $http global on window object
