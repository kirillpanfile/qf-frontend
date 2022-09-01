<template>
    <div class="flex flex-col">
        <div class="overflow-x-auto">
            <div class="min-w-full inline-block align-middle">
                <div class="shadow-sm overflow-hidden">
                    <div class="px-4 justify-start items-start flex">
                        <div class="min-w-[30rem] p-4">
                            <h1 class="text-gray-900 font-semibold text-base py-4">
                                To Do
                            </h1>
                            <div
                                class="drag-zone min-h-20"
                                @drop="onDrop($event, 'To Do')"
                                @dragenter.prevent
                                @dragover.prevent>
                                <AdminTask
                                    draggable="true"
                                    @dragstart="startDrag($event, item)"
                                    v-for="(item, index) in getList('To Do')"
                                    :key="item.id"
                                    :title="item.title"
                                    :description="item.description"
                                    :picture="item.user.picture"
                                    :flag="item.flag" />
                            </div>

                            <button
                                type="button"
                                class="text-gray-600 w-full font-bold border-dashed border-2 border-gray-300 rounded-lg py-2">
                                + Add another Task
                            </button>
                        </div>
                        <div class="min-w-[30rem] p-4">
                            <h1 class="text-gray-900 font-semibold text-base py-4">
                                In Progress
                            </h1>

                            <div
                                class="drag-zone min-h-[2rem]"
                                @drop="onDrop($event, 'In Progress')"
                                @dragenter.prevent
                                @dragover.prevent>
                                <AdminTask
                                    draggable="true"
                                    @dragstart="startDrag($event, item)"
                                    v-for="(item, index) in getList('In Progress')"
                                    :key="item.id"
                                    :title="item.title"
                                    :description="item.description"
                                    :picture="item.user.picture"
                                    :flag="item.flag" />
                            </div>

                            <button
                                type="button"
                                class="text-gray-600 w-full font-bold border-dashed border-2 border-gray-300 rounded-lg py-2">
                                + Add another Task
                            </button>
                        </div>
                        <div class="min-w-[30rem] p-4">
                            <h1 class="text-gray-900 font-semibold text-base py-4">
                                For Review
                            </h1>

                            <div
                                class="drag-zone min-h-[2rem]"
                                @drop="onDrop($event, 'For Review')"
                                @dragenter.prevent
                                @dragover.prevent>
                                <AdminTask
                                    draggable="true"
                                    @dragstart="startDrag($event, item)"
                                    v-for="(item, index) in getList('For Review')"
                                    :key="item.id"
                                    :title="item.title"
                                    :description="item.description"
                                    :picture="item.user.picture"
                                    :flag="item.flag" />
                            </div>
                        </div>
                        <AdminTaskList>
                            <AdminTask
                                draggable="true"
                                @dragstart="startDrag($event, item)"
                                v-for="(item, index) in getList('Done')"
                                :key="item.id"
                                :title="item.title"
                                :description="item.description"
                                :picture="item.user.picture"
                                :flag="item.flag" />
                        </AdminTaskList>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from "vue"
import { AdminTask, AdminTaskList } from "@/components"
import { useTaskStore } from "@/store/taskStore"
import { storeToRefs } from "pinia"
const task = useTaskStore()
const { tasks } = storeToRefs(task)
const { updateTask } = task

console.log(tasks)

const startDrag = (event, item) => {
    console.log(event.target)
    event.dataTransfer.dropEffect = "move"
    event.dataTransfer.effectAllowed = "move"
    event.dataTransfer.setData("itemID", item._id)
}

const onDrop = async (event, list) => {
    const itemID = event.dataTransfer.getData("itemID")
    await updateTask(event.dataTransfer.getData("itemID"), list)
}

const getList = (list) => tasks.value.filter((item) => item.status === list)
</script>

<style>
.drop-zone {
    width: 50%;
    margin: 50px auto;
    background-color: #ecf0f1;
    padding: 10px;
    min-height: 10px;
}

.drag_el {
    background-color: #fff;
    padding: 10px;
    opacity: 1;
    margin: 10px;
    border-radius: 5px;
    cursor: move;
}
</style>
