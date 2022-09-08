<template>
    <div
        class="w-screen fixed h-screen top-0 left-0 bg-black bg-opacity-20 z-50 flex items-center justify-center"
        v-if="isOpen"
        @click="closeModal">
        <div
            class="max-w-2xl w-full relative bg-white dark:bg-gray-800 p-4 rounded-lg shadow mx-4 overflow-y-scroll"
            @click.stop>
            <div class="flex items-center justify-between p-5 rounded-t w-full">
                <h3 class="text-xl font-semibold dark:text-gray-300" v-if="!titleInput">{{ title }}</h3>
                <input
                    type="text"
                    v-model="title"
                    class="outline-none text-xl font-semibold w-full max-w-md whitespace-nowrap text-ellipsis overflow-hidden dark:bg-gray-800 dark:text-white"
                    @input="$emit('titleChange', title)"
                    v-else />
                <button
                    type="button"
                    class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm py-1 px-1.5 ml-auto inline-flex items-center"
                    data-modal-toggle="user-modal"
                    @click="closeModal">
                    <i class="fa-solid fa-xmark text-xl"></i>
                </button>
            </div>
            <div class="w-[calc(100%-40px)] mx-auto h-[1px] dark:bg-gray-300 bg-black"></div>

            <div class="p-6 space-y-6">
                <form action="#">
                    <slot></slot>
                </form>
            </div>
            <!--? Modal Footer -->
            <slot name="footer"></slot>
        </div>
    </div>
</template>

<script setup>
import { ref } from "vue"

const isOpen = ref(false)

const closeModal = () => (isOpen.value = false)
const openModal = () => (isOpen.value = true)

defineProps({
    title: String,
    titleInput: {
        type: Boolean,
        default: false,
    },
})
defineEmits(["close", "titleChange"])
defineExpose({
    openModal,
    closeModal,
})
</script>

<style></style>
