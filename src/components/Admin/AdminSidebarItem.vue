<template>
    <router-link
        class="px-6 py-3 inline-flex items-center w-full h-full text-sm font-semibold transition-colors duration-150 hover:text-gray-800"
        v-wave
        :to="link"
        @click="$emit('press')"
    >
        <i :class="icon" class="w-5 text-lg"></i>
        <span class="ml-4">{{ text }}</span>
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
