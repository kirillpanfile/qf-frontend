import { Notify } from "@/helpers/notify.helper"

export const errorHandler = async (fn, success) => {
    try {
        await fn()
        if (success) {
            Notify(success, "success")
        }
    } catch (error) {
        Notify(error)
    }
}
