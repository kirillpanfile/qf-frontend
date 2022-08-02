<template>
    <form class="mt-6 grid grid-cols-2 gap-5">
        <input type="text" placeholder="Title">
        <input type="file">
        <textarea name="" id="" cols="30" rows="5" placeholder="Description"></textarea>
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
            <input type="radio" name="temp" checked>Hot
            <input type="radio" name="temp">Cold
        </div>
        <div>
            <input type="text" placeholder="time"> 
        </div>
        <textarea v-model="step" name="steps" id="" cols="30" rows="5" placeholder="Steps"></textarea>
        <div>
            <button type="button" class="bg-lime rounded-lg text-white text-lg px-4 py-1" @click="addStep(step)">Add step</button>
            <ul>
                <li class="flex gap-3" v-for="(item,index) in steps" :key="index">
                    <div class="text-main font-bold text-xl">{{index + 1}}</div>
                    <div class="text-main text-xl">{{item}}</div>
                </li>
            </ul>
        </div>
        <div>
            <input type="radio" name="trans" checked>Automatic translation
            <input type="radio" name="trans">Manual translation
        </div>
        <button class="bg-lime rounded-lg text-white text-lg px-4 py-1" type="submit">Submit</button>
    </form>
</template>

<script setup>
import { ref, reactive } from 'vue'

let ingredient = ref('')
const ingredients = reactive([])

const steps = reactive([])
let step = ref('')

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
</script>
