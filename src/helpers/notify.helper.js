import { notify } from '@kyvg/vue3-notification'

/**
 * Working with global Notifications
 * Notify success, error, warning, info
 * @param {string} message message to be displayed
 * @param {string} type type of notification
 * @returns {void} no return
 */

// Send a notification to the client.
export const Notify = (message, type) => {
    try {
        !['success', 'error', 'warning', 'info'].includes(type) ? (type = undefined) : void 0
        if (!type) throw new Error('Notify type is not valid')
        else {
            if (type === 'error') {
                notify({text: message, type: type})
                 console.log('message:', message.json())
            } else { 
                notify({text: message, type: type}) 
            }
        }
    } catch (error) {
        console.error('Error', error)
    }
}
