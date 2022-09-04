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
                            :buttonFlag="index <= 1">
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
            <div class="col-span-6 sm:col-span-3">
                <app-select title="Select User" :options="admins" v-model="taskData.user._id" :disabled="false">
                </app-select>
            </div>
            <div class="col-span-6 sm:col-span-3">
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
            <v-button type="button" bgColor="red" size="base" @btnClick="">Delete</v-button>
        </div>
    </app-modal>
</template>

<script setup>
import { computed, ref, reactive, onMounted } from "vue"
import { AdminTask, AdminTaskList, AppModal, AppTextarea, AppSelect, VButton } from "@/components"
import { useTaskStore, useAdminStore, refs } from "@/store"

const { updateTask } = useTaskStore()
const { tasks, flags, lists } = refs(useTaskStore())

const { getAdmins } = useAdminStore()
const { admins } = refs(useAdminStore())

const taskModal = ref(null)
const taskData = reactive({})

const openTaskModal = (id) => {
    const task = tasks.value.find((e) => e._id == id)
    Object.assign(taskData, task)
    taskModal.value.openModal()
}

const startDrag = (event, item) => {
    event.dataTransfer.dropEffect = "move"
    event.dataTransfer.effectAllowed = "move"
    event.dataTransfer.setData("itemID", item._id)
}

const closeTaskModal = () => taskModal.value.closeModal()

const getList = computed(() => (list) => tasks.value.filter((item) => item.status === list))

onMounted(() => getAdmins())
</script>
