import { reactive } from 'vue'
import { useRecipeStore } from '@/store/recipeStore'
const recipeStore = useRecipeStore()

const recipe = reactive({
    title: '',
    description: '',
    steps: [],
    ingredients: [],
    image: 'https://media.sproutsocial.com/uploads/2017/02/10x-featured-social-media-image-size.png',
    lang: 'ro',
    time: null,
    hot: null,
})
const utils = reactive({
    ingredient: null,
    step: null,
})

const addIngredient = (ing) => {
    if (ing.length > 0) {
        recipe.ingredients.push(ing)
        utils.ingredient.value = ''
    }
}

const addStep = (value) => {
    if (value.length > 0) {
        recipe.steps.push(value)
        utils.step.value = ''
    }
}

const deleteIngredient = (index) => recipe.ingredients.splice(index, 1)
const deleteStep = (index) => steps.splice(index, 1)
const submit = (payload) => recipeStore.createRecipe(payload)

export function useRecipe() {
    return {
        recipe,
        utils,
        addIngredient,
        addStep,
        deleteIngredient,
        deleteStep,
        submit,
    }
}
