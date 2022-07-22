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
    },
})
