<template>
    <label for="assign" class="text-sm font-medium text-gray-900 block mb-2 select-none">{{ title }}</label>
    <select
        id="assign"
        class="shadow-sm bg-gray-50 border outline-none border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 mb-4"
        :class="disabled && 'opacity-70 text-[#AAAAAA] bg-[#76767610]'"
        v-model="modelValue"
        :disabled="disabled"
        @input="valueBinding"
    >
        <option v-for="(item, index) in options" :value="item" :key="index" selected>{{ item?.name }}</option>
    </select>
</template>

<script setup>
import { computed } from 'vue'
defineProps({
    title: {
        type: String,
        default: 'Select Title',
    },
    options: {
        type: Array,
        default: ['All Options', 'Option 1', 'Option 2', 'Option 3'],
    },

    modelValue: String,
    disabled: {
        type: Boolean,
        default: true
    }
})

// const selectData = computed(() => {
//     return {
//         name: 
//     }
// })

const emit = defineEmits(['update:modelValue'])

const valueBinding = (e) => {
    emit('update:modelValue', e.target.value)
}
</script>
