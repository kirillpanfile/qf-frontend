import { notify } from "@kyvg/vue3-notification"

const typeValidation = (type) => !["success", "error", "warning", "info"].includes(type)

export const Notify = async (msg, type) => {
    const { message } = await msg
    try {
        if (!typeValidation) throw new Error("Notify type is not valid")
        notify({ text: message, type: type })
    } catch (error) {
        console.error("Error", error)
    }
}
