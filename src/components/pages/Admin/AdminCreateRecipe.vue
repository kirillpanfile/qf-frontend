<template>
    <div class="grid grid-cols-4 grid-rows-4 gap-4">
        <div class="col-span-1 bg-white dark:bg-gray-800 dark:text-gray-300 p-6 rounded-lg shadow-sm">
            <h1 class="text-xl font-bold mb-4">Indexing</h1>
            <VSelect name="category" v-model="recipe.category" size="base" label="Category" />
            <VSelect name="lang" :options="langs" v-model="recipe.lang" size="base" label="Internationalization" />
        </div>
        <div class="col-span-3 row-span-2 bg-white dark:bg-gray-800 dark:text-gray-300 p-6 rounded-lg shadow-sm">
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
            <VInput
                name="Time"
                type="number"
                v-model="recipe.time"
                size="lg"
                placeholder="Prep Time"
                label="Time (minutes)" />

            <div class="flex justify-center items-center w-full col-span-2 rounded-lg shadow-sm">
                <label
                    for="dropzone-file"
                    class="flex flex-col justify-center items-center w-full h-full bg-gray-50 rounded-lg border-2 border-gray-300 border-dashed cursor-pointer dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                    <div class="flex flex-col justify-center items-center pt-5 pb-6">
                        <i class="fa-solid fa-image mb-3 text-3xl text-gray-400"></i>

                        <p class="mb-2 text-sm text-gray-500 dark:text-gray-400">
                            <span class="font-semibold">Click to upload</span> or drag and drop
                        </p>
                        <p class="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                        <!-- create a image with file sent -->
                        {{ recipe.image?.name }}
                    </div>
                    <input id="dropzone-file" type="file" class="hidden" @change="sendImage" />
                </label>
            </div>
        </div>
        <div class="col-span-1 bg-white dark:bg-gray-800 dark:text-gray-300 p-6 rounded-lg shadow-sm">
            <h1 class="text-xl font-bold mb-4">Tags</h1>
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

        <div class="col-span-2 bg-white dark:bg-gray-800 dark:text-gray-300 p-6 rounded-lg shadow-sm">
            <VInput
                name="Ingredients"
                type="text"
                v-model="recipe.ingredients"
                size="lg"
                placeholder="Smetana"
                label="Ingrediens" />
        </div>
        <div class="col-span-2 bg-white dark:bg-gray-800 dark:text-gray-300 p-6 rounded-lg shadow-sm">
            <VInput
                name="Steps"
                type="text"
                v-model="recipe.ingredients"
                size="lg"
                placeholder="Smetana"
                label="Steps" />
        </div>
    </div>
</template>

<script setup>
import { onMounted, reactive, watch } from "vue"
import { VInput, VSelect, VBadge } from "@/components"

import useImageMinify from "@/composables/useImageMinify"

import { useRecipeStore, refs, useAdminStore } from "@/store"

const { getTags } = useRecipeStore()
const { tags } = refs(useRecipeStore())
const { user } = refs(useAdminStore())

onMounted(() => {
    getTags()
    recipe.author = user.value._id
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

const sendImage = (event) => (recipe.image = event.target.files[0])

const selectTag = (tag) => {
    if (recipe.tags.includes(tag._id)) {
        tag.selected = false
        recipe.tags = recipe.tags.filter((item) => item !== tag._id)
    } else {
        tag.selected = true
        recipe.tags.push(tag._id)
    }
}

const { compressImage, result } = useImageMinify()

watch(recipe.image, async (newVal) => {
    if (newVal) {
        await compressImage(newVal)
        recipe.image = result
        // const body = new FormData()
        // body.append("image", result)
        // const response = await fetch("https://api.imgbb.com/1/upload?key=09e7ac26251616a5d0bacfc72ea9ae66", {
        //     method: "POST",
        //     body: body,
        // })
        // console.log(await response.json())
    }
})
</script>
