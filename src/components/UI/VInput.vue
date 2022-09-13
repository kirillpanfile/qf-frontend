<template>
    <label :for="name" class="block mb-2 text-sm font-semibold text-gray-900 dark:text-gray-300">{{ label }}</label>
    <input
        :type="type"
        :id="name"
        :disabled="disabled"
        @input="valueBinding"
        :value="modelValue"
        class="bg-gray-50 border border-gray-300 mb-4 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        :class="sizes[size] + (disabled ? '  opacity-80 cursor-not-allowed' : '')"
        :placeholder="placeholder"
        required />
</template>

<script setup>
defineProps({
    name: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        default: "text",
        validator: (value) => {
            return ["text", "email", "password", "number", "tel", "url"].includes(value)
        },
    },
    placeholder: {
        type: String,
        default: "Input placeholder",
    },
    modelValue: {
        type: String,
        required: true,
    },
    disabled: {
        type: Boolean,
        default: false,
    },
    label: {
        type: String,
        default: "Input label",
    },
    size: {
        type: String,
        default: "sm",
        validator: (value) => {
            return ["sm", "base", "lg"].includes(value)
        },
    },
})

const sizes = {
    sm: "p-2 w-full sm:text-xs",
    base: "text-sm w-full p-2.5",
    lg: "p-4 w-full sm:text-md",
}

const valueBinding = (e) => emit("update:modelValue", e.target.value)

const emit = defineEmits(["update:modelValue"])
</script>
