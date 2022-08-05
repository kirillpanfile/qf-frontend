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

const addToSession = (key, value) => sessionStorage.setItem(key, value)

const getFromSession = (key) => sessionStorage.getItem(key)

const removeFromSession = (key) => sessionStorage.removeItem(key)

const clearSession = () => sessionStorage.clear()
