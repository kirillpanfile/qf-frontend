const URL = process.env.VUE_APP_API
// const URL = "http://localhost:3000"

export const task = {
    createTask: URL + "/api/tasks/create",
    getTasks: URL + "/api/tasks/all",
}
