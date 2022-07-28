/* 
@@@qf-frontend:post:description@@@
*/

import { reactive, ref } from 'vue'

const post = reactive({
    title: '',
    content: '',
    category: '',
    ingredients: [],
    image: '',
    steps: [],
    category: '',
    time: 0,
    temperature: 'Cold',
})

export function usePost() {
    //post Model

    // TMP categories
    const categories = [
        { id: 1, name: 'Breakfast' },
        { id: 2, name: 'Lunch' },
        { id: 3, name: 'Dinner' },
        { id: 4, name: 'Dessert' },
        { id: 5, name: 'Snack' },
    ]

    //TMP ingredients
    const ingredients = { ...['Tomato', 'Cheese', 'Onion', 'Garlic', 'Parsley'] }

    return {
        post,
        categories,
        ingredients,
    }
}

//Active step
export function useActiveStep() {
    const activeStep = reactive({ index: null, step: null })

    const step = ref('')

    const clearStep = () => {
        post.steps.push(step.value)
        step.value = ''
    }

    const addStep = () => (step.value.length > 0 ? clearStep() : void 0)

    const editStep = (index) => {
        saveStep()
        activeStep.index = index
        activeStep.step = post.steps[index]
    }

    const saveStep = () => {
        post.steps[activeStep.index] = activeStep.step
        activeStep.index = null
        activeStep.step = null
    }

    const deleteStep = (index) => post.steps.splice(index, 1)

    return {
        activeStep,
        step,
        clearStep,
        addStep,
        editStep,
        saveStep,
        deleteStep,
    }
}
