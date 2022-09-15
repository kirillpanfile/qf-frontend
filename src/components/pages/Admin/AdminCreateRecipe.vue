<template>
    <div class="grid grid-cols-4 gap-4">
        <div class="col-span-1 bg-white dark:bg-gray-800 dark:text-gray-300 p-6 rounded-lg shadow-sm">
            <h1 class="text-xl font-bold mb-4">Indexing</h1>
            <VSelect name="category" v-model="recipe.category" size="base" label="Category" />
            <VSelect name="lang" :options="langs" v-model="recipe.lang" size="base" label="Internationalization" />
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
        <div class="col-span-3 bg-white dark:bg-gray-800 dark:text-gray-300 p-6 rounded-lg shadow-sm">
            <h1 class="text-xl font-bold mb-4">Filters</h1>
            <div>
                <h2 class="mb-2">Tags</h2>
                <VBadge
                    v-for="(item, index) in tags"
                    :key="index"
                    @click="selectTag(item)"
                    :class="{
                        'bg-lime dark:bg-lime text-white': item.selected,
                        'bg-gray-200  text-black': !item.selected,
                    }"
                    class="mr-2 mb-2">
                    {{ item.tag }}
                </VBadge>

                <h2 class="mb-2 mt-4">Tags</h2>
                <VBadge
                    v-for="(item, index) in tags"
                    :key="index"
                    @click="selectTag(item)"
                    :class="{
                        'bg-lime dark:bg-lime text-white': item.selected,
                        'bg-gray-200  text-black': !item.selected,
                    }"
                    class="mr-2 mb-2">
                    {{ item.tag }}
                </VBadge>
            </div>
        </div>
        <div class="col-span-1 bg-white dark:bg-gray-800 dark:text-gray-300 p-6 rounded-lg shadow-sm">
            <h1 class="text-xl font-bold mb-4">Aditional information</h1>
            <VSelect name="category" v-model="recipe.category" size="base" label="Category" />
            <VSelect name="lang" :options="langs" v-model="recipe.lang" size="base" label="Internationalization" />
        </div>
    </div>
</template>

<script setup>
// import { createRefs } from "@/helpers"
import { onMounted, reactive, watch } from "vue"
import { VInput, VSelect, VBadge } from "@/components"

import { useRecipeStore, refs } from "@/store"

const { getTags } = useRecipeStore()
const { tags } = refs(useRecipeStore())

onMounted(() => {
    getTags()
})

const langs = [
    { _id: "en", name: "English" },
    { _id: "ru", name: "Russian" },
    { _id: "ro", name: "Romanian" },
]

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
    lang: "en",
})

const selectTag = (tag) => {
    if (recipe.tags.includes(tag._id)) {
        tag.selected = false
        recipe.tags = recipe.tags.filter((item) => item !== tag._id)
    } else {
        tag.selected = true
        recipe.tags.push(tag._id)
    }
}

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
