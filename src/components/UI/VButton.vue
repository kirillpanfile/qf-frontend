<template>
    <button v-if="!loading" :class="genClass" :disabled="disabled" :type="type" @click="$emit('btnClick')">
        <slot></slot>
    </button>

    <button v-else :class="genClass" disabled class="cursor-not-allowed">
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
        validator: (value) =>
            [
                "default",
                "alternative",
                "dark",
                "light",
                "green",
                "red",
                "yellow",
                "purple",
                "lime",
                "no-color",
            ].includes(value),
    },
    color: {
        type: String,
        validator: (value) => ["wihte", "black", "lime", "gray"].includes(value),
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

const bgColor = ref("")
const color = ref("")
const size = ref("")

const getColor = computed(() => {
    switch (props.color) {
        case "white":
            color.value = "text-white"
            break
        case "black":
            color.value = "text-black"
            break
        case "lime":
            color.value = "text-lime"
            break
        case "gray":
            color.value = "text-gray-500"
            break
        default:
            break
    }
    return color.value
})

const getBgColor = computed(() => {
    switch (props.bgColor) {
        case "default":
            bgColor.value =
                "text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            break
        case "alternative":
            bgColor.value =
                "text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
            break
        case "dark":
            bgColor.value =
                "text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
            break
        case "light":
            bgColor.value =
                "text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
            break
        case "green":
            bgColor.value =
                "focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
            break
        case "red":
            bgColor.value =
                "focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
            break
        case "yellow":
            bgColor.value =
                "focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 dark:focus:ring-yellow-900"
            break
        case "purple":
            bgColor.value =
                "focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
            break
        case "lime":
            bgColor.value =
                "focus:outline-none text-white bg-lime hover:bg-green-500 focus:ring-4 focus:ring-green-300 dark:focus:ring-green-900"
            break
        case "no-color":
            bgColor.value =
                "focus:outline-none bg-text-transparent hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-200"
            break
    }
    return bgColor.value
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

const genClass = computed(() => {
    const disabled = props.disabled ? "cursor-not-allowed" : " "
    return `${getBgColor.value} ${getColor.value} ${getSize.value} ${getSpace.value} ${disabled}`
})

defineEmits(["btnClick"])
</script>
