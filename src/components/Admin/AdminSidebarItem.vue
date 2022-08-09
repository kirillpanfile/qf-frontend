<template>
    <router-link
        v-if="!children"
        v-ripple
        class="px-6 overflow-hidden select-none py-3 relative inline-flex items-center w-full h-full text-sm font-semibold transition-colors duration-150 hover:text-gray-800"
        :to="path"
        @click="$emit('press'), (open = !open)"
    >
        <i :class="icon" class="w-5 text-lg"></i>
        <span class="ml-4 block">{{ text }}</span>
    </router-link>
    <a
            v-else
        v-ripple
        @click.prevent="open = !open"
        href="#"
        class="link px-6 overflow-hidden select-none py-3 relative inline-flex items-center w-full h-full text-sm font-semibold transition-colors duration-150 hover:text-gray-800"
    >
        <i :class="icon" class="w-5 text-lg"></i>
        <span class="ml-4 block">{{ text }}</span>
        <i v-if="!open" class="fa-solid text-xl fa-angle-down ml-auto"></i>
        <i v-else class="fa-solid text-xl fa-angle-up  ml-auto"></i>
    </a>
        
    <div class="w-full bg-gray-200" v-if="children && open">
        <router-link
            v-for="(item, index) in childs"
            :key="index"
            v-ripple
            class="px-6 overflow-hidden select-none py-3 relative inline-flex items-center w-full h-full text-sm font-semibold transition-colors duration-150 hover:text-gray-800"
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
    border-left: 4px solid #91c788;
    color: #1f2937;
}
</style>
