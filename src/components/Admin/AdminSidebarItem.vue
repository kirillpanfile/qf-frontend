<template>
    <router-link
        v-ripple
        class="px-6 py-3 relative inline-flex items-center w-full h-full text-sm font-semibold transition-colors duration-150 hover:text-gray-800"
        :to="link"
        @click="$emit('press'), (open = !open)"
    >
        <i :class="icon" class="w-5 text-lg"></i>
        <span class="ml-4 block">{{ text }}</span>
    </router-link>
    <div class="pl-4" v-if="children && open">
        <router-link
            v-ripple
            class="px-6 py-3 relative inline-flex items-center w-full h-full text-sm font-semibold transition-colors duration-150 hover:text-gray-800"
            :to="children.link"
            @click="$emit('press')"
        >
            <i :class="children.icon" class="w-5 text-lg"></i>
            <span class="ml-4 block">{{ children.text }}</span>
        </router-link>
    </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
    link: {
        type: String,
        required: true,
    },
    icon: {
        type: String,
        required: true,
    },
    text: {
        type: String,
        default: '',
        required: true,
    },
    children: {
        type: Object,
        default: null,
    },
})
const emit = defineEmits(['press'])
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
