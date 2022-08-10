<template>
    <h1 class="my-6 text-2xl font-semibold text-gray-700">Create Recipe</h1>

    <!-- <form class="flex flex-col gap-4">
        <input
            v-model="title"
            type="text"
            class="bg-transparent border-b border-lime pb-2 outline-none"
            placeholder="Title"
        />
        <div class="flex justify-center items-center w-full">
            <label
                for="dropzone-file"
                class="flex flex-col justify-center items-center w-full h-64 rounded-lg border-2 border-lime border-dashed cursor-pointer"
            >
                <div class="flex flex-col justify-center items-center pt-5 pb-6">
                    <i class="fa-solid fa-photo-film fa-2x mb-3 w-10 h-10 text-gray-400"></i>
                    <p class="mb-2 text-sm text-gray-500">
                        <span class="font-semibold">Click to upload</span> or drag and drop
                    </p>
                    <p class="text-xs text-gray-500">SVG, PNG, JPG (MAX. 800x400px)</p>

                    <p class="text-md mt-2 text-gray-500">
                        {{ file && file.name }}
                    </p>
                </div>
                <input
                    id="dropzone-file"
                    type="file"
                    class="hidden"
                    @input="(event) => (file = event.target.files[0])"
                />
            </label>
        </div>
        <textarea
            v-model="description"
            name=""
            id=""
            cols="30"
            rows="5"
            placeholder="Description"
            class="bg-transparent border border-lime p-2 outline-none"
        ></textarea>
        <div>
            <div class="flex flex-row justify-between">
                <div>
                    <input
                        v-model="ingredient"
                        type="text"
                        placeholder="Ingredients"
                        class="bg-transparent border-b border-lime pb-2 outline-none"
                    />
                    <button
                        type="button"
                        class="bg-lime rounded-lg text-white text-lg px-4 py-1"
                        @click="addIngredient(ingredient)"
                    >
                        Enter
                    </button>
                </div>
                <div class="flex flex-wrap gap-x-4 gap-y-2 mt-4">
                    <div
                        class="select-none cursor-pointer rounded-lg text-lg bg-lime text-white px-4 py-1"
                        @click="deleteIngredient(index)"
                        v-for="(item, index) in ingredients"
                        :key="index"
                    >
                        {{ item }}
                    </div>
                </div>

                <div>
                    <input v-model="hot" type="radio" name="temp" :value="true" checked />Hot
                    <input v-model="hot" type="radio" name="temp" :value="false" />Cold
                </div>
                <div>
                    <input v-model="time" type="text" placeholder="time" />
                </div>
            </div>
        </div>
        <textarea v-model="step" name="steps" id="" cols="30" rows="5" placeholder="Steps"></textarea>
        <div>
            <button type="button" class="bg-lime rounded-lg text-white text-lg px-4 py-1" @click="addStep(step)">
                Add step
            </button>
            <ul>
                <li class="flex gap-3" v-for="(item, index) in steps" :key="index" @click="deleteStep(index)">
                    <div class="text-main font-bold text-xl">{{ index + 1 }}</div>
                    <div class="text-main text-xl">{{ item }}</div>
                </li>
            </ul>
        </div>
        <div>
            <input type="radio" name="trans" checked />Automatic translation <input type="radio" name="trans" />Manual
            translation
        </div>
        <button class="bg-lime rounded-lg text-white text-lg px-4 py-1" type="button" @click="submit(recipe)">
            Submit
        </button>
    </form> -->

    <form action="POST" @submit.prevent="submit(recipe)" class="flex flex-row gap-4">
        <!-- Form left side -->
        <div class="w-full bg-white rounded-md p-8 shadow-sm">
            <div class="flex flex-auto gap-8">
                <div class="flex flex-col">
                    <label for="title" class="text-md font-bold pb-2">Title </label>
                    <input
                        type="text"
                        v-model="title"
                        class="p-2 border resize-none rounded-md mb-4"
                        name="title"
                        id="title"
                    />
                    <!-- Image Cover -->
                    <div class="flex gap-8">
                        <div class="flex flex-col">
                            <label class="text-md font-bold pb-2">Cover</label>
                            <label
                                for="dropzone-file"
                                class="border bg-slate-100 h-40 cursor-pointer rounded-md mb-4 flex justify-center items-center text-center w-96"
                            >
                                <div class="pt-5 pb-6">
                                    <i class="fa-solid fa-photo-film fa-2x mb-3 w-10 h-10 text-gray-400"></i>
                                    <p class="mb-2 text-sm text-gray-500">
                                        <span class="font-semibold">Click to upload</span> or drag and drop
                                    </p>
                                    <p class="text-xs text-gray-500">SVG, PNG, JPG (MAX. 800x400px)</p>

                                    <p class="text-md mt-2 text-gray-500">
                                        {{ file && file.name }}
                                    </p>
                                </div>
                                <!-- Image input -->
                                <input
                                    id="dropzone-file"
                                    name="dropzone-file"
                                    type="file"
                                    class="hidden"
                                    @input="(event) => (file = event.target.files[0])"
                                />
                            </label>
                        </div>
                        <div class="w-96 flex flex-col">
                            <label for="ingredients" class="text-md font-bold pb-2">Ingredients</label>
                            <input
                                type="text"
                                v-model="ingredient"
                                class="p-2 border resize-none rounded-md mb-4"
                                name="ingredients"
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
                    <!-- Description  -->
                    <div class="flex gap-8">
                        <div class="flex flex-col w-96">
                            <label for="description" class="text-md font-bold pb-2">Description</label>
                            <textarea
                                name="description"
                                id="description"
                                v-model="description"
                                cols="30"
                                rows="5"
                                class="p-2 border resize-none rounded-md"
                                required
                            ></textarea>
                            <p class="mb-4 text-sm pt-1 text-gray-500">120 words left</p>
                        </div>
                        <div class="flex flex-col w-96">
                            <!--TODO : Sa faci sa lucreze ca la 120 de cuvinte sa se faca border rosu si sa nu poti scrie-->
                            <!-- Categories -->
                            <label for="category" class="text-md font-bold pb-2">Category</label>

                            <select
                                name="category"
                                class="p-2 border resize-none rounded-md mb-4"
                                id="category"
                                required
                            >
                                <option value="1" selected>Breakfast</option>
                                <option value="2">Lunch</option>
                                <option value="3">Dinner</option>
                            </select>
                            <!-- Time -->
                            <label for="time" class="text-md font-bold pb-2">Time (minutes)</label>
                            <input type="number" class="p-2 border resize-none rounded-md" name="time" id="time" />
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
                        <li
                            class="flex gap-3 mt-2"
                            v-for="(item, index) in steps"
                            :key="index"
                            @click="deleteStep(index)"
                        >
                            <div class="text-main font-bold text-md">{{ index + 1 }}</div>
                            <div class="text-main text-md">{{ item }}</div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="w-full bg-white rounded-md p-8 shadow-sm h-max">
            <div class="flex flex-col">
                <h2 for="title" class="text-md font-bold mb-4 pb-2 border-b w-full">Information</h2>
                <div class="flex justify-between mt-4">
                    <h2 class="font-semibold">Created on</h2>
                    <span>{{ date }}</span>
                </div>
                <div class="flex justify-between mt-4">
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
            <button class="mt-4 bg-lime w-full text-white p-4 rounded-md">submit</button>
        </div>
    </form>
</template>

<script setup>
import { ref, watch, computed } from 'vue'

import { toRefs } from 'vue'
import { useRecipe } from '@/composables/useRecipe.js'
const { recipe, utils, addIngredient, addStep, deleteIngredient, deleteStep, submit } = useRecipe()
const { ingredient, step } = toRefs(utils)
const { title, description, time, hot } = toRefs(recipe)
const { steps, ingredients } = recipe

let file = ref(null)

const pad = (num) => num.toString().padStart(2, '0')
const date = computed(() =>
    [pad(new Date().getDate()), pad(new Date().getMonth() + 1), new Date().getFullYear()].join('/')
)

watch(file, (newVal) => newVal && console.log(newVal.name))
</script>
