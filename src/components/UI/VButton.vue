<template>
    <button class="bg-green-300 p-2 text-white">
        {{ text }}
    </button>
</template>

<script setup>
defineProps({
    text: {
        default: '',
        type: String,
    },
})
</script>
