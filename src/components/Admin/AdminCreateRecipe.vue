<template>
    <form class="mx-auto flex lg:flex-row gap-4 flex-col w-full">
        <div class="bg-white rounded-md p-6 shadow-sm flex flex-col lg:w-3/4 w-full">
            <label for="title" class="text-md block font-bold mb-2">Title </label>
            <input
                type="text"
                v-model="title.value"
                class="p-2 border rounded-md mb-4 w-full outline-none"
                :class="{
                    'border-red-500': title.valid.value == false,
                }"
                name="title"
                id="title"
            />
            <span v-if="title.valid.message"> {{ title.valid.message }}</span>
            <div class="md:grid block grid-cols-2 gap-8">
                <div class="flex flex-col">
                    <span class="text-md font-bold pb-2">Cover</span>
                    <label for="img" class="bg-slate-100 cursor-pointer rounded-md mb-4 text-center p-6 w-full">
                        <i class="fa-solid fa-photo-film fa-2x mb-3 w-10 h-10 text-gray-400"></i>
                        <p class="mb-2 text-sm text-gray-500">
                            <span class="font-semibold">Click to upload</span> or drag and
                        </p>
                        <p class="text-xs text-gray-500">SVG, PNG, JPG (MAX. 800x400px)</p>
                        <p class="text-md mt-2 text-gray-500">{{ file && file.name }}</p>
                        <input id="img" type="file" class="hidden" @input="(event) => (file = event.target.files[0])" />
                    </label>
                </div>
                <div class="flex flex-col">
                    <label for="ingredients" class="text-md font-bold pb-2">Ingredients</label>
                    <input
                        type="text"
                        v-model="ingredient"
                        class="p-2 border resize-none rounded-md mb-4"
                        id="ingredients"
                        @keyup.enter="addIngredient(ingredient)"
                    />
                    <div class="flex flex-wrap gap-2">
                        <div
                            class="select-none cursor-pointer rounded-lg p-1 text-sm bg-gray-200 text-gray-500"
                            @click="deleteIngredient(index)"
                            v-for="(item, index) in ingredients"
                            :key="index"
                        >
                            {{ item }} x
                        </div>
                    </div>
                </div>
            </div>

            <div class="md:grid block grid-cols-2 gap-8">
                <div class="flex flex-col">
                    <label for="description" class="text-md font-bold pb-2">Description</label>
                    <textarea
                        id="description"
                        v-model="description"
                        cols="30"
                        rows="5"
                        class="p-2 border resize-none rounded-md w-full"
                        required
                    ></textarea>
                    <p class="mb-4 text-sm pt-1 text-gray-500">{{ 120 - description.length }} letters left</p>
                </div>
                <div class="flex flex-col">
                    <label for="category" class="text-md font-bold pb-2">Category</label>
                    <select name="category" class="p-2 border resize-none rounded-md mb-4" id="category" required>
                        <option value="1" selected>Breakfast</option>
                        <option value="2">Lunch</option>
                        <option value="3">Dinner</option>
                    </select>
                    <label for="time" class="text-md font-bold pb-2">Time (minutes)</label>
                    <input
                        v-model="time"
                        type="number"
                        class="p-2 border resize-none rounded-md"
                        name="time"
                        id="time"
                    />
                </div>
            </div>

            <label for="Steps" class="text-md font-bold pb-2">Steps </label>
            <input
                type="text"
                v-model="step"
                class="p-2 border resize-none rounded-md"
                name="Steps"
                id="Steps"
                @keyup.enter="addStep(step)"
            />
            <ul>
                <li class="flex gap-3 mt-2" v-for="(item, index) in steps" :key="index" @click="deleteStep(index)">
                    <div class="text-main font-bold text-md">{{ index + 1 }}</div>
                    <div class="text-main text-md">{{ item }}</div>
                </li>
            </ul>
        </div>

        <div class="bg-white rounded-md p-6 shadow-sm h-max lg:w-80 w-full">
            <div class="flex flex-col">
                <h2 for="title" class="text-md font-bold mb-4 pb-2 border-b w-full">Information</h2>
                <div class="flex justify-between gap-14 mt-4">
                    <h2 class="font-semibold">Created on</h2>
                    <span>{{ date }}</span>
                </div>
                <div class="flex justify-between gap-14 mt-4">
                    <h2 class="font-semibold">Created by</h2>
                    <span>Andrii 123</span>
                </div>
                <div class="flex justify-between mt-4 mb-6">
                    <h2 class="font-semibold">Status</h2>
                    <span class="bg-orange-300 text-white p-1 text-sm">Pending</span>
                </div>
                <h2 for="title" class="text-md font-bold border-b w-full mb-6 pb-2">Internationalization</h2>

                <select name="lang" class="p-2 border resize-none rounded-md mb-4" id="lang" required>
                    <option value="1" selected>English</option>
                    <option value="2">Romanian</option>
                    <option value="3">Russian</option>
                </select>
                <h2 for="title" class="text-md font-bold border-b w-full mb-6 pb-2">Aditional</h2>
                <h2 class="font-semibold">Temp</h2>
                <div class="flex border justify-evenly text-center cursor-pointer rounded-md text-sm mt-4">
                    <div
                        class="py-3 w-full"
                        :class="{
                            'bg-lime text-white': hot,
                        }"
                        @click="hot = true"
                    >
                        Hot
                    </div>
                    <div
                        class="w-full py-3"
                        @click="hot = false"
                        :class="{
                            'bg-blue-500 text-white': !hot,
                        }"
                    >
                        Cold
                    </div>
                </div>
            </div>
            <button type="button" @click="submit(recipe)" class="mt-4 bg-lime w-full text-white p-4 rounded-md">
                Submit
            </button>
        </div>
    </form>
</template>

<script setup>
import { ref, watch, computed, reactive, onMounted } from 'vue'
import useImageMinify from '@/composables/useImageMinify.js'
import { useRecipeStore } from '@/store/recipeStore'
import validator, { createValidator } from '@/helpers/validate.herlper'
const { compressImage, result } = useImageMinify()
const recipeStore = useRecipeStore()

const title = createValidator(),
    description = ref(''),
    ingredients = ref([]),
    image = ref(null),
    steps = ref([]),
    lang = ref('ro'),
    time = ref(null),
    hot = ref(false),
    ingredient = ref(null),
    step = ref(null),
    file = ref(null)

const addIngredient = (ing) => {
    ing.length > 0 && ingredients.push(ing), (ingredient.value = '')
}

const addStep = (value) => {
    value.length > 0 && steps.value.push(value), (step.value = '')
}

const date = computed(() =>
    [pad(new Date().getDate()), pad(new Date().getMonth() + 1), new Date().getFullYear()].join('/')
)

const deleteIngredient = (index) => ingredients.splice(index, 1)
const deleteStep = (index) => steps.value.splice(index, 1)

onMounted(() => {
    validator([
        {
            reference: title,
            rules: {
                min: 5,
                max: 30,
                required: true,
                type: 'string',
            },
        },
    ])
})

const submit = (payload) => {
    // recipeStore.createRecipe(payload)
}
const pad = (num) => num.toString().padStart(2, '0')

watch(
    description,
    (newVal) => newVal.length > 120 && (description.value = description.value.split('').splice(0, 120).join(''))
)

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
