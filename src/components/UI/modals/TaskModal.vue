<template>
    <app-modal ref="taskModal" :title="title" :titleInput="false">
        <div class="grid grid-cols-6 gap-x-6">
            <div class="col-span-6">
                <VInput v-model="taskData.title" size="lg" placeholder="Task Title" name="taskTitle" label="Title" />
            </div>
            <div class="col-span-6 mb-4">
                <VTextarea
                    v-model="taskData.description"
                    size="base"
                    placeholder="Task Description"
                    name="taskDescription"
                    label="Description" />
            </div>
            <div class="col-span-6 sm:col-span-3 mb-6">
                <VSelect v-model="taskData.user._id" :options="admins" name="admins" size="base" label="User" />
            </div>
            <div class="col-span-6 sm:col-span-3 mb-6">
                <VSelect v-model="taskData.flag" :options="flags" name="flags" size="base" label="Flag" />
            </div>
        </div>
        <div class="items-center py-6 border-t border-gray-200 rounded-b flex gap-4">
            <v-button type="button" bgColor="default" size="base" @btnClick="submitModal()"> Submit </v-button>
            <v-button
                type="button"
                v-if="taskType === 'view'"
                bgColor="red"
                size="base"
                @btnClick="deleteTask(taskData._id), closeModal()">
                Delete
            </v-button>
        </div>
    </app-modal>
</template>

<script setup>
import { createRefs } from "@/helpers"
import { useAdminStore, useTaskStore, refs } from "@/store"
import { AppModal, VInput, VSelect, VButton, VTextarea } from "@/components"
import { computed } from "vue"

const { admins } = refs(useAdminStore())
const { flags } = refs(useTaskStore())
const { createTask, updateTask, deleteTask } = useTaskStore()

const [taskType, taskModal, taskData] = createRefs([null, null, {}])

const title = computed(() => {
    return taskType.value && taskType.value.charAt(0).toUpperCase() + taskType.value.slice(1) + " Task"
})

const closeModal = () => {
    taskModal.value.closeModal()
}

const submitModal = () => {
    taskModal.value.closeModal()
    if (taskType.value === "create") createTask(taskData)
    if (taskType.value === "view") updateTask(taskData._id, taskData)
}

const open = (data) => {
    const { type, task } = data

    if (!["create", "view"].includes(type)) throw new Error("Invalid type")

    if (type === "create") {
        Object.assign(taskData, { title: "", description: "", user: { _id: "" }, flag: "", status: "To Do" })
        taskType.value = "create"
    }
    if (type === "view") {
        if (!task) throw new Error("Invalid task")
        taskType.value = "view"
        Object.assign(taskData, task)
    }

    taskModal.value.openModal()
}
defineExpose({ open })
</script>

<style></style>
