import { defineStore } from "pinia"
import { Notify } from "@/helpers/notify.helper"
import router from "@/router"
import { errorHandler } from "./storeHelper"

export const useAdminStore = defineStore("adminStore", {
    state: () => ({
        user: null,
        users: [],
        newUsers: [],
        pages: null,
        currentPage: 1,
        roles: null,
        admins: null,
    }),
    getters: {
        selectedUsers: (state) => state.users.filter((user) => user.selected === true),
    },
    actions: {
        async authAdmin(user) {
            await errorHandler(
                async function () {
                    this.user = await Window.$http.post(
                        process.env.VUE_APP_SIGNIN_ADMIN,
                        user
                    )
                }.bind(this),
                "You are successfully logged in"
            )
        },
        async authRemeber() {
            await errorHandler(
                async function () {
                    this.user = await Window.$http.get(
                        process.env.VUE_APP_SIGNIN_REMEMBER_ADMIN
                    )
                    router.push("/admin/dashboard")
                }.bind(this)
            )
        },
        async loadUsers() {
            await errorHandler(
                async function () {
                    this.users = await Window.$http.get(
                        process.env.VUE_APP_GET_ALL_USERS + "?page=" + this.currentPage
                    )
                    Notify("Users successfully loaded", "success")
                }.bind(this)
            )
            await errorHandler(
                async function () {
                    this.pages = await Window.$http.get(process.env.VUE_APP_GET_PAGES)
                    Notify("Pages came from server", "success")
                }.bind(this)
            )
        },
        async loadNewUsers() {
            await errorHandler(
                async function () {
                    this.newUsers = await Window.$http.get(
                        process.env.VUE_APP_GET_NEW_USERS
                    )
                    Notify("New users successfully loaded", "success")
                }.bind(this)
            )
        },
        selectUser(id) {
            this.users.forEach((user) => {
                checkSelected(user, id, false)
                    ? (user.selected = true)
                    : checkSelected(user, id, true) && (user.selected = false)
            })
        },
        async searchUser(user) {
            await errorHandler(
                async function () {
                    const res = await Window.$http.get(
                        process.env.VUE_APP_SEARCH_USERS + user
                    )
                    res.forEach((user) => (user.selected = false)), (this.users = res)
                }.bind(this)
            )
        },
        async deleteUser(id) {
            await errorHandler(
                async function () {
                    await Window.$http.delete(process.env.VUE_APP_DELETE_USER + id)(
                        (this.users = this.users.filter((user) => user._id !== id))
                    )
                    Notify("User deleted", "success")
                }.bind(this)
            )
        },
        async deleteMultiple() {
            await errorHandler(
                async function () {
                    const selectedUsers = this.selectedUsers.map((user) => user._id)
                    if (selectedUsers.length === 0) throw { message: "No user selected" }

                    await Window.$http.post(process.env.VUE_APP_DELETE_MULTIPLE_USERS, {
                        ids: selectedUsers,
                    })
                    this.users = this.users.filter(
                        (user) => !selectedUsers.includes(user._id)
                    )
                    Notify("Users deleted", "success")
                }.bind(this)
            )
        },
        async getRoles() {
            await errorHandler(
                async function () {
                    this.roles = await Window.$http.get(process.env.VUE_APP_GET_ALL_ROLES)
                    Notify("Roles successfully loaded", "success")
                }.bind(this)
            )
        },
        async editUser({ username, email, roles, id }) {
            await errorHandler(
                async function () {
                    const updatedUser = await Window.$http.put(
                        process.env.VUE_APP_UPDATE_USER + id,
                        {
                            username,
                            email,
                            roles,
                        }
                    )
                    const userIndex = this.newUsers.findIndex((user) => user._id === id)
                    this.newUsers[userIndex] = updatedUser
                }.bind(this)
            )
        },
        async getAdmins() {
            await errorHandler(
                async function () {
                    this.admins = await Window.$http.get(
                        process.env.VUE_APP_GET_ALL_ADMINS
                    )
                    Notify("Admins successfully loaded", "success")
                }.bind(this)
            )
        },

        async logOut() {
            await errorHandler(
                async function () {
                    await Window.$http.delete(process.env.VUE_APP_LOGOUT)
                    this.$reset()
                    router.push("/admin-login")
                }.bind(this)
            )
        },
        nextPage() {
            this.currentPage < this.pages && this.currentPage++, this.loadUsers()
        },
        prevPage() {
            this.currentPage > 1 && this.currentPage--, this.loadUsers()
        },
        setPage(e) {
            ;(this.currentPage = e), this.loadUsers()
        },
    },
})
