import { errorHandler, $http } from "@/helpers"
import { defineStore } from "pinia"
import router from "@/router"

export const useAdminStore = defineStore("adminStore", {
    state: () => ({
        user: null,
        users: [],
        newUsers: [],
        pages: null,
        currentPage: 1,
        roles: [],
        admins: null,
    }),
    getters: {
        selectedUsers: (state) => state.users.filter((user) => user.selected === true),
    },
    actions: {
        async authAdmin(user) {
            await errorHandler(
                async function () {
                    this.user = await $http.post(process.env.VUE_APP_SIGNIN_ADMIN, user)
                }.bind(this),
                "You are successfully logged in"
            )
        },
        async authRemeber() {
            await errorHandler(
                async function () {
                    this.user = await $http.get(process.env.VUE_APP_SIGNIN_REMEMBER_ADMIN)
                    const path = localStorage.getItem("lastPath")
                    if (path)
                        if (path == "/admin-login") router.push("/admin/dashboard")
                        else {
                            router.push(path), localStorage.removeItem("lastPath")
                        }
                    else router.push("/admin/dashboard")
                }.bind(this)
            )
        },
        async loadUsers() {
            await errorHandler(
                async function () {
                    this.users = await $http.get(
                        process.env.VUE_APP_GET_ALL_USERS + "?populate=roles&page=" + this.currentPage
                    )
                }.bind(this),
                "Users successfully loaded"
            )
            await errorHandler(
                async function () {
                    this.pages = await $http.get(process.env.VUE_APP_GET_PAGES)
                }.bind(this),
                "Pages came from server"
            )
        },
        async loadNewUsers() {
            await errorHandler(
                async function () {
                    this.newUsers = await $http.get(process.env.VUE_APP_GET_NEW_USERS)
                }.bind(this),
                "New users successfully loaded"
            )
        },
        selectUser(id) {
            this.users.forEach((user) => { 
                if (user._id == id) {
                    user.selected = !user.selected ? true : false
                }
            })
        },
        async searchUser(user) {
            await errorHandler(
                async function () {
                    if(user = '' )
                        this.users = sessionStorage.getItem(`Page ${this.currentPage}`, this.users)
                    const res = await $http.get(process.env.VUE_APP_SEARCH_USERS + user)
                    sessionStorage.setItem(`Page ${this.currentPage}`,this.users)
                    res.forEach((user) => (user.selected = false)), (this.users = res)
                }.bind(this)
            )
        },
        async deleteUser(id) {
            await errorHandler(
                async function () {
                    await $http.delete(process.env.VUE_APP_DELETE_USER + id)(
                        (this.users = this.users.filter((user) => user._id !== id))
                    )
                }.bind(this),
                "User deleted"
            )
        },
        async deleteMultiple() {
            await errorHandler(
                async function () {
                    const selectedUsers = this.selectedUsers.map((user) => user._id)
                    await $http.delete(process.env.VUE_APP_DELETE_MULTIPLE_USERS, {
                        ids: selectedUsers,
                    })
                    this.users = this.users.filter((user) => !selectedUsers.includes(user._id))
                }.bind(this),
                `${this.selectedUsers.length } Users deleted`
            )
        },
        async getRoles() {
            await errorHandler(
                async function () {
                    this.roles = await $http.get(process.env.VUE_APP_GET_ALL_ROLES)
                }.bind(this)
            ),
                "Roles successfully loaded"
        },
        async editUser({ username, email, roles, _id }) {
            await errorHandler(
                async function () {
                    const updatedUser = await $http.put(process.env.VUE_APP_UPDATE_USER + _id, {
                        username,
                        email,
                        roles,
                    })
                    const userIndex = this.newUsers.findIndex((user) => user._id === _id)
                    this.newUsers[userIndex] = updatedUser
                }.bind(this),
                "User successfully updated"
            )
        },
        async getAdmins() {
            await errorHandler(
                async function () {
                    this.admins = await $http.get(process.env.VUE_APP_GET_ALL_ADMINS)
                }.bind(this),
                "Admins successfully loaded"
            )
        },

        async logOut() {
            await errorHandler(
                async function () {
                    await $http.delete(process.env.VUE_APP_LOGOUT)
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
