const URL = process.env.VUE_APP_API
// const URL = "http://localhost:3000"

// ============================== Dependencies ================================

const signIn = URL + "/api/auth/signin/admin"
const getPages = URL + "/api/users/pages"
const remember = URL + "/api/auth/remember"
const getAllUsers = (page) => URL + "/api/users/all?page=" + page
const getNewUsers = URL + "/api/users/all?&filters=new&limit=10&populate=roles"
const deleteUser = (id) => URL + "/api/users/delete/" + id
const deleteMultipleUsers = URL + "/api/users/deleteMultiple"
const searchUser = (user) => URL + "/api/users/search/" + user
const getUser = (id) => URL + "/api/users/" + id
const updateUser = (id) => URL + "/api/users/update/" + id //? username, email, picture, roles in body
const getRoles = URL + "/api/users/roles/all"

export const admin = {
    signIn,
    getPages,
    remember,
    getAllUsers,
    getNewUsers,
    deleteUser,
    deleteMultipleUsers,
    searchUser,
    getUser,
    updateUser,
    getRoles,
}

// ============================================================================

/**
 * @description checkRole is a helper for checking if the user has the correct role
 * @param {object} data - data got from the server
 * @returns {boolean} true if data is an object and has at least one property
 */
export const checkRole = (data) =>
    data?.roles?.some((role) => role === "ROLE_SUPER_ADMIN" || role === "ROLE_MODERATOR")

/**
 * @description checkSelected is a helper for checking if the user is selected or not
 * @param {object} user - user object
 * @param {number} id - id of the user
 * @param {boolean} task - if true, it checks if the user is selected, if false, it checks if the user is not selected
 * @returns
 */
export const checkSelected = (user, id, task) => user._id === id && user.selected === task
