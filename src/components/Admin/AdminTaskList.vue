<template>
    <div class="min-w-[30rem] p-4">
        <h1 class="text-gray-900 font-semibold text-base py-4">{{ props.list }}</h1>
        <div
            class="drag-zone min-h-20"
            @drop="onDrop($event, props.list)"
            @dragenter.prevent
            @dragover.prevent>
            <slot></slot>
        </div>

        <button
            type="button"
            class="text-gray-600 w-full font-bold border-dashed border-2 border-gray-300 rounded-lg py-2">
            + Add another Task
        </button>
    </div>
</template>

<script setup>
import { defineProps } from "vue"

const task = useTaskStore()
const { tasks } = storeToRefs(task)
const { updateTask } = task

const props = defineProps({
    list: {
        type: String,
        required: true,
    },
})

const startDrag = (event, item) => {
    event.dataTransfer.dropEffect = "move"
    event.dataTransfer.effectAllowed = "move"
    event.dataTransfer.setData("itemID", item._id)
}

const onDrop = async (event, list) => {
    await updateTask(event.dataTransfer.getData("itemID"), list)
}

const getList = (list) => tasks.value.filter((item) => item.status === list)
</script>
