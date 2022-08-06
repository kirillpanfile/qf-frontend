import { notify } from '@kyvg/vue3-notification'

const errStatus = {
    400: 'Oops, something went wrong',
    401: 'You are not authorized to access this resource',
    403: 'You are not authorized to access this resource',
    404: 'The resource you are looking for is not found',
    500: 'Looks like we have a internal server error',
    502: 'Looks like the server is down',
    503: 'Looks like the server is sleeping',
    504: 'Looks like the server is overloaded',
}

/**
 * Working with global Notifications
 * Notify success, error, warning, info
 * @param {string} message message to be displayed
 * @param {string} type type of notification
 * @returns {void} no return
 */

export const Notify = (message, type) => {
    const status = message?.response?.status
    try {
        !['success', 'error', 'warning', 'info'].includes(type) && (type = undefined)
        if (!type) throw new Error('Notify type is not valid')
        status ? notify({ text: errStatus[status], type: 'error' }) : notify({ type: type, text: message })
    } catch (error) {
        notify({ type: 'error', text: error }), console.error('globals.js line 28', error)
    }
}
