import { defineStore } from 'pinia'
import { Notify } from '@/helpers/notify.helper'
import { api, checkSelected, checkRole, showError, headers } from './utils/admin.util'
// import getJWTFromCookie from '../utils'
import router from '@/router'
import axios from 'axios'

import { jwtExpiresIn, getJWTFromCookie, removeJwtCookie, setJwtCookie } from '@/helpers/jwt.helper'

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
                const { accessToken, ...others } = await Window.$http.post(api.signIn, user)
                if (accessToken) {
                    this.user = others
                    this.accessToken = accessToken
                    if (user.remember) setJwtCookie(accessToken)
                } else throw { message: 'You are not an admin' }
            } catch (error) {
                showError(error)
            }
        },
        async authRemeber() {
            const token = getJWTFromCookie()
            if (token) {
                this.user = await Window.$http.post(api.remember, {}, token)
                this.accessToken = token
                router.push('/admin/dashboard')
            }
        },
        async loadUsers() {
            try {
                const res = await window.$http.get(api.usersPages(this.currentPage), this.accessToken)
                res.forEach((user) => (user.selected = false))
                this.users = res
            } catch (error) {
                Notify(error)
            }
            try {
                this.pages = await window.$http.get(api.allPages, this.accessToken)
            } catch (error) {
                Notify(error, 'error')
            }
        },
        async loadNewUsers() {
            try {
                const { data } = await axios.get(api.usersPages(1), {
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
                const { data } = await axios.get(api.search(user), {
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
                await axios.delete(api.deleteUser(id), {
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
                    api.deleteMultipleUsers,
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
                this.$reset()
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
