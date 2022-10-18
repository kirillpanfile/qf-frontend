<template>
    <main class="pt-6 px-4">
        <VBreadcrumb :routes="breadcrumbs" />
        <div class="mb-6">
            <h1 class="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-gray-300">Create Recipe</h1>
        </div>
        <div class="w-full grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-4">
            <admin-block title="Recipe Information" description="Basic recipe data" size="2xl:col-span-2" h="mobile">
                <template #body>
                    <div class="mt-4">
                        <VInput
                            v-model="recipe.title"
                            size="base"
                            label="Recipe Title"
                            placeholder="Title"
                            name="recipeTitle" />

                        <VInput
                            v-model="recipe.description"
                            size="base"
                            label="Recipe Description"
                            placeholder="Description"
                            name="recipeDescription" />

                        <TreeSelect :data="tags" by="tag" v-model="recipe.tags" />

                        <VSelect label="Tags" name="tags" />
                        <VInput size="base" label="Steps" />
                    </div>
                </template>
            </admin-block>
            <admin-block
                title="Aditional Information"
                description="Aditional recipe data"
                size="2xl:col-span-1"
                h="mobile">
                <template #body>
                    <div class="mt-4">
                        <VSelect v-model="recipe.lang" :options="langs" label="Language" name="recipeLanguage" />
                        <VSelect label="Category" name="categoey" />
                    </div>
                </template>
            </admin-block>
        </div>
    </main>
</template>
<script src="./AdminCreateRecipe"></script>
