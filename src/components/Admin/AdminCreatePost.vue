<template>
    <div class="admin-post">
        <h1 class="admin-post__title">Create a new post</h1>
        <form class="admin-post__form" @submit.prevent="createPost">
            <div class="admin-post__form-group">
                <label for="title">Title</label>
                <input placeholder="title" type="text" id="title" v-model="post.title" required />
            </div>
            <div class="admin-post__form-group">
                <div class="">Description</div>
                <textarea placeholder="description" id="content" v-model="post.content" required></textarea>
            </div>
            <div class="admin-post__form-group">
                <label for="category">Category</label>
                <select id="category" v-model="post.category" required>
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
                <input placeholder="Select Image" type="file" id="image" required />
            </div>
            <div class="admin-post__form-wrapper">
                <div class="admin-post__form-group">
                    <label for="time">Time</label>
                    <input placeholder="Time" v-model="post.time" type="number" id="time" required />
                    <small>minutes</small>
                </div>
                <div class="admin-post__form-group">
                    <label for="temperature">Temperature</label>
                    <select id="temperature" v-model="post.temperature" required>
                        <option value="Cold">Cold</option>
                        <option value="Hot">Hot</option>
                    </select>
                </div>
            </div>
            <div class="admin-post__form-group">
                <label for="steps">Steps:</label>
                <textarea v-model="step" id="steps" placeholder="Add a step..."></textarea>
                <button type="button" @click="addStep">Add step</button>
                <div class="admin-post__form-group" v-if="post.steps.length > 0">
                    <h1>Steps</h1>
                    <ul>
                        <li class="admin-post__form-cell" v-for="(item, index) in post.steps" :key="item">
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
                <button type="submit">Create</button>
            </div>
        </form>
    </div>
</template>

<script>
const name = 'AdminCreatePost'
export default { name }
</script>

<script setup>
import { ref, watch, reactive } from 'vue'

const step = ref('')
const search = ref(false)
const searchInput = ref('')
const timer = ref(null)

const post = reactive({
    title: '',
    content: '',
    category: '',
    ingredients: [],
    steps: [],
    category: '',
    time: 0,
    temperature: 'Cold',
})

const ingredients = { ...['Tomato', 'Cheese', 'Onion', 'Garlic', 'Parsley'] }
const activeStep = reactive({ index: null, step: null })

const categories = [
    { id: 1, name: 'Breakfast' },
    { id: 2, name: 'Lunch' },
    { id: 3, name: 'Dinner' },
    { id: 4, name: 'Dessert' },
    { id: 5, name: 'Snack' },
]

const searchValue = () => {
    clearTimeout(timer.value)
    timer.value = setTimeout(() => (search.value = true), 500)
}

const clearStep = () => {
    post.steps.push(step.value)
    step.value = ''
}

const addStep = () => (step.value.length > 0 ? clearStep() : void 0)

const editStep = (index) => {
    saveStep()
    activeStep.index = index
    activeStep.step = post.steps[index]
}

const saveStep = () => {
    post.steps[activeStep.index] = activeStep.step
    activeStep.index = null
    activeStep.step = null
}

const deleteStep = (index) => post.steps.splice(index, 1)
watch(searchInput, (value) => (value.length < 1 ? (search.value = false) : void 0))
</script>
