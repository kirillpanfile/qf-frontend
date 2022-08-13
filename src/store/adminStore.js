import { jwt } from '@/helpers/jwt.helper'
import { defineStore } from 'pinia'
import { Notify } from '@/helpers/notify.helper'
import { addToSession, getFromSession } from '@/helpers/storage.helper'
import router from '@/router'

import {
    adminSignIn,
    adminPages,
    rememberAdmin,
    adminUsers,
    adminDeleteUser,
    adminDeleteMultipleUsers,
    adminSearchUser,
    checkSelected,
} from '@/store/utils/admin.util'

export const useAdminStore = defineStore('adminStore', {
    state: () => ({ accessToken: null, user: null, users: [], newUsers: [], pages: null, currentPage: 1 }),
    getters: {
        selectedUsers: (state) => state.users.filter((user) => user.selected === true),
    },
    actions: {
        async authAdmin(user) {
            try {
                const { accessToken, ...others } = await Window.$http.post(adminSignIn, user)
                if (accessToken) {
                    ;(this.user = others), (this.accessToken = accessToken), user.remember && jwt.set(accessToken)
                    Notify('You are now logged in', 'success')
                } else throw { message: 'You are not an admin' }
            } catch (error) {
                Notify(error, 'error')
            }
        },
        async authRemeber() {
            jwt.get() && (this.user = await Window.$http.post(rememberAdmin, {}, jwt.get())),
                (this.accessToken = jwt.get()),
                router.push('/admin/dashboard')
            // Notify('You are now logged in', 'success')
        },
        async loadUsers() {
            try {
                getFromSession(`Page ${this.currentPage}`) &&
                    (this.users = JSON.parse(getFromSession(`Page ${this.currentPage}`)))

                const res = await Window.$http.get(adminUsers(this.currentPage), this.accessToken)
                if (getFromSession(`Page ${this.currentPage}`) != JSON.stringify(res)) {
                    //? Checks if current page of users matches sessionStorage
                    res.forEach((user) => (user.selected = false))
                    this.users = res
                    addToSession(`Page ${this.currentPage}`, JSON.stringify(res)) //? Add page of users in sessionStorage
                }
                Notify('Users successfully loaded', 'success')
            } catch (error) {
                Notify(error, 'error')
            }
            try {
                this.pages = await Window.$http.get(adminPages, this.accessToken)
                Notify('Pages came from server', 'success')
            } catch (error) {
                Notify(error, 'error')
            }
        },
        async loadNewUsers() {
            try {
                const res = await Window.$http.get(adminUsers(1), this.accessToken)
                res.forEach((user) => (user.selected = false))
                res.length = 8
                if (getFromSession(`Page ${this.currentPage}`) != JSON.stringify(res))
                    //? Checks if current page of users matches sessionStorage
                    addToSession(`Page ${this.currentPage}`, JSON.stringify(res)) //? Add page of users in sessionStorage
                this.newUsers = JSON.parse(getFromSession(`Page ${this.currentPage}`)) //! Inserting Session data into state
                Notify('New users successfully loaded', 'success')
            } catch (error) {
                Notify(error, 'error')
            }
        },
        selectUser(id) {
            this.users.forEach((user) => {
                checkSelected(user, id, false)
                    ? (user.selected = true)
                    : checkSelected(user, id, true) && (user.selected = false)
            })
        },
        async searchUser(user) {
            try {
                const res = await Window.$http.get(adminSearchUser(user), this.accessToken)
                res.forEach((user) => (user.selected = false)), (this.users = res)
            } catch (error) {
                Notify(error, 'error')
            }
        },
        async deleteUser(id) {
            try {
                await Window.$http.delete(adminDeleteUser(id), this.accessToken)
                ;(this.users = this.users.filter((user) => user._id !== id)), Notify('User deleted', 'success')
            } catch (error) {
                Notify(error, 'error')
            }
        },
        async deleteMultiple() {
            try {
                const selectedUsers = this.selectedUsers.map((user) => user._id)
                if (selectedUsers.length === 0) throw { message: 'No user selected' }

                await Window.$http.post(adminDeleteMultipleUsers, { ids: selectedUsers }, this.accessToken)
                this.users = this.users.filter((user) => !selectedUsers.includes(user._id))
                Notify('Users deleted', 'success')
            } catch (error) {
                Notify(error, 'error')
            }
        },
        logOut() {
            this.$reset(), jwt.remove(), router.push('/admin-login'), Notify('You are logged out', 'success')
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
