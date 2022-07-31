<template>
    <section>
        <div class="h-[100vh] flex items-center" v-if="loading">
            <!--? Loader -->
            <app-loader></app-loader>
        </div>
        <div class="mt-16 flex gap-5 text-main font-Open" v-else>
            <div class="flex flex-col gap-3">
                <!--? Left side of card -->
                <div class="max-w-[596px]">
                    <img class="w-auto h-auto object-cover" src="@/assets/cookies.jpg" alt="recipeImage" />
                    <!--? Recipe image -->
                </div>
                <div class="flex gap-4 items-center">
                    <h1 class="font-extrabold text-3xl">{{ currentRecipeLang.title }}</h1>
                    <!--? Title -->
                    <div
                        class="flex items-center gap-1 rounded-md outline outline-1 text-xs px-3 py-1 font-bold outline-red-600"
                        v-if="currentRecipe.hot"
                    >
                        <!--? Temperature indicator -->
                        <h1>HOT</h1>
                        <i class="fa-solid fa-fire"></i>
                    </div>
                </div>
                <div class="text-desc leading-5">
                    <!--? Description-->
                    {{ currentRecipeLang.description }}
                </div>
                <div class="flex items-center gap-2 "> <!--? Steps-->
                    <h1 class="font-extrabold text-3xl">Preparation</h1>
                    <div class="w-full h-[1px] bg-main"></div>
                    <div class="flex items-center gap-1 w-max">
                        <i class="fa-solid fa-clock"></i>
                        <div class="shrink-0 w-max">{{currentRecipe.time}} mins</div>
                    </div>
                </div>
                <ul>
                    <li class="flex gap-3 ml-4 mb-2" v-for="(item, index) in currentRecipeLang.steps" :key="currentRecipeLang._id">
                        <div class="font-extrabold">{{ index + 1 }}</div>
                        <div>{{ item }}</div>
                    </li>
                </ul>
            </div> 

            <div class="flex flex-col"><!--? Right side of card -->
                <div class="flex flex-wrap gap-[15px] font-Mont gap-x-4 gap-y-2">
                    <div class="px-[10px] py-1 text-gray bg-[#E7E8E9] text-[12px] font-bold rounded-md">Desert</div> <!--TODO Category -->
                </div>
                <div class="flex text-main items-center gap-3 mt-3">
                    <h1 class="font-bold text-3xl">Ingredients</h1>
                    <i class="fa-solid fa-seedling text-2xl text-lime"></i>
                </div>
                <ul class="ml-4 mt-2">
                    <li class="flex items-center gap-1" v-for="item in currentRecipeLang.ingredients" :key="item._id"> <!--? Ingredients -->
                        <i class="fa-regular fa-circle-check font-light text-2xl text-lime"></i>
                        <div class="font-extrabold font-Manrope ">{{ item }}</div>
                    </li>
                </ul>
                <div class="flex items-center p-3 rounded-md bg-favorite text-favText gap-2 cursor-pointer w-max mt-4"> <!--? Favorite button -->
                    <i class="fa-regular text-2xl fa-heart"></i>
                    <!--TODO <i class="fa-solid text-xl fa-heart"></i> onclick sa faca inima filled -->
                    <div class="font-Manrope font-semibold">Add to favourites</div>
                </div>
                <div class="flex items-center gap-3 mt-6"> <!--? Featured header -->
                    <h1 class="font-bold text-3xl">Featured</h1>
                    <i class="fa-solid text-2xl fa-crown text-lime"></i>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
import { useRoute } from 'vue-router'
import { useRecipeStore } from '@/store/recipeStore'
import { onMounted, ref } from 'vue'
import { storeToRefs } from 'pinia'
import AppLoader from '@/components/UI/AppLoader.vue'

const route = useRoute()
const recipeStore = useRecipeStore()
const { currentRecipeLang, currentRecipe } = storeToRefs(recipeStore)
const { getRecipe } = recipeStore

let loading = ref(true)

onMounted(() => {
    loading.value = true
    getRecipe(route.params.id).then(() => (loading.value = false))
})
</script>
