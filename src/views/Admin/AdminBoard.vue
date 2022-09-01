<template>
    <div class="flex flex-col">
        <div class="overflow-x-auto">
            <div class="min-w-full inline-block align-middle">
                <div class="shadow-sm overflow-hidden">
                    <div class="px-4 justify-start items-start flex">
                        <AdminTaskList list="To Do" :data="getList('To Do')" :buttonFlag="true">
                            <AdminTask
                                    draggable="true"
                                    @dragstart="startDrag($event, item)"
                                    v-for="item in getList('To Do')"
                                    :key="item.id"
                                    :title="item.title"
                                    :description="item.description"
                                    :picture="item.user.picture"
                                    :flag="item.flag" />
                        </AdminTaskList>
                        <AdminTaskList list="In Progress" :data="getList('In Progress')" :buttonFlag="true">
                            <AdminTask
                                    draggable="true"
                                    @dragstart="startDrag($event, item)"
                                    v-for="item in getList('In Progress')"
                                    :key="item.id"
                                    :title="item.title"
                                    :description="item.description"
                                    :picture="item.user.picture"
                                    :flag="item.flag" />
                        </AdminTaskList>
                        <AdminTaskList list="For Review" :data="getList('For Review')">
                            <AdminTask
                                    draggable="true"
                                    @dragstart="startDrag($event, item)"
                                    v-for="item in getList('For Review')"
                                    :key="item.id"
                                    :title="item.title"
                                    :description="item.description"
                                    :picture="item.user.picture"
                                    :flag="item.flag" />
                        </AdminTaskList>
                        <AdminTaskList list="Done" :data="getList('Done')">
                            <AdminTask
                                draggable="true"
                                @dragstart="startDrag($event, item)"
                                v-for="item in getList('Done')"
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
import { computed } from "vue";
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

const getList = computed(() => {
    return function(list){
        return tasks.value.filter((item) => item.status === list)
    }
})
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
