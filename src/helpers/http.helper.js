//  * ==============================================================================
//  *
//  * This file is used to create a helper for axios requests
//  *
//  * ==============================================================================

import axios from "axios"

/**
 * @description Creating a new axios instance for each request
 * @param {string} token
 * @returns {string} method
 * @returns {AxiosRequestConfig}
 */

const options = (token, method) => ({
    method: method,
    credentials: "include",
    headers: {
        "Content-Type": "application/json",
        "x-access-token": token, // Authorization header is set to 'x-access-token' : token
    },
})

/**
 * @description Registering global $http on window object
 * @returns {void}  void
 */

export const init = () => (Window.$http = $http)

/**
 * @description fetch request helper
 * @param {string} url url to be used for request
 * @param {string} body  body to be used for request
 * @param {string} options options to be used for request
 * @returns {Promise<AxiosResponse<any, any>>} Promise with axios response
 */

const fetchData = async ({ url, body, options }) => {
    try {
        // Ger requests by method type (GET, POST, PUT, DELETE)
        let res = null

        if (options.method !== "GET" || options.method !== "HEAD")
            res = await fetch(url, { ...options, body: JSON.stringify(body) })
        else res = await fetch(url, options)

        // Return response if status is 200
        console.log(res)
        if (res.status === 200) {
            return res.json()
        }
        // Return error if status is not 200
        return Promise.reject(res)
    } catch (error) {
        return error
    }
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
        const helper = {
            url,
            options: options(token, "GET"),
        }

        const data = await fetchData(helper)
        return data
    },

    /**
     * @param {string} url url to be used for request
     * @param {string} token token to be used for authorization
     * @param {object} data data to be sent in request
     * @returns {Promise<AxiosResponse<any, any>>} Promise with axios response
     */

    post: async (url, body, token) => {
        const helper = {
            url,
            body,
            options: options(token, "POST"),
        }
        const data = await fetchData(helper)
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
