import { Notify } from "@/helpers/notify"

const getMessage = (message) =>
    new Promise((resolve, reject) =>
        message ? resolve({ message }) : reject({ message: `Error : ${message} cant be displayed` })
    )

export const errorHandler = async (fn, success) => {
    try {
        await fn(), Notify(getMessage(success), "success")
    } catch (error) {
        const { message } = await error.json()
        Notify(getMessage(message), "error")
    }
}
