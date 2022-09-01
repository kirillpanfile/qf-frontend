import { defineStore } from "pinia"
import { Notify } from "@/helpers/notify.helper"
import { task } from "./utils/taskUtils"

export const useTaskStore = defineStore("taskStore", {
    state: () => ({
        tasks: [],
    }),

    actions: {
        async createTask(payload) {
            try {
                const res = await Window.$http.post(task.createTask, payload)
                this.tasks = [...this.tasks, res]
                Notify("Task successfully created", "success")
            } catch (error) {
                Notify(error)
            }
        },

        async getTasks() {
            try {
                this.tasks = await Window.$http.get(task.getTasks)
            } catch (error) {
                Notify(error)
            }
        },

        async updateTask(_id, status) {
            console.log(_id)
            this.tasks.find((item) => {
                if (item._id === _id) {
                    const updatedTask = Window.$http.put(
                        process.env.VUE_APP_UPDATE_TASK + item._id,
                        {
                            status: status,
                        }
                    )
                    item.status = status
                }
            })

            console.log(task)
        },
    },
})
