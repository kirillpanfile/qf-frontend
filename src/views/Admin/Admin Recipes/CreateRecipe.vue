<template>
    <form class="mt-6 grid grid-cols-2 gap-5">
        <input v-model="title" type="text" placeholder="Title">
        <input @input="" type="file">
        <textarea v-model="description" name="" id="" cols="30" rows="5" placeholder="Description"></textarea>
        <div>
            <div class="flex gap-4">
                <input v-model="ingredient" type="text" placeholder="Ingredients">
                <button type="button" class="bg-lime rounded-lg text-white text-lg px-4 py-1" @click="addIngredient(ingredient)">Enter</button>
            </div>
            <div class="flex flex-wrap gap-x-4 gap-y-2 mt-4">
                <div class="select-none cursor-pointer rounded-lg text-lg bg-lime text-white px-4 py-1" @click="deleteIngredient(index)" v-for="(item, index) in ingredients" :key="index">{{item}}</div>
            </div>  
        </div>
        <div>
            <input v-model="hot" type="radio" name="temp" :value="true" checked>Hot
            <input v-model="hot" type="radio" name="temp" :value="false">Cold
        </div>
        <div>
            <input v-model="time" type="text" placeholder="time"> 
        </div>
        <textarea v-model="step" name="steps" id="" cols="30" rows="5" placeholder="Steps"></textarea>
        <div>
            <button type="button" class="bg-lime rounded-lg text-white text-lg px-4 py-1" @click="addStep(step)">Add step</button>
            <ul>
                <li class="flex gap-3" v-for="(item,index) in steps" :key="index" @click="deleteStep(index)">
                    <div class="text-main font-bold text-xl">{{index + 1}}</div>
                    <div class="text-main text-xl">{{item}}</div>
                </li>
            </ul>
        </div>
        <div>
            <input type="radio" name="trans" checked>Automatic translation
            <input type="radio" name="trans">Manual translation
        </div>
        <button class="bg-lime rounded-lg text-white text-lg px-4 py-1" type="button" @click="submit(payload)">Submit</button>
    </form>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRecipeStore } from '@/store/recipeStore'
const recipeStore = useRecipeStore()

let title = ref('')
let ingredient = ref('')
let description = ref('')
let image = ref('https://media.sproutsocial.com/uploads/2017/02/10x-featured-social-media-image-size.png')
let time = ref('')
let hot = ref(true)
const ingredients = reactive([])

const steps = reactive([])
let step = ref('')

const payload = reactive({
    title: title,
    description: description,
    steps: steps,
    ingredients: ingredients,
    lang: 'ro',
    image: image,
    time: time,
    hot: hot
})

const addIngredient = (ing) => {
    if (ing.length > 0) {
        ingredients.push(ing)
        ingredient.value = ''
    }
}

const addStep = (value) => {
    if(value.length > 0){
        steps.push(value)
        step.value = ''
    }
}

const deleteIngredient = (index) =>{
    ingredients.splice(index,1)
}

const deleteStep = (index) => {
    steps.splice(index,1)
}

const submit = (payload) =>{
    recipeStore.createRecipe(payload)
}
</script>
