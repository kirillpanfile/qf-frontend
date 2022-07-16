import cfg from '@/store/config'
import axios from 'axios'
import router from '@/router'
import { notifyError } from '@/utils/notify'

const checkRole = (data) => data?.roles?.some((role) => role == 'ROLE_ADMIN' || role == 'ROLE_MODERATOR')

export default {
    namespaced: true,
    state: {
        accessToken: null,
        user: null,
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
    },
    actions: {
        async authAdmin({ commit }, payload) {
            commit('logoutAdmin')
            try {
                const { data } = await axios.post(`${cfg.URL}/api/auth/signin`, payload)
                if (checkRole(data)) commit('authAdmin', data)
                else throw { message: 'You are not an admin', code: 'UNA' }
            } catch (error) {
                if (error.code == 'ERR_BAD_REQUEST') notifyError('Invalid username or password')
                if (error.code == 'UNA') notifyError(error.message)
            }
        },
    },
}
