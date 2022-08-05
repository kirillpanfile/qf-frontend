import { notify } from '@kyvg/vue3-notification'

/**
 * Working with global Notifications
 * Notify success, error, warning, info
 * @param {string} message message to be displayed
 * @param {string} type type of notification
 * @returns {void} no return
 */

// ============================================================

//TODO error validation

// status code 400 is error
// status code 401 is unauthorized
// status code 403 is forbidden
// status code 404 is not found
// status code 500 is internal server error
// status code 502 is bad gateway
// status code 503 is service unavailable
// status code 504 is gateway timeout

/* 
? When the server returns a status code that is not 2xx, the response body is an error object.
? if status is not 2xx force the type to be error and override the message to the coresponding status code

! EX : if status is 400, the message is "Oops, something went wrong"
! EX : if status is 401, the message is "You are not authorized to access this resource"
! EX : if status is 403, the message is "You are not authorized to access this resource"
! EX : if status is 404, the message is "The resource you are looking for is not found"
! EX : if status is 500, the message is "Looks like we have a internal server error"
! EX : if status is 502, the message is "Looks like the server is down"
! EX : if status is 503, the message is "Looks like the server is sleeping"
! EX : if status is 504, the message is "Looks like the server is overloaded"

*/

export const Notify = (message, type, err) => {
    try {
        !['success', 'error', 'warning', 'info'].includes(type) ? (type = undefined) : void 0
        if (!type) throw new Error('Notify type is not valid')
        else
            notify({
                //! THIS is the notification that is displayed on the screen
                type: type || 'success',
                text: message,
            })
    } catch (error) {
        //? Error handling is done in the catch block
        console.error('🚀 ~ file: globals.js ~ line 77 ~ notify ~ error', error)
    }
}
