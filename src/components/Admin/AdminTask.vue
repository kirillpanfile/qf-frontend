<template>
    <div class="max-w-[30rem] mb-4">
        <div
            class="shadow-sm p-5 bg-white rounded-lg flex flex-col cursor-move select-none">
            <div class="pb-1 justify-between items-center flex">
                <h2 class="text-gray-900 font-semibold text-base">
                    {{ title }}
                </h2>
                <button type="button" class="text-gray-900 font-semibold text-base p-1">
                    <i class="fa-solid fa-pen-to-square" @click="$emit('open', id)"></i>
                </button>
            </div>
            <div class="flex flex-col">
                <p class="text-gray-900 font-normal text-sm pb-4">
                    {{ description }}
                </p>
                <div class="flex justify-between items-center">
                    <div
                        class="w-8 h-8 flex items-center justify-center text-xl rounded-full border-dashed border overflow-hidden">
                        <img :src="picture" alt="ProfilePic" />
                    </div>

                    <div class="bg-red-600 py-1 px-4 h-min rounded-lg text-sm text-white">
                        {{ flag }}
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>

<script setup>
import { defineProps, defineEmits } from "vue"

defineProps({
    title: {
        required: true,
        type: String,
    },
    description: {
        required: true,
        type: String,
    },
    picture: {
        required: true,
        type: String,
    },
    flag: {
        required: true,
        type: String,
    },
    id: {
        required: true,
        type: String
    }
})
defineEmits(['open'])
</script>
