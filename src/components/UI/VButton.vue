<template>
    <button
        v-if="!loading"
        :class="getColor + ' ' + getSize + ' ' + getSpace + ' ' + (disabled ? 'cursor-not-allowed' : ' ')"
        :disabled="disabled"
        :type="type"
        @click="$emit('btnClick')">
        <slot></slot>
    </button>

    <button v-else :class="getColor + ' ' + getSize + ' ' + getSpace" disabled class="cursor-not-allowed">
        <div class="m-auto block w-5 h-5 border-4 rounded-full border-t-lime animate-spin"></div>
    </button>
</template>

<script setup>
import { computed, ref } from "vue"

const props = defineProps({
    type: {
        type: String,
        required: true,
        validator: (value) => ["button", "submit", "reset"].includes(value),
    },
    size: {
        type: String,
        default: "md",
        required: true,
        validator: (value) => ["xs", "sm", "base", "lg", "xl"].includes(value),
    },
    bgColor: {
        type: String,
        default: "no-color",
        validator: (value) =>
            ["default", "alternative", "dark", "light", "green", "red", "yellow", "purple", "lime"].includes(value),
    },
    space: {
        type: Boolean,
        default: false,
    },
    disabled: {
        type: Boolean,
        default: false,
    },
    loading: {
        type: Boolean,
        default: false,
    },
})

const color = ref("")
const size = ref("")

const getColor = computed(() => {
    switch (props.bgColor) {
        case "default":
            color.value =
                "text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            break
        case "alternative":
            color.value =
                "text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
            break
        case "dark":
            color.value =
                "text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
            break
        case "light":
            color.value =
                "text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
            break
        case "green":
            color.value =
                "focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
            break
        case "red":
            color.value =
                "focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
            break
        case "yellow":
            color.value =
                "focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 dark:focus:ring-yellow-900"
            break
        case "purple":
            color.value =
                "focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
            break
        case "lime":
            color.value =
                "focus:outline-none text-white bg-lime hover:bg-green-500 focus:ring-4 focus:ring-green-300 dark:focus:ring-green-900"
            break
        case "no-color":
            color.value =
                "focus:outline-none text-black bg-text-transparent hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-200"
            break
    }
    return color.value
})

const getSize = computed(() => {
    switch (props.size) {
        case "xs":
            size.value = "py-2 px-3 text-xs font-medium rounded-lg "
            break
        case "sm":
            size.value = "py-2 px-3 text-sm font-medium rounded-lg"
            break
        case "base":
            size.value = "py-2.5 px-5 text-sm font-medium rounded-lg"
            break
        case "lg":
            size.value = "py-3 px-5 text-base font-medium rounded-lg"
            break
        case "xl":
            size.value = "px-6 py-3.5 text-base font-medium rounded-lg"
            break
        default:
            break
    }
    return size.value
})

const getSpace = computed(() => (props.space ? "mx-2 " : ""))
defineEmits(["btnClick"])
</script>
