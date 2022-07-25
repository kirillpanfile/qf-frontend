<template>
    <div class="card__container">
        <div class="card__header">
            <div class="card__image">
                <img src="@/assets/cookies.jpg" alt="" />
            </div>
            <div class="card__ingredients">
                <div class="card__cells">
                    <div class="cell" v-for="item in cells">{{ item }}</div>
                </div>
                <div class="flex-5">
                    <h1>Ingredients</h1>
                    <img src="@/assets/chef.svg" alt="" />
                </div>
                <div class="card__ingredients-list">
                    <div class="ingredient" v-for="item in ingredients">
                        <img src="@/assets/check.svg" />
                        <h1>{{ item }}</h1>
                    </div>
                </div>
                <button class="card__favorite">
                    <img src="@/assets/heart.svg" />
                    <h1>Add to favourites</h1>
                </button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useCardStore} from '@/store/cardStore'

const { cells, ingredients } = useCardStore()
</script>
