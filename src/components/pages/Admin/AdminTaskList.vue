<template>
    <div class="min-w-[30rem] p-4">
        <h1 class="text-gray-900 font-semibold text-base py-4 dark:text-gray-300">{{ list }}</h1>
        <div
            class="min-h-[11.5rem] mb-4"
            :class="data.length == 0 && 'outline-2 outline-dashed outline-gray-300 rounded-lg mb-4'"
            @drop="onDrop($event, list)"
            @dragenter.prevent
            @dragover.prevent>
            <div
                class="h-[11.5rem] flex items-center justify-center font-bold text-gray-400 select-none"
                v-if="data.length == 0">
                Drag here a card
            </div>
            <slot></slot>
        </div>
        <button
            type="button"
            class="text-gray-400 w-full font-bold outline-dashed outline-2 outline-gray-300 rounded-lg py-2"
            v-if="buttonFlag">
            + Add another Task
        </button>
    </div>
</template>

<script setup>
import { useTaskStore } from "@/store"
const { setTaskStatus } = useTaskStore()

defineProps({
    list: { type: String, required: true },
    buttonFlag: { type: Boolean, default: false },
    data: { type: Object, required: true },
})

const onDrop = (event, list) => setTaskStatus(event.dataTransfer.getData("itemID"), list)
</script>
