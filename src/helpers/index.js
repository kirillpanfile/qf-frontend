//  * ==============================================================================
//  *
//  * This file is used to create  helpers
//  *
//  * ==============================================================================

import { notify } from "@kyvg/vue3-notification"
import { ref, reactive } from "vue"
/**
 * @description Creating a new axios instance for each request
 * @param {string} token
 * @returns {string} method
 * @returns {AxiosRequestConfig}
 */

const options = (method) => ({
    method: method,
    credentials: "include",
    headers: {
        "Content-Type": "application/json",
    },
})

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
        if (res.status === 200) {
            return await res.json()
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
     * @returns {Promise<AxiosResponse<any, any>>} Promise with axios response
     */

    get: async (url) => {
        const helper = {
            url,
            options: options("GET"),
        }

        const data = await fetchData(helper)
        return data
    },

    /**
     * @param {string} url url to be used for request
     * @param {object} data data to be sent in request
     * @returns {Promise<AxiosResponse<any, any>>} Promise with axios response
     */

    post: async (url, body) => {
        const helper = {
            url,
            body,
            options: options("POST"),
        }
        const data = await fetchData(helper)
        return data
    },
    /**
     * @param {string} url url to be used for request
     * @param {object} data data to be sent in request
     * @returns {Promise<AxiosResponse<any, any>>} Promise with axios response
     */

    put: async (url, body) => {
        const helper = {
            url,
            body,
            options: options("PUT"),
        }
        const { data } = await fetchData(helper)
        return data
    },

    /**
     * @param {string} url url to be used for request
     * @returns {Promise<AxiosResponse<any, any>>} Promise with axios response
     */

    delete: async (url) => {
        const helper = {
            url,
            options: options("DELETE"),
        }
        const { data } = await fetchData(helper)
        return data
    },
}

// ================================== Notify ================================== //

/**
 *
 * @param {String} type - Type of notification
 * @returns {Boolean} - Returns true if type is valid
 */

const typeValidation = (type) => !["success", "error", "warning", "info"].includes(type)

/**
 *
 * @param {String} msg - Message to be displayed
 * @param {String} type - Type of notification
 * @returns {Object} - Returns notification object
 */

export const Notify = async (msg, type) => {
    const { message } = await msg
    try {
        if (!typeValidation) throw new Error("Notify type is not valid")
        notify({ text: message, type: type })
    } catch (error) {
        console.error("Error", error)
    }
}

/**
 *
 * @param {String} message - Message to be displayed
 * @returns {Promise} - Returns notification object
 */

const getMessage = (message) =>
    new Promise((resolve, reject) =>
        message && resolve({ message })
        // message ? resolve({ message }) : reject({ message: `Error : ${message} cant be displayed` })
    )

// ================================== Error Handlers ================================== //

/**
 *
 * @param {Function} fn - Function to be executed
 * @param {String} success - Success message
 * @param {String} error - Error message
 * @returns {Function} - Returns function
 */
export const errorHandler = async (fn, success) => {
    try {
        await fn(), Notify(getMessage(success), "success")
    } catch (error) {
        const { message } = await error.json()
        Notify(getMessage(message), "error")
    }
}

//= ================================ Reactive ================================= //

/**
 *
 * @param {Any} atribute - Atribute to be reactive
 * @param {Number} count - total count of created reactive variables
 * @returns
 */

const createRef = (atribute, count) => {
    const refs = []
    for (let i = 0; i < count; i++) {
        if (typeof atribute === "object" && atribute !== null && !Array.isArray(atribute)) {
            console.log("object")
            refs.push(reactive(atribute))
        } else refs.push(ref(atribute))
    }
    return refs
}

export function createRefs(atribute, count) {
    const refs = []
    const isArray = Array.isArray(atribute)
    switch (true) {
        case isArray:
            if (atribute.length) {
                atribute.forEach((item) => {
                    if (typeof item === "object" && item !== null) refs.push(reactive(item))
                    else refs.push(ref(item))
                })
            } else {
                refs.push(...createRef(atribute, count))
            }

            break
        default:
            refs.push(...createRef(atribute, count))
    }
    return refs
}
