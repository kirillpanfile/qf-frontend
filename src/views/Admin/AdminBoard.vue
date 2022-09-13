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
                            @addTask="openTaskCreate()">
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
                                @open="openTaskView(item)" />
                        </AdminTaskList>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { computed, onMounted, inject } from "vue"
import { AdminTask, AdminTaskList } from "@/components"
import { useTaskStore, useAdminStore, refs } from "@/store"

const openTask = inject("openTaskModal")
const openTaskCreate = () => openTask("create", {})
const openTaskView = (item) => openTask("view", item)

const { getTasks } = useTaskStore()
const { lists, tasksByFlag } = refs(useTaskStore())

const { getAdmins } = useAdminStore()
const { admins } = refs(useAdminStore())

const startDrag = (event, item) => {
    event.dataTransfer.dropEffect = "move"
    event.dataTransfer.effectAllowed = "move"
    event.dataTransfer.setData("itemID", item._id)
}

const getList = computed(() => (list) => tasksByFlag.value.filter((item) => item.status === list))

onMounted(() => {
    if (admins.value == null) getAdmins()
    getTasks()
})
</script>
