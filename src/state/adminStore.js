import { defineStore } from 'pinia'
import { notifySuccess } from '../utils/notify'
import { adminApi, checkSelected, checkRole, showError, headers } from './utils/admin.util'
import axios from 'axios'

export const useAdminStore = defineStore('adminStore', {
    state: () => ({
        accessToken: null,
        user: null,
        users: [],
        pages: null,
        currentPage: 1,
    }),
    getters: {
        selectedUsers: (state) => state.users.filter((user) => user.selected === true),
    },
    actions: {
        async authAdmin(user) {
            try {
                const { data } = await axios.post(adminApi.signIn, user)
                const { accessToken, ...others } = data
                if (checkRole(data)) {
                    this.user = others
                    this.accessToken = accessToken
                } else throw { message: 'You are not an admin', code: 'UNA' }
                notifySuccess('You are logged in')
            } catch (error) {
                showError(error)
            }
        },
        async loadUsers() {
            try {
                const { data } = await axios.get(adminApi.usersPages(this.currentPage), {
                    headers: headers(this.accessToken),
                })
                data.forEach((user) => (user.selected = false))
                this.users = data
            } catch (error) {
                showError(error)
            }
            try {
                const { data } = await axios.get(adminApi.allPages, {
                    headers: headers(this.accessToken),
                })
                this.pages = data
            } catch (error) {}
        },
        selectUser(id) {
            this.users.forEach((user) => {
                if (checkSelected(user, id, false)) user.selected = true
                else if (checkSelected(user, id, true)) user.selected = false
            })
        },
        async searchUser(user) {
            try {
                const { data } = await axios.get(adminApi.search(user), {
                    headers: headers(this.accessToken),
                })
                data.forEach((user) => (user.selected = false))
                this.users = data
            } catch (error) {
                showError(error)
            }
        },
        async deleteMultiple() {
            try {
                const selectedUsers = this.selectedUsers.map((user) => user._id)
                console.log(selectedUsers)
                if (selectedUsers.length === 0) throw { message: 'No user selected', code: 'NOS' }

                const { data } = await axios.delete(adminApi.deleteMultipleUsers, {
                    headers: headers(this.accessToken),
                    ids: selectedUsers,
                })
                console.log(data)
            } catch (error) {
                showError(error)
            }
        },
        nextPage() {
            this.currentPage < this.pages ? this.currentPage++ : void 0
            this.loadUsers()
        },
        prevPage() {
            this.currentPage > 1 ? this.currentPage-- : void 0
            this.loadUsers()
        },
        setPage(page) {
            this.currentPage = page
            this.loadUsers()
        },
    },
})
