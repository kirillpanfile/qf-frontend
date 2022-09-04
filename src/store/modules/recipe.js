// import { adminAllRecipes, adminRecipe, adminCreateRecipe, notifications } from "@/store/utils/recipe.utils"
import { $http } from "@/helpers/http"
import { useAdminStore } from "@/store"
import { defineStore } from "pinia"
import { errorHandler } from "../util"

const notifications = [
    {
        username: "andrii123",
        message: "submited a new recipe",
        date: "2020-01-01",
        id: 1,
    },
    {
        username: "hesoyam",
        message: "submited a new recipe",
        date: "2020-01-01",
        id: 2,
    },
    {
        username: "baguvix",
        message: "submited a new recipe",
        date: "2020-01-01",
    },
    {
        username: "TonyStark",
        message: "submited a new recipe",
        date: "2020-01-01",
    },
    {
        username: "John Wick",
        message: "submited a new recipe",
        date: "2020-01-01",
    },
]

export const useRecipeStore = defineStore("recipeStore", {
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
            await errorHandler(
                async function () {
                    const { accessToken } = this.admin
                    this.recipe = await $http.get(adminAllRecipes, accessToken)
                }.bind(this)
            )
        },

        /**
         * @description gets recipe by id
         * @param {*string} id recipe id
         * @returns {Promise<void>}
         */

        async getRecipe(id) {
            await errorHandler(
                async function () {
                    const { accessToken } = this.admin
                    this.currentRecipe = await $http.get(adminRecipe(id), accessToken)
                }.bind(this)
            )
        },

        /**
         * @description creates new recipe
         * @param {object} payload
         * @returns {Promise<void>}
         */

        async createRecipe(payload) {
            await errorHandler(
                async function () {
                    const { accessToken } = this.admin
                    await $http.post(adminCreateRecipe, payload, accessToken)
                }.bind(this)
            )
        },
    },
})
