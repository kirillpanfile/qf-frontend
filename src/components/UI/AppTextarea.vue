<template>
    <label
        for="description"
        class="text-sm font-medium text-gray-900 block mb-2 select-none"
        >{{ title }}</label
    >
    <textarea
        id="description"
        cols="10"
        rows="5"
        :placeholder="placeholder"
        :disabled="disabled"
        :value="modelValue"
        @input="valueBinding"
        class="shadow-sm bg-gray-50 border border-gray-300 outline-none text-gray-900 text-sm rounded-lg block w-full p-2.5 mb-4 resize-none"
        :class="disabled && 'opacity-70 text-[#AAAAAA] bg-[#76767610]'"></textarea>
</template>

<script setup>
defineProps({
    title: {
        type: String,
        default: "Textarea Title",
    },
    placeholder: {
        type: String,
        default: "Textarea Placeholder",
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
