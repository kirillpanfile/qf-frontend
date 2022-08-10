const URL = process.env.VUE_APP_API
// const URL = 'http://localhost:3000'

// ============================== Dependencies ================================

export const adminSignIn = URL + '/api/admin/signin'
export const adminPages = URL + '/api/admin/pages'
export const rememberAdmin = URL + '/api/auth/remember'
export const adminUsers = (page) => URL + '/api/admin/users?page=' + page
export const adminDeleteUser = (id) => URL + '/api/admin/delete/' + id
export const adminDeleteMultipleUsers = URL + '/api/admin/deleteMultiple'
export const adminSearchUser = (user) => URL + '/api/admin/search/' + user

// ============================================================================

/**
 * @description checkRole is a helper for checking if the user has the correct role
 * @param {object} data - data got from the server
 * @returns {boolean} true if data is an object and has at least one property
 */
export const checkRole = (data) => data?.roles?.some((role) => role === 'ROLE_SUPER_ADMIN' || role === 'ROLE_MODERATOR')

/**
 * @description checkSelected is a helper for checking if the user is selected or not
 * @param {object} user - user object
 * @param {number} id - id of the user
 * @param {boolean} task - if true, it checks if the user is selected, if false, it checks if the user is not selected
 * @returns
 */
export const checkSelected = (user, id, task) => user._id === id && user.selected === task
