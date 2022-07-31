<template>
    <div v-if="loading" class="h-[100vh] flex items-center"> 
        <app-loader></app-loader>
    </div>
    <div v-else>
        <div class="text-center font-bold text-2xl py-4">Recipes</div> <!--? Title la pagina -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
            <router-link 
                :to="`/admin/recipe/${item._id}`"
                class="w-auto flex rounded-lg overflow-hidden shadow-md hover:z-10"
                v-for="item in recipeStore.recipe"
                :key="item._id"
            > <!--? Card wrapper -->
                <div class="w-[40%]">
                    <img class="w-[100%] h-[100%] object-cover" :src="item.image" alt="recipeImage" /> <!--? Card image -->
                </div>
                <div class="w-[60%] flex flex-col px-4 py-2">
                    <h1 class="font-bold text-lg mb-1">{{ item.langs.ro.title }}</h1> <!--? Card title -->
                    <h2 class="font-light text-sm">{{ item.langs.ro.description }}</h2> <!--? Card description -->
                    <div class="flex justify-between items-center mt-auto">
                        <div class="flex flex-col">
                            <h1 class="font-bold text-center">{{ item.time }}</h1> <!--? Card time -->
                            <small>minutes</small>
                        </div>
                        <div
                            class="px-3 py-1 text-[10px] sm:text-sm md:text-base bg-yellow-300 rounded-md h-max"
                            :class="
                                item.approved == 'pending'
                                    ? 'bg-yellow-300'
                                    : item.approved == 'approved'
                                    ? 'bg-green-300'
                                    : 'bg-red-300'
                            "
                        > 
                            {{ item.approved }} <!--? Card status -->
                        </div>
                        <div class="flex flex-col">
                            <h1 class="font-bold text-center">{{ getTemperature(item) }}</h1> <!--? Card temperature -->
                            <small>temperature</small>
                        </div>
                    </div>
                </div>
            </router-link>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRecipeStore } from '@/store/recipeStore'
import AppLoader from '@/components/UI/AppLoader.vue'
const recipeStore = useRecipeStore()

let loading = ref(true)

const getTemperature = (item) => {
    return item.hot == false ? 'Cold' : 'Hot'
}

onMounted(() => {
    loading.value = true
    recipeStore.getAllRecipes().then(() => loading.value = false)
})
</script>

<style></style>
