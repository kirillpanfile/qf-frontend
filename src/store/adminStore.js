import { defineStore } from 'pinia'
import { notifySuccess } from '../utils/notify'
import { adminApi, checkSelected, checkRole, showError, headers } from './utils/admin.util'
import router from '@/router'
import axios from 'axios'

export const useAdminStore = defineStore('adminStore', {
    state: () => ({
        accessToken: null,
        user: null,
        users: [],
        newUsers: [],
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
        async loadNewUsers() {
            try {
                const { data } = await axios.get(adminApi.usersPages(1), {
                    headers: headers(this.accessToken),
                })
                data.forEach((user) => (user.selected = false))
                this.newUsers = data
            } catch (error) {
                showError(error)
            }
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
        async deleteUser(id) {
            try {
                await axios.delete(adminApi.deleteUser(id), {
                    headers: headers(this.accessToken),
                })
                this.users = this.users.filter((user) => user._id !== id)
                notifySuccess('User deleted')
            } catch (error) {
                showError(error)
            }
        },
        async deleteMultiple() {
            try {
                const selectedUsers = this.selectedUsers.map((user) => user._id)
                if (selectedUsers.length === 0) throw { message: 'No user selected', code: 'NOS' }

                await axios.post(
                    adminApi.deleteMultipleUsers,
                    { ids: selectedUsers },
                    { headers: headers(this.accessToken) }
                )
                this.users = this.users.filter((user) => !selectedUsers.includes(user._id))
            } catch (error) {
                showError(error)
            }
        },
        logOut() {
            try {
                this.accessToken = null
                this.user = null
                this.users = []
                this.pages = null
                this.currentPage = 1
                router.push('/admin-login')
                notifySuccess('You are logged out')
            } catch (error) {
                showError(error)
            }
        },
        nextPage() {
            this.currentPage < this.pages ? this.currentPage++ : null
            this.loadUsers()
        },
        prevPage() {
            this.currentPage > 1 ? this.currentPage-- : null
            this.loadUsers()
        },
        setPage(page) {
            this.currentPage = page
            this.loadUsers()
        },
    },
})
