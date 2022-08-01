<template>
    <div>Create Recipe</div>
    <!--<div class="admin-post">
        <h1 class="admin-post__title">Create a new recipe</h1>
        <form class="admin-post__form" @submit.prevent="addRecipe">
            <div class="admin-post__form-group">
                <label for="title">Title</label>
                <input placeholder="Title" type="text" id="title" v-model="recipe.title" required />
            </div>
            <div class="admin-post__form-group">
                <div class="">Description</div>
                <textarea placeholder="Description" id="content" v-model="recipe.content" required></textarea>
            </div>
            <div class="admin-post__form-group">
                <label for="category">Category</label>
                <select id="category" v-model="recipe.category" required>
                    <option value="">Select a category</option>
                    <option v-for="category in categories" :value="category.id">{{ category.name }}</option>
                </select>
            </div>
            <div class="admin-post__form-group">
                <label for="ingredients">Ingredients</label>
                <input
                    placeholder="Ingredients"
                    type="text"
                    @keypress="searchValue"
                    id="ingredients"
                    v-model="searchInput"
                    required
                />
                <ul class="admin-search" v-if="search">
                    <li v-for="tag in ingredients" class="admin-search__item">{{ tag }}</li>
                </ul>
            </div>
            <div class="admin-post__form-group">
                <label for="image">Image</label>
                <input placeholder="Select Image" type="file" id="image" @change="(event) => addImage(event)" />
            </div>
            <div class="admin-post__form-wrapper">
                <div class="admin-post__form-group">
                    <label for="time">Time</label>
                    <input placeholder="Time" v-model="recipe.time" type="number" id="time" required />
                    <small>minutes</small>
                </div>
                <div class="admin-post__form-group">
                    <label for="temperature">Temperature</label>
                    <select id="temperature" v-model="recipe.temperature" required>
                        <option value="Cold">Cold</option>
                        <option value="Hot">Hot</option>
                    </select>
                </div>
            </div>
            <div class="admin-post__form-group">
                <label for="steps">Steps:</label>
                <textarea v-model="step" id="steps" placeholder="Add a step..."></textarea>
                <button type="button" @click="addStep">Add step</button>
                <div class="admin-post__form-group" v-if="recipe.steps.length > 0">
                    <h1>Steps</h1>
                    <ul>
                        <li class="admin-post__form-cell" v-for="(item, index) in recipe.steps" :key="item">
                            <div v-if="activeStep.index !== index">
                                <strong>{{ index + 1 }}.</strong> {{ item }}
                            </div>
                            <div v-else>
                                <textarea v-model="activeStep.step" name="" id=""></textarea>
                            </div>
                            <div class="flex-gap5">
                                <button
                                    v-if="activeStep.index !== index"
                                    type="button"
                                    @click="editStep(index)"
                                    class="admin-post__button"
                                >
                                    ✍️
                                </button>
                                <button v-else type="button" @click="saveStep" class="admin-post__button">✔️</button>

                                <button
                                    v-if="activeStep.index != index"
                                    type="button"
                                    @click="deleteStep(index)"
                                    class="admin-post__button"
                                >
                                    ✖
                                </button>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="admin-post__form-group">
                <button type="submit" @click="addRecipe(recipe)">Create</button>
            </div>
        </form>
    </div> -->
</template>

<script setup>
import { ref, watch } from 'vue'
import { usePost, useActiveStep } from '@/composables/post'
import { useRecipeStore } from '@/store/recipeStore'

const { post, categories, ingredients } = usePost()
const { activeStep, addStep, editStep, deleteStep, saveStep, step } = useActiveStep()
const { recipe, addRecipe } = useRecipeStore()

const timer = ref(null)
const search = ref(false)
const searchInput = ref('')

const searchValue = () => {
    clearTimeout(timer.value)
    timer.value = setTimeout(() => (search.value = true), 500)
}

const addImage = (event) => {
    post.image = event.target.files[0].name
}

watch(searchInput, (value) => (value.length < 1 ? (search.value = false) : void 0))
</script>
