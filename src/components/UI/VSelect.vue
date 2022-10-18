<template>
    <label :for="name" class="block mb-2 text-sm font-semibold text-gray-900 dark:text-gray-300">{{ label }}</label>
    <select
        :id="name"
        :value="modelValue"
        :disabled="disabled"
        @input="valueBinding"
        :multiple="multiple"
        :class="sizes[size] + (disabled ? '  opacity-80 cursor-not-allowed' : '')"
        class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg mb-4 focus:ring-blue-500 focus:border-blue-500 block dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
        <option value="" selected disabled>Select {{ name }}</option>
        <option v-for="item in options" :value="item._id" :key="item._id">
            {{ item.name || item.username || item.tag }}
        </option>
        {{
            options
        }}
    </select>
</template>

<script setup>
defineProps({
    title: {
        type: String,
        default: "Select Title",
    },
    options: {
        type: Array,
        required: true,
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
    modelValue: [String, Number, Array],
    label: {
        type: String,
        default: "Label",
    },
    disabled: {
        type: Boolean,
        default: false,
    },
    multiple: {
        type: Boolean,
        default: false,
    },
})

const sizes = {
    sm: "p-2 w-full sm:text-xs",
    base: "text-sm w-full p-2.5",
    lg: "p-4 w-full sm:text-md",
}

const emit = defineEmits(["update:modelValue"])

const valueBinding = (e) => {
    emit("update:modelValue", e.target.value)
}
</script>
