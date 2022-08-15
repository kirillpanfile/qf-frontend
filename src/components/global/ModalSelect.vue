<template>
    <label for="assign" class="text-sm font-medium text-gray-900 block mb-2 select-none">{{ title }}</label>
    <select type="text" id="assign"
        class="shadow-sm bg-gray-50 border outline-none border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 mb-4"
        placeholder="Fix navbar">
        <option v-for="(item,index) in options" :value="index">{{item}}</option>
    </select>
</template>

<script setup>
defineProps({
    title: {
        type: String,
        default: 'Select Title'
    },
    options: {
        type: Array,
        default: ['All Options', 'Option 1', 'Option 2', 'Option 3']
    }
})
</script>