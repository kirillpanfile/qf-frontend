import { defineStore } from 'pinia'
import { adminApi, showError, headers } from './utils/admin.util'
import { useAdminStore } from '@/store/adminStore'
import axios from 'axios'

export const useRecipeStore = defineStore('recipeStore', {
    state: () => ({
        recipe: [],
        currentRecipe: {},
        admin: useAdminStore(),
        notifications: [
            {
                username: 'andrii123',
                message: 'submited a new recipe',
                date: '2020-01-01',
                id: 1,
            },
            {
                username: 'hesoyam',
                message: 'submited a new recipe',
                date: '2020-01-01',
                id: 2,
            },
            {
                username: 'baguvix',
                message: 'submited a new recipe',
                date: '2020-01-01',
            },
            {
                username: 'TonyStark',
                message: 'submited a new recipe',
                date: '2020-01-01',
            },
            {
                username: 'John Wick',
                message: 'submited a new recipe',
                date: '2020-01-01',
            },
        ],
    }),
    getters: {
        newNotifications() {
            return this.notifications.slice(0, 10)
        },
        currentRecipeLang() {
            return this.currentRecipe.langs.ro
        },
    },
    actions: {
        async getAllRecipes() {
            //? Functia care returneaza TOATE recetele
            try {
                const { accessToken } = this.admin
                const { data } = await axios.get(adminApi.allRecipes, {
                    headers: headers(accessToken),
                })
                this.recipe = data
            } catch (e) {
                showError(e)
            }
        },

        async getRecipe(id) {
            //? Functia care returneaza o recete dupa ID
            try {
                const { accessToken } = this.admin
                const { data } = await axios.get(adminApi.recipe(id), {
                    headers: headers(accessToken),
                })
                this.currentRecipe = data
            } catch (e) {
                showError(e)
            }
        },
    },
})
