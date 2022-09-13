<template>
    <label :for="name" class="block mb-2 text-sm font-semibold text-gray-900 dark:text-gray-300">{{ label }}</label>
    <textarea
        rows="4"
        :id="name"
        :class="sizes[size] + (disabled ? '  opacity-80 cursor-not-allowed' : '')"
        :disabled="disabled"
        :placeholder="placeholder"
        :value="modelValue"
        @input="valueBinding"
        class="block text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"></textarea>
</template>

<script setup>
defineProps({
    title: {
        type: String,
        default: "Select Title",
    },
    name: {
        type: String,
        required: true,
    },
    size: {
        type: String,
        default: "base",
        validator: (value) => ["sm", "base", "lg"].includes(value),
    },
    modelValue: String,
    placeholder: {
        type: String,
        default: "Textarea Placeholder",
    },
    label: {
        type: String,
        default: "Label",
    },
    disabled: {
        type: Boolean,
        default: false,
    },
})

const emit = defineEmits(["update:modelValue"])

const sizes = {
    sm: "p-2 w-full sm:text-xs",
    base: "text-sm w-full p-2.5",
    lg: "p-4 w-full sm:text-md",
}

const valueBinding = (e) => {
    emit("update:modelValue", e.target.value)
}
</script>
