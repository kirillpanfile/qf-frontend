import cfg from '@/store/config'
import axios from 'axios'
import router from '@/router'
import { checkSelected, checkRole, showError, headers } from './admin.utils'

const adminApi = {
    signIn: `${cfg.URL}/api/auth/signin`,
    allPages: `${cfg.URL}/api/users/pages`,
    deleteMultipleUsers: `${cfg.URL}/api/users/deleteMultiple`,
    usersPages: (page) => `${cfg.URL}/api/users?page=${page}`,
    deleteUser: (id) => `${cfg.URL}/api/users/delete/${id}`,
    search: (payload) => `${cfg.URL}/api/users/search/${payload}`,
}

export default {
    namespaced: true,
    state: {
        accessToken: null,
        user: null,
        users: [],
        pages: null,
        currentPage: 1,
    },
    mutations: {
        authAdmin(state, payload) {
            const { accessToken, ...others } = payload
            state.user = others
            state.accessToken = accessToken
        },
        logoutAdmin(state) {
            state.accessToken = null
            state.user = null
            router.push('/admin-login')
        },
        users(state, payload) {
            state.users = []
            payload.forEach((user) => {
                state.users.push({
                    ...user,
                    selected: false,
                })
            })
        },
        pages(state, payload) {
            state.pages = payload
        },
        setSelectedUser(state, id) {
            state.users.forEach((user) => {
                if (checkSelected(user, id, false)) user.selected = true
                else if (checkSelected(user, id, true)) user.selected = false
            })
        },
        nextPage(state) {
            if (state.currentPage < state.pages) {
                state.users = []
                state.currentPage++
            }
        },
        prevPage(state) {
            if (state.currentPage > 1) {
                state.users = []
                state.currentPage--
            }
        },
        setPage(state, page) {
            state.users = []
            state.currentPage = page
        },
    },
    getters: {
        selectedUsers(state) {
            return state.users.filter((user) => user.selected === true)
        },
    },
    actions: {
        async authAdmin({ commit }, payload) {
            commit('logoutAdmin')
            try {
                const { data } = await axios.post(adminApi.signIn, payload)
                if (checkRole(data)) commit('authAdmin', data)
                else throw { message: 'You are not an admin', code: 'UNA' }
            } catch (error) {
                showError(error)
            }
        },
        async rememberUser(_) {
            try {
                console.log(headers(this.state.admin.accessToken))
                const cookie = await axios.get(`${cfg.URL}/api/auth/remember`, {
                    headers: headers(this.state.admin.accessToken),
                })
                console.log('cookie', cookie)
            } catch (error) {
                showError(error)
            }
        },
        async getUsers({ commit }) {
            try {
                const { data } = await axios.get(adminApi.usersPages(this.state.admin.currentPage), {
                    headers: headers(this.state.admin.accessToken),
                })

                const pages = await axios.get(adminApi.allPages, {
                    headers: headers(this.state.admin.accessToken),
                })
                commit('users', data)
                commit('pages', pages.data)
            } catch (error) {
                showError(error)
            }
        },

        async deleteUser({ commit }, id) {
            try {
                await axios.delete(adminApi.deleteUser(id), {
                    headers: headers(this.state.admin.accessToken),
                })
                commit(
                    'users',
                    this.state.admin.users.filter((user) => user._id !== id)
                )
            } catch (error) {
                showError(error)
            }
        },
        async deleteMultiple({ commit }) {
            const selected = this.getters['admin/selectedUsers'].map((user) => user._id)
            try {
                await axios.delete(adminApi.deleteMultipleUsers, {
                    headers: headers(this.state.admin.accessToken),
                    ids: selected,
                })
                commit(
                    'users',
                    this.state.admin.users.filter((user) => !selected.includes(user._id))
                )
            } catch (error) {
                showError(error)
            }
        },
        async searchUser({ commit }, payload) {
            try {
                const { data } = await axios.get(adminApi.search(payload), {
                    headers: headers(this.state.admin.accessToken),
                })
                commit('users', data)
            } catch (error) {
                showError(error)
            }
        },

        nextPage({ dispatch, commit }) {
            commit('nextPage')
            dispatch('getUsers')
        },
        prevPage({ dispatch, commit }) {
            commit('prevPage')
            dispatch('getUsers')
        },
        setPage({ dispatch, commit }, page) {
            commit('setPage', page)
            dispatch('getUsers')
        },
    },
}
