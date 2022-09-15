<template>
    <!-- <div class="home__wrapper">
        <div>
            <div class="home__header">
                <h1>Do you already know what you want to cook ?</h1>
                <h2>Let's move to recipes <img src="@/assets/Arrow.svg" /></h2>
            </div>
            <div class="home__title">
                <h1>Want to cook something and dont know what ?</h1>
                <input
                    v-model="product"
                    @keyup.enter="insertProduct"
                    type="text"
                    placeholder="What ingrediends do you have?" />
                <div class="home__products">
                    <div
                        class="product"
                        v-if="products.length > 0"
                        v-for="(item, index) in products"
                        :key="item.index"
                        @click="removeProduct(index)">
                        {{ item }}
                        <div class="product__X"><img src="@/assets/Ics.svg" /></div>
                    </div>
                    <div class="product__empty" v-else>
                        There are no products. <br />
                        Add one!
                    </div>
                </div>
                <div class="home__offers" v-if="products.length > 0">
                    <div class="offer" v-for="item in offers">
                        <img src="@/assets/Add.svg" />
                        <h1>{{ item }}</h1>
                    </div>
                </div>
            </div>
        </div>
        <div class="home__image">
            <img src="@/assets/food.png" />
        </div>
    </div> -->
    <div class="w-screen h-screen flex items-center justify-center">
        <router-link to="/admin" class="px-8 py-4 bg-lime font-bold text-white rounded-lg hover:bg-[#679160]">
            To Admin Page
        </router-link>
    </div>
</template>

<script>
export default {
    data() {
        return {
            products: [],
            offers: ["Tabasco", "Tabbouleh", "Tangelo", "Tahini", "Tapenade", "Tuna"],
            product: "",
        }
    },
    methods: {
        removeProduct(index) {
            this.products.splice(index, 1)
        },
    },
    computed: {
        insertProduct() {
            this.products.push(this.product)
            this.product = ""
        },
    },
}
</script>
