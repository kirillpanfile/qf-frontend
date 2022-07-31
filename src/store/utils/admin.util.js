import { notifyError } from '@/utils/notify'
import cfg from '../../store/config'

export const adminApi = {
    signIn: `${cfg.URL}/api/auth/signin`,
    allPages: `${cfg.URL}/api/users/pages`,
    deleteMultipleUsers: `${cfg.URL}/api/users/deleteMultiple`,
    remember: `${cfg.URL}/api/auth/remember`,
    usersPages: (page) => `${cfg.URL}/api/users?page=${page}`,
    deleteUser: (id) => `${cfg.URL}/api/users/delete/${id}`,
    search: (payload) => `${cfg.URL}/api/users/search/${payload}`,
    allRecipes: `${cfg.URL}/api/recipes/all`,
    recipe: (id) => `${cfg.URL}/api/recipes/${id}`,
    createRecipe: `${cfg.URL}/api/recipes/admin/create`,
    deleteRecipe: (id) => `${cfg.URL}/api/recipes/${id}`
}

export const checkRole = (data) => data?.roles?.some((role) => role === 'ROLE_ADMIN' || role === 'ROLE_MODERATOR')
export const checkSelected = (user, id, task) => user._id === id && user.selected === task
export const showError = (error) => {
    switch (error.code) {
        case 'ERR_BAD_REQUEST':
            notifyError('Invalid credentials')
            break
        case 'UNA':
            notifyError('You dont have permission to do this')
            break
        default:
            notifyError(`Something went wrong: ${error.message}`)
            break
    }
}

export const headers = (token) => ({
    'Content-Type': 'application/json',
    Accept: 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'x-access-token': token,
})
