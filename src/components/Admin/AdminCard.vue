<template>
    <div class="card__container">
        <div class="card__header">
            <div class="card__hero">
                <div class="card__image"> <!--TODO imaginea e statica, de facut reactive-->
                    <img src="@/assets/cookies.jpg" alt="recipe-image" /> <!--? Image--> 
                </div>
                <div class="card__title">
                    <h1>{{ title }}</h1> <!--? Title--> 
                    <div class="card__temperature" v-if="temperature"> <!--? Temperature--> 
                        <h2>HOT</h2> 
                        <img src="@/assets/fire.svg" alt="recipe-temp" />
                    </div>
                </div>
                <div class="card__description">
                    {{ description }}
                </div>
            </div>
            <div class="card__ingredients">
                <div class="card__cells"> <!--? small Cells--> 
                    <div class="cell" v-for="item in cells">{{ item }}</div>
                </div>
                <div class="flex-5">
                    <h1>Ingredients</h1>
                    <img src="@/assets/chef.svg" alt="recipe-ingredients" />
                </div>
                <div class="card__ingredients-list"> 
                    <div class="ingredient" v-for="item in ingredients"> <!--? Ingredients--> 
                        <img src="@/assets/check.svg" alt="recipe-check" />
                        <h1>{{ item }}</h1>
                    </div>
                </div>
                <button class="card__favorite"> <!--? Favorite button-->
                    <img src="@/assets/heart.svg" alt="recipe-favorite" />
                    <h1>Add to favourites</h1> 
                </button>
            </div>
        </div>
        <div class="card__content">
            <div class="card__steps steps">
                <div class="steps__title">
                    <h1>Preparation</h1>
                    <div class="steps__line"></div>
                    <div class="steps__time">
                        <img src="@/assets/timeOff.svg" alt="steps-time">
                        <h2>{{ time }} mins</h2> <!--? Time-->
                    </div>
                </div>
                <div class="steps__step" v-for="(step,index) in steps" :key="index">
                    <h3>{{index + 1}}</h3>
                    <h4>{{step}}</h4>
                </div>

            </div>
            <div class="card__featured"></div>
        </div>
    </div>
</template>

<script setup>
defineProps({
    image: {
        type: String,
        // required: true
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String
    },
    temperature: {
        type: Boolean,
        default: false
    },
    cells: {
        type: Array,
    },
    ingredients: {
        type: Array,
    },
    time: {
        type: Number,
        required: true
    },
    steps: {
        type: Array,
        required: true
    }
})
</script>
