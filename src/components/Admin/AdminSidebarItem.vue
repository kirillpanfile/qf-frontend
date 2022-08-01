<template>
    <router-link
        v-if="link"
        v-ripple
        class="px-6 py-3 relative inline-flex items-center w-full h-full text-sm font-semibold transition-colors select-none duration-150 hover:text-gray-800"
        :to="path"
        @click="$emit('press'), (open = !open)"
    >
        <i :class="icon" class="w-5 text-lg"></i>
        <span class="ml-4 block">{{ text }}</span>
    </router-link>
    <a
        v-else
        v-ripple
        @click.prevent
        href=""
        class="px-6 py-3 relative inline-flex items-center w-full h-full text-sm font-semibold transition-colors select-none duration-150 hover:text-gray-800"
    >
    </a>
    <div class="pl-4" v-if="children && open">
        <router-link
            v-for="(item, index) in childs"
            :key="index"
            v-ripple
            class="px-6 py-3 relative inline-flex items-center w-full h-full text-sm font-semibold transition-colors select-none duration-150 hover:text-gray-800"
            :to="item.path"
            @click.prevent="$emit('press')"
        >
            <i :class="item.icon" class="w-5 text-lg"></i>
            <span class="ml-4 block">{{ item.text }}</span>
        </router-link>
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
        // required: true,
    },
    text: {
        type: String,
        default: '',
        required: true,
    },
    children: {
        type: Array,
        default: null,
    },
})
const emit = defineEmits(['press'])

const childs = ref(null)

onMounted(function () {
    if (props.children) {
        childs.value = props.children.filter(
            (route) => !route.path.includes('/:id') && !route.path.includes('/:catchAll(.*)')
        )
    }
})
// const childs = props.children.filter((route) => !route.path.includes('/:id') && !route.path.includes('/:catchAll(.*)'))
const open = ref(false)
const link = `/admin/${props.link}`
</script>

<style scoped>
.router-link-exact-active,
.router-link-active {
    border-left: 4px solid #91c788;
    color: #1f2937;
}
</style>
