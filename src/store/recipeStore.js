import { adminAllRecipes, adminRecipe, adminCreateRecipe, notifications } from '@/store/utils/recipe.utils'
import { useAdminStore } from '@/store/adminStore'
import { Notify } from '@/helpers/notify.helper'
import { defineStore } from 'pinia'

export const useRecipeStore = defineStore('recipeStore', {
    state: () => ({
        recipe: [],
        currentRecipe: {},
        admin: useAdminStore(),
        notifications: notifications,
    }),
    getters: {
        newNotifications() {
            return this.notifications.slice(0, 10)
        },
        /**
         * @description get the recipe by language that is needed
         * @returns {object} recipe object
         */
        currentRecipeLang() {
            const { langs, ...rest } = this.currentRecipe
            return { ...rest, ...langs?.ro }
        },
    },
    actions: {
        /**
         * @description gets all recipes
         * @returns {Promise<void>}
         */

        async getAllRecipes() {
            try {
                const { accessToken } = this.admin
                this.recipe = await Window.$http.get(adminAllRecipes, accessToken)
            } catch (error) {
                Notify(error)
            }
        },

        /**
         * @description gets recipe by id
         * @param {*string} id recipe id
         * @returns {Promise<void>}
         */

        async getRecipe(id) {
            try {
                const { accessToken } = this.admin
                this.currentRecipe = await Window.$http.get(adminRecipe(id), accessToken)
            } catch (error) {
                Notify(error)
            }
        },

        /**
         * @description creates new recipe
         * @param {object} payload
         * @returns {Promise<void>}
         */

        async createRecipe(payload) {
            try {
                const { accessToken } = this.admin
                await Window.$http.post(adminCreateRecipe, payload, accessToken)
            } catch (error) {
                Notify(error)
            }
        },
    },
})
