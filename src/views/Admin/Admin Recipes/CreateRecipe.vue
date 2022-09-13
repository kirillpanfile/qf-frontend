<template>
    <div class="p-4 dark:bg-gray-900 block sm:flex items-center justify-between">
        <div class="mb-1 w-full">
            <div class="mb-4">
                <h1 class="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-gray-300">Create Recipe</h1>
            </div>

            <CreateRecipe />
        </div>
    </div>
</template>

<script setup>
import { defineAsyncComponent } from "vue"

const CreateRecipe = defineAsyncComponent(() => {
    return import("@/components/pages/Admin/AdminCreateRecipe.vue")
})
</script>
