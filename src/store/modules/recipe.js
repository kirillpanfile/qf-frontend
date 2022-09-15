import { useAdminStore } from "@/store"
import { defineStore } from "pinia"
import { errorHandler, $http } from "@/helpers"

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
        recipes: [],
        currentRecipe: {},
        tags: [],
        categories: [],
        notifications: notifications,
    }),
    getters: {},
    actions: {
        async createRecipe(recipe) {
            await errorHandler(async () => {
                const { data } = await $http.post("/recipes", recipe)
                this.recipes.push(data)
            })
        },

        async getTags() {
            await errorHandler(async () => {
                const data = await $http.get(process.env.VUE_APP_GET_TAGS + "/en")
                this.tags = data
            })
        },
    },
})
