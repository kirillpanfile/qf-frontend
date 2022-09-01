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

        async updateTask(_id, payload) {
            this.tasks.find((item) => {
                if (item._id === _id) {
                    Window.$http.put(
                        process.env.VUE_APP_UPDATE_TASK + item._id,payload
                    )
                     //! Garbaj
                    item.description = payload.description
                    item.title = payload.title
                    item.user = payload.user
                    item.flag = payload.flag

                }
            })

        },

        async setTaskStatus(id, status){
            this.tasks.find((item) => {
                if (item._id === id) {
                    Window.$http.put(
                        process.env.VUE_APP_UPDATE_TASK + item._id,
                        {
                            status: status,
                        }
                    )
                    item.status = status
                }
            })
        }
    },
})
