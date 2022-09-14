<template>
    <div class="grid grid-cols-4 gap-4">
        <div class="col-span-1 bg-white dark:bg-gray-800 dark:text-gray-300 p-6 rounded-lg shadow-sm">
            <h1 class="text-xl font-bold mb-4">Aditional information</h1>
            <VSelect
                name="tags"
                type="tags"
                v-model="recipe.title"
                multiple
                size="base"
                placeholder="Cool Cookies..."
                label="Tags" />
            <VSelect
                name="category"
                type="category"
                v-model="recipe.title"
                multiple
                size="base"
                placeholder="Cool Cookies..."
                label="Category" />
        </div>
        <div class="col-span-3 bg-white dark:bg-gray-800 dark:text-gray-300 p-6 rounded-lg shadow-sm">
            <h1 class="text-xl font-bold mb-4">General information</h1>
            <VInput
                name="title"
                type="text"
                v-model="recipe.title"
                size="lg"
                placeholder="Cool Cookies..."
                label="Title" />
            <VInput
                name="description"
                type="text"
                v-model="recipe.description"
                size="lg"
                placeholder="Cool Cookies..."
                label="Description" />
        </div>
    </div>
</template>

<script setup>
// import { createRefs } from "@/helpers"
import { onMounted, reactive, watch } from "vue"
import { VInput, VSelect } from "@/components"

import { useRecipeStore, refs } from "@/store"

const { getTags } = useRecipeStore()

onMounted(() => {
    getTags()
})

const recipe = reactive({
    author: null,
    title: "",
    description: "",
    time: null,
    image: null,
    ingredients: [],
    steps: [],
    tags: [],
    categories: [],
})

// watch(file, async (newVal) => {
//     if (newVal) {
//         compressImage(newVal)

//         const body = new FormData()
//         body.append('image', result)
//         const response = await fetch('https://api.imgbb.com/1/upload?key=09e7ac26251616a5d0bacfc72ea9ae66', {
//             method: 'POST',
//             body: body,
//         })
//         console.log(await response.json())
//     }
// })
</script>
