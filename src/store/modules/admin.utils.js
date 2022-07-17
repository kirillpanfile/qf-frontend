import { notifyError } from '@/utils/notify'

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
