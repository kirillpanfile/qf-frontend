<template>
    <div class="flex flex-col">
        <div class="overflow-x-auto">
            <div class="min-w-full inline-block align-middle">
                <div class="shadow-sm overflow-hidden">
                    <div class="px-4 justify-start items-start flex">
                        <AdminTaskList
                            v-for="(item, index) in lists"
                            :key="index"
                            :list="item.name"
                            :data="getList(item.name)"
                            :buttonFlag="index <= 1"
                            @addTask="openCreateTaskModal()">
                            <AdminTask
                                draggable="true"
                                @dragstart="startDrag($event, item)"
                                v-for="item in getList(item.name)"
                                :key="item.id"
                                :title="item.title"
                                :description="item.description"
                                :picture="item.user.picture"
                                :flag="item.flag"
                                :id="item._id"
                                @open="openTaskModal" />
                        </AdminTaskList>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <app-modal
        :title="taskData.title"
        ref="taskModal"
        :titleInput="true"
        @titleChange="(title) => (taskData.title = title)">
        <div class="grid grid-cols-6 gap-x-6">
            <div class="col-span-6">
                <app-textarea
                    v-model="taskData.description"
                    title="Description"
                    :placeholder="'Description ...'"
                    :disabled="false">
                </app-textarea>
            </div>
            <div class="col-span-6 sm:col-span-3 mb-2">
                <app-select title="Select User" :options="admins" v-model="taskData.user._id" :disabled="false">
                </app-select>
            </div>
            <div class="col-span-6 sm:col-span-3 mb-2">
                <app-select title="Flag" v-model="taskData.flag" :options="flags" :disabled="false"> </app-select>
            </div>
        </div>

        <div class="items-center py-6 border-t border-gray-200 rounded-b flex gap-4">
            <v-button
                type="button"
                bgColor="default"
                size="base"
                @btnClick="closeTaskModal(), updateTask(taskData._id, taskData)">
                Submit
            </v-button>
            <v-button type="button" bgColor="red" size="base" @btnClick="deleteTask(taskData._id), closeTaskModal()"
                >Delete</v-button
            >
        </div>
    </app-modal>

    <app-modal ref="createModal" title="Create Task" :titleInput="false">
        <div class="grid grid-cols-6 gap-x-6">
            <div class="col-span-6">
                <app-input v-model="createData.title" title="Title" placeholder="Title..." :disabled="false">
                </app-input>
            </div>
            <div class="col-span-6">
                <app-textarea
                    v-model="createData.description"
                    title="Description"
                    placeholder="Description ..."
                    :disabled="false">
                </app-textarea>
            </div>
            <div class="col-span-6 sm:col-span-3 mb-2">
                <app-select title="Select User" :options="admins" v-model="createData.user" :disabled="false">
                </app-select>
            </div>
            <div class="col-span-6 sm:col-span-3 mb-2">
                <app-select title="Flag" v-model="createData.flag" :options="flags" :disabled="false"> </app-select>
            </div>
        </div>

        <div class="items-center py-6 border-t border-gray-200 rounded-b flex gap-4">
            <v-button
                type="button"
                bgColor="default"
                size="base"
                @btnClick="createTask(createData), closeCreateTaskModal()">
                Submit
            </v-button>
        </div>
    </app-modal>
</template>

<script setup>
import { computed, onMounted } from "vue"
import { AdminTask, AdminTaskList, AppModal, AppInput, AppTextarea, AppSelect, VButton } from "@/components"
import { useTaskStore, useAdminStore, refs } from "@/store"
import { createRefs } from "@/helpers"

const { updateTask, deleteTask, getTasks, createTask } = useTaskStore()
const { tasks, flags, lists, tasksByFlag } = refs(useTaskStore())

const { getAdmins } = useAdminStore()
const { admins } = refs(useAdminStore())

const [taskModal, createModal] = createRefs(null, 2)
const [createData, taskData] = createRefs({}, 2)

const getAdmin = computed(() => admins?.value[0]?._id)

const openCreateTaskModal = () => {
    createModal.value.openModal()
    Object.assign(createData, { flag: "Low", status: lists.value[0].name, user: getAdmin.value })
}
const closeCreateTaskModal = () => createModal.value.closeModal()

const openTaskModal = (id) => {
    Object.assign(
        taskData,
        tasks.value.find((e) => e._id == id)
    )
    taskModal.value.openModal()
}

const startDrag = (event, item) => {
    event.dataTransfer.dropEffect = "move"
    event.dataTransfer.effectAllowed = "move"
    event.dataTransfer.setData("itemID", item._id)
}

const closeTaskModal = () => taskModal.value.closeModal()

const getList = computed(() => (list) => tasksByFlag.value.filter((item) => item.status === list))

onMounted(() => {
    if (admins.value == null) getAdmins()
    getTasks()
})
</script>
