<template>
    <label for="task" class="text-sm font-medium text-gray-900 block mb-2 select-none">{{ title }}</label>
    <input
        type="text"
        id="task"
        class="shadow-sm bg-gray-50 border border-gray-300 outline-none text-gray-900 text-sm rounded-lg block w-full p-2.5 mb-4"
        :placeholder="placeholder"
        :value="modelValue"
        @input="valueBinding"
    />
</template>

<script setup>
const props = defineProps({
    title: {
        type: String,
        default: 'Input title',
    },
    placeholder: {
        type: String,
        default: 'Input placeholder',
    },
    modelValue: String,
})

const emit = defineEmits(['update:modelValue'])

const valueBinding = (e) => {
    console.log(e)
    emit('update:modelValue', e.target.value)
}
</script>
