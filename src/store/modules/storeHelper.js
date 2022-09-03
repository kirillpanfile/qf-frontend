import { Notify } from "@/helpers/notify.helper"

const generateNotify = (message) =>
    new Promise((resolve, reject) => {
        try {
            if (message) {
                resolve({
                    message,
                })
            }
        } catch (error) {
            reject(error)
        }
    })

export const errorHandler = async (fn, success) => {
    try {
        await fn()
        Notify(generateNotify(success), "success")
    } catch (error) {
        const { message } = await error.json()
        Notify(generateNotify(message), "error")
    }
}
