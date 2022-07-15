import cfg from '../config'
import axios from 'axios'
import { notify } from '@kyvg/vue3-notification'
const state = {
    accessToken: null,
}
const getters = {}
const mutations = {
    authAdmin(state, payload) {
        state.accessToken = payload.accessToken
        document.cookie = `jwt=${payload.accessToken}; expires=${new Date(
            Date.now() + cfg.jwtExpiresIn * 24 * 60 * 60 * 1000
        ).toUTCString()}`
    },
}

const actions = {
    async authAdmin({ commit }, payload) {
        try {
            const { data } = await axios.post(`${cfg.URL}/api/auth/signin`, payload)
            console.log(data)
            if (data.roles.includes('ROLE_ADMIN')) commit('authAdmin', data)
            else
                throw {
                    message: 'You are not authorized to access this page',
                    code: 'UNAUTHORIZED',
                }
        } catch (error) {
            if (error.code == 'ERR_BAD_REQUEST')
                notify({
                    type: 'error',
                    text: 'Invalid username or password',
                })

            if (error.code == 'UNAUTHORIZED')
                notify({
                    type: 'error',
                    text: error.message,
                })
        }
    },
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions,
}
