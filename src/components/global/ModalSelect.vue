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
        <option v-for="(item, index) in options" :value="item._id" :key="index" selected>
            {{ item.name }}
        </option>
    </select>
</template>

<script setup>
const props = defineProps({
    title: {
        type: String,
        default: 'Select Title',
    },
    options: {
        type: Array,
        required: true,
    },

    modelValue: String,
    disabled: {
        type: Boolean,
        default: true,
    },
})

const emit = defineEmits(['update:modelValue'])

const valueBinding = (e) => {
    emit('update:modelValue', e.target.value)
}
</script>
