<template>
    <div class="admin-post">
        <h1 class="admin-post__title">Create a new post</h1>
        <form class="admin-post__form" @submit.prevent="createPost">
            <div class="admin-post__form-group">
                <label for="title">Title</label>
                <input placeholder="title" type="text" id="title" v-model="title" required />
            </div>
            <div class="admin-post__form-group">
                <div class="">Description</div>
                <textarea placeholder="description" id="content" v-model="content" required></textarea>
            </div>
            <div class="admin-post__form-group">
                <label for="category">Category</label>
                <select id="category" v-model="category" required>
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
                    <input placeholder="Time" v-model="time" type="number" id="time" required />
                    <small>minutes</small>
                </div>
                <div class="admin-post__form-group">
                    <label for="temperature">Temperature</label>
                    <select id="temperature" v-model="temperature" required>
                        <option value="Cold">Cold</option>
                        <option value="Hot">Hot</option>
                    </select>
                </div>
            </div>
            <div class="admin-post__form-group">
                <label for="steps">Steps:</label>
                <textarea v-model="step" id="steps" placeholder="Add a step..."></textarea>
                <button type="button" @click="addStep">Add step</button>
                <div class="admin-post__form-group" v-if="steps.length > 0">
                    <h1>Steps</h1>
                    <ul>
                        <li class="admin-post__form-cell" v-for="(item, index) in steps" :key="item">
                            <div v-if="!editStepFlag">
                                <strong>{{ index + 1 }}.</strong> {{ item }}
                            </div>
                            <div v-else>
                                <input type="textarea" v-model="editedStep">
                            </div>
                            <div class="flex-gap5">
                                <button type="button" v-if="!editStepFlag" @click=" editStep(index)" class="admin-post__button">✍️</button>
                                <button type="button" v-else @click="confirmEditStep(index)">V</button>
                                <button type="button" @click="deleteStep(index)" class="admin-post__button">✖</button>
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
import { ref, watch } from 'vue'
const title = ref(''),
    content = ref(''),
    category = ref(''),
    ingredients = ref([
        {
            id: 1,
            name: 'Tomato',
        },
        {
            id: 2,
            name: 'Cheese',
        },
        {
            id: 3,
            name: 'Onion',
        },
        {
            id: 4,
            name: 'Garlic',
        },
        {
            id: 5,
            name: 'Parsley',
        },
        {
            id: 6,
            name: 'Salt',
        },
        {
            id: 7,
            name: 'Pepper',
        },
        {
            id: 8,
            name: 'celery',
        },
        {
            id: 9,
            name: 'carrot',
        },
        {
            id: 10,
            name: 'cucumber',
        },
        {
            id: 11,
            name: 'mushroom',
        },
        {
            id: 12,
            name: 'olive',
        },
    ]),
    categories = ref([
        { id: 1, name: 'News' },
        { id: 2, name: 'Events' },
        { id: 3, name: 'About' },
        { id: 4, name: 'Contact' },
        { id: 5, name: 'Other' },
    ]),
    time = ref(0),
    temperature = ref('Cold'),
    step = ref(''),
    steps = ref([])
    

const search = ref(false)
const searchInput = ref('')

const timer = ref(null)


let editStepFlag = ref(false)
let editedStep = ref('')

const searchValue = (e) => {
    clearTimeout(timer.value)
    timer.value = setTimeout(() => {
        search.value = true
    }, 500)
}

const addStep = () => {
    if (step.value.length > 0) {
        steps.value.push(step.value)
        step.value = ''
    }
}

const editStep = (index) => {
    editStepFlag.value = true
    editedStep.value = steps.value[index]
}

const confirmEditStep = (index) =>{
    steps.value[index] = editedStep.value
    editStepFlag.value = false
    editedStep.value = ''
}

const deleteStep = (index) =>{
    steps.value.splice(index,1);
}

watch(searchInput, (value) => {
    if (value.length < 1) search.value = false
})

watch(time, () => {
    if (time.value < 0) time.value = 0
})
</script>
