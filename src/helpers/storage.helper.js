//  * ==============================================================================
//  *
//  * This file is used to help manage the user's session
//  *
//  * ==============================================================================

// * ==============================================================================
// * | admin-user-page-${value} | array of users per page |
// * |=============================================================================
// * |
// * ==============================================================================

//! TODO - add session management
//! TODO - implement with websocket

/**
*   @description Adding one page of users in SessionStorage
*   @param {string} key name of key
*   @param {string} value value of item
*   @returns {void}
*/

export const addToSession = (key, value) => sessionStorage.setItem(key, value)

/**
 *  @description Getting one page of users from SessionStorage
 *  @param {string} key name of key
 *  @returns {string}
 */

export const getFromSession = (key) => sessionStorage.getItem(key)

export const removeFromSession = (key) => sessionStorage.removeItem(key)

export const clearSession = () => sessionStorage.clear()
