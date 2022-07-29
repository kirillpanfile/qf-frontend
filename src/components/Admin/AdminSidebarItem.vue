<template>
    <router-link
        v-ripple
        class="px-6 py-3 relative inline-flex items-center w-full h-full text-sm font-semibold transition-colors duration-150 hover:text-gray-800"
        :to="link"
        @click="$emit('press')"
    >
        <i :class="icon" class="w-5 text-lg"></i>
        <span class="ml-4 block">{{ text }}</span>
    </router-link>
</template>

<script setup>
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
})
const emit = defineEmits(['press'])

const link = `/admin/${props.link}`
</script>

<style></style>
