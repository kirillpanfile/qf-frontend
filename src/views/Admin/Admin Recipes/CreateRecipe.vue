<template>
    <div class="p-4 dark:bg-gray-900 block sm:flex items-center justify-between">
        <div class="mb-1 w-full">
            <div class="mb-4">
                <VBreadcrumb :routes="breadcrumbs" />
                <h1 class="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-gray-300">Create Recipe</h1>
            </div>

            <CreateRecipe />
        </div>
    </div>
</template>

<script setup>
import { defineAsyncComponent } from "vue"
import { VBreadcrumb } from "@/components"

const breadcrumbs = [
    { name: "Admin", link: "/admin" },
    { name: "Recipes", link: "/admin/recipes" },
    { name: "Create", link: "/admin/recipes/create" },
]

const CreateRecipe = defineAsyncComponent(() => {
    return import("@/components/pages/Admin/AdminCreateRecipe.vue")
})
</script>
