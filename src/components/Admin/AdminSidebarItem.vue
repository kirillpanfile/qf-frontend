<template>
    <!-- <router-link
        v-ripple
        class="flex items-center gap-4 h-10 px-10"
        :to="path"
        @click="$emit('press'), (open = !open)"
        v-if="!children"
    >
        <i :class="icon" class="w-5 text-lg"></i>
        <span class="">{{ text }}</span>
    </router-link>
    <a v-else v-ripple @click.prevent="open = !open" href="#" class="flex items-center gap-4 h-10 px-10">
        <i :class="icon" class="w-5 text-lg"></i>
        <span class="">{{ text }}</span>
    </a>

    <div class="w-full bg-gray-200 rounded-md" v-if="children && open">
        <router-link
            v-for="(item, index) in childs"
            :key="index"
            v-ripple
            class="flex items-center gap-4 h-10 px-10"
            :to="item.path"
            @click.prevent="$emit('press')"
        >
            <i :class="item.icon" class="w-5 text-lg"></i>
            <span class="">{{ item.text }}</span>
        </router-link>
    </div> -->
    <li class="list-none flex items-center flex-row">
        <router-link
            v-ripple
            :to="path"
            @click="$emit('press'), (open = !open)"
            v-if="!children"
            class="text-base text-gray-600 font-bold rounded-lg flex items-center p-2 hover:bg-gray-100 group w-full"
        >
            <i :class="icon" class="w-6 text-gray-500 group-hover:text-gray-600 transition duration-75"></i>
            <span class="ml-3 text-md">{{ text }}</span>
        </router-link>
        <a
            v-else
            v-ripple
            @click.prevent="open = !open"
            href="#"
            class="text-base text-gray-600 font-bold rounded-lg flex items-center p-2 hover:bg-gray-100 group w-full"
        >
            <i :class="icon" class="w-6 text-gray-500 group-hover:text-gray-600 transition duration-75"></i>
            <span class="ml-3 text-md">{{ text }}</span>
        </a>
    </li>
    <div class="w-full border-y py-2 space-y-2" v-if="children && open">
        <li class="list-none flex items-center flex-row" v-for="(item, index) in childs" :key="index">
            <router-link
                v-ripple
                class="text-base text-gray-600 font-bold rounded-lg flex items-center p-2 hover:bg-gray-100 group w-full"
                :to="item.path"
                @click.prevent="$emit('press')"
            >
                <i :class="item.icon" class="w-6 text-gray-500 group-hover:text-gray-600 transition duration-75"></i>
                <span class="ml-3 text-md">{{ item.text }}</span>
            </router-link>
        </li>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const props = defineProps({
    path: {
        type: String,
        required: true,
    },
    icon: {
        type: String,
        required: true,
    },
    text: {
        type: String,
        required: true,
    },
    children: {
        type: Array,
        default: null,
    },
})
const emit = defineEmits(['press'])

const open = ref(false)
const childs = ref(null)

onMounted(() => (props.children ? (childs.value = props.children.filter((route) => !route.exclude)) : void 0))
</script>

<style scoped>
.router-link-exact-active,
.router-link-active {
    background-color: #f3f4f6;
}
</style>
