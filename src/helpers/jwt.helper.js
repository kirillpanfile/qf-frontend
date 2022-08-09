//  * ==============================================================================
//  *
//  * This file is used to create jwt helper
//  *
//  * ==============================================================================

//1h in miliseconds
export const jwtExpiresIn = 1000 * 60 * 60

//TODO to create admin jwtExpiresIn and user jwtExpiresIn = 30 days

/**
 * @description gets jwt from `accessToken` cookie
 * @returns {string} jwt
 */

export const getJWTFromCookie = () => {
    return document.cookie.replace(/(?:(?:^|.*;\s*)accessToken\s*\=\s*([^;]*).*$)|^.*$/, '$1')
}

/**
 * @description sets jwt to `accessToken` cookie
 * @param {string} jwt jwt to be set
 */

export const setJwtCookie = (jwt) => {
    document.cookie = `accessToken=${jwt}; expires=${new Date(Date.now() + jwtExpiresIn).toUTCString()}`
}

/**
 * @description removes jwt from `accessToken` cookie
 */

export const removeJwtCookie = () => {
    document.cookie = 'accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
}

/**
 * @description jwt is a helper for jwt requests, it is used to create a new jwt instance for each request
 * @param {string} token token to be used for setting the accessToken cookie
 */

export const jwt = {
    get: getJWTFromCookie,
    set: setJwtCookie,
    remove: removeJwtCookie,
}
