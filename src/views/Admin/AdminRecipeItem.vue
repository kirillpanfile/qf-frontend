<template>
    <section>
        <div class="h-[100vh] flex items-center" v-if="loading">
            <!--? Loader -->
            <app-loader></app-loader>
        </div>
        <div class="mt-16 flex gap-5 text-main font-Open" v-else>

            <div class="flex flex-col gap-3"> <!--? Left side of card -->
                <div class="max-w-[596px]">
                    <img class="w-auto h-auto object-cover" src="@/assets/cookies.jpg" alt="recipeImage"> <!--? Recipe image -->
                </div>
                <div class="flex gap-4 items-center ">
                    <h1 class="font-extrabold text-3xl">{{ data.langs.ro.title }}</h1> <!--? Title -->
                    <div class="flex items-center gap-1 rounded-md outline outline-1 text-xs px-3 py-1 font-bold outline-red-600" v-if="data.hot"> <!--? Temperature indicator -->
                        <h1>HOT</h1>
                        <i class="fa-solid fa-fire"></i>
                    </div>
                </div>
                <div class="text-desc leading-5"> <!--? Description-->
                    {{data.langs.ro.description}}
                </div>
                <div class="flex items-center gap-2"> <!--? Steps-->
                    <h1 class="font-extrabold text-3xl">Preparation</h1>
                    <div class="w-full h-[1px] bg-main"></div>
                    <div class="flex items-center gap-1 w-max">
                        <i class="fa-solid fa-clock"></i>
                        <div class="shrink-0">{{data.time}} mins</div>
                    </div>
                </div>
            </div> 

            <div class="flex flex-col gap-3"><!--? Right side of card -->

            </div>
            <!-- {{ refStore.currentRecipe }} -->
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
const refStore = storeToRefs(recipeStore)
const data = refStore.currentRecipe.value

let loading = ref(true)

onMounted(() => {
    loading.value = true
    recipeStore.getRecipe(route.params.id).then(() => (loading.value = false))
})
</script>

