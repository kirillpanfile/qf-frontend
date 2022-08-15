<template>
    <button
        class="text-white bg-cyan-600 hover:bg-cyan-700 focus:ring-4 focus:ring-cyan-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center select-none"
        type="button" @click="$emit('btnClick')">
        {{ text }}
    </button>
</template>

<script setup>
defineProps({
    text: {
        type: String,
        default: 'Button'
    }
})

defineEmits([
    'btnClick'
])
</script>