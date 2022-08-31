<template>
    <label for="task" class="text-sm font-medium text-gray-900 block mb-2 select-none">{{
        title
    }}</label>
    <input
        type="text"
        id="task"
        class="shadow-sm bg-gray-50 border border-gray-300 outline-none text-gray-900 text-sm rounded-lg block w-full p-2.5 mb-4"
        :class="disabled && 'opacity-70 text-[#AAAAAA] bg-[#76767610]'"
        :placeholder="placeholder"
        :value="modelValue"
        :disabled="disabled"
        @input="valueBinding" />
</template>

<script setup>
const props = defineProps({
    title: {
        type: String,
        default: "Input title",
    },
    placeholder: {
        type: String,
        default: "Input placeholder",
    },
    modelValue: String,
    disabled: {
        type: Boolean,
        default: true,
    },
})

const emit = defineEmits(["update:modelValue"])

const valueBinding = (e) => {
    emit("update:modelValue", e.target.value)
}
</script>
