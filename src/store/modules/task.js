import { defineStore } from "pinia"
import { $http, errorHandler } from "@/helpers"

export const useTaskStore = defineStore("taskStore", {
    state: () => ({
        tasks: [],
        flags: [
            { name: "Low", _id: "Low" },
            { name: "Normal", _id: "Normal" },
            { name: "High", _id: "High" },
            { name: "Urgent", _id: "Urgent" },
        ],
        lists: [
            { name: "To Do", _id: "To Do" },
            { name: "In Progress", _id: "In Progress" },
            { name: "In Review", _id: "In Review" },
            { name: "Done", _id: "Done" },
        ],
    }),

    actions: {
        async createTask(payload) {
            await errorHandler(
                async function () {
                    const res = await $http.post(process.env.VUE_APP_CREATE_TASK, payload)
                    this.tasks = [...this.tasks, res]
                }.bind(this),
                "Task created successfully"
            )
        },

        async getTasks() {
            await errorHandler(
                async function () {
                    this.tasks = await $http.get(process.env.VUE_APP_GET_TASKS)
                }.bind(this),
                "Tasks loaded successfully"
            )
        },

        async updateTask(_id, payload) {
            await errorHandler(
                async function () {
                    this.tasks.find((item) => {
                        if (item._id === _id) {
                            $http.put(process.env.VUE_APP_UPDATE_TASK + item._id, payload)
                            Object.assign(item, payload)
                        }
                    })
                }.bind(this),
                "Task updated successfully"
            )
        },

        async setTaskStatus(id, status) {
            await errorHandler(
                async function () {
                    this.tasks.find((item) => {
                        if (item._id === id) {
                            $http.put(process.env.VUE_APP_UPDATE_TASK + item._id, {
                                status: status,
                            })
                            item.status = status
                        }
                    })
                }.bind(this)
            )
        },

        async deleteTask(id) {
            await errorHandler(
                async function () {
                    $http.delete(process.env.VUE_APP_DELETE_TASK + id)
                    this.tasks = this.tasks.filter((el) => el._id !== id)
                }.bind(this),
                "Task Deleted"
            )
        },
    },
})
