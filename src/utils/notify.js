import { notify } from '@kyvg/vue3-notification'

export const notifyError = (message) => {
    notify({
        type: 'error',
        text: message,
    })
}

export const notifySuccess = (message) => {
    notify({
        type: 'success',
        text: message,
    })
}

export const notifyWarning = (message) => {
    notify({
        type: 'warning',
        text: message,
    })
}

export const notifySimple = (message) => {
    notify({
        text: message,
    })
}
