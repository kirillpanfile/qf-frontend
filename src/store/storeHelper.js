import { Notify } from "@/helpers/notify.helper"

export const errorHandler = async (fn, success) => {
    try {
        await fn()
        Notify(success, 'success')
    } catch (error) {
        Notify(error, 'error')
    }
}
