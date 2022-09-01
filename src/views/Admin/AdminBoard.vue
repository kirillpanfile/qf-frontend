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
                                    :flag="item.flag"
                                    :id="item._id"
                                    @open="openTaskModal" />
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
                                    :flag="item.flag"
                                    :id="item._id"
                                    @open="openTaskModal" />
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
                                    :flag="item.flag"
                                    :id="item._id"      
                                    @open="openTaskModal" />
                        </AdminTaskList>
                        <AdminTaskList list="Open" :data="getList('Open')"> <!--TODO Open rename in Done in MongoDB-->
                            <AdminTask
                                draggable="true"
                                @dragstart="startDrag($event, item)"
                                v-for="item in getList('Open')"
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

    <app-modal :title="taskData.title" ref="taskModal" :titleInput="true" @titleChange="(title)=> taskData.title = title">
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
                    <app-select
                        title="Select User"
                        :options="admins"
                        v-model="taskData.user._id"
                        :disabled="false">
                    </app-select>
                </div>
                <div class="col-span-6 sm:col-span-3">
                    <app-select
                        title="Flag"
                        v-model="taskData.flag"
                        :options="taskFlagOptions"
                        :disabled="false">
                    </app-select>
                </div>
            </div>

            <div class="items-center py-6 border-t border-gray-200 rounded-b flex gap-4">
                <app-button
                    text="Ok"
                    @btnClick="closeTaskModal(), updateTask(taskId, taskData)"></app-button>
                <app-button text="Delete" @btnClick=""></app-button>
            </div>
    </app-modal>

</template>

<script setup>
import { storeToRefs } from "pinia"
import { computed, ref, reactive, onMounted } from "vue";
import { AdminTask, AdminTaskList, AppModal, AppTextarea, AppSelect, AppButton } from "@/components"
import { useTaskStore } from "@/store/taskStore"
import { useAdminStore } from "@/store/adminStore"

const task = useTaskStore()
const { updateTask } = task
const { getAdmins } = useAdminStore()
const { admins } = storeToRefs(useAdminStore())
const { tasks } = storeToRefs(task)

const taskModal = ref(null)

const taskData = reactive({
    title: null,
    description: null,
    flag: "Low",
    status: '',
    user: null,
    _id: ''
})

const taskFlagOptions = ref([
    { name: "Low", _id: "Low" },
    { name: "Normal", _id: "Normal" },
    { name: "High", _id: "High" },
    { name: "Urgent", _id: "Urgent" },
])

let taskId = ref(null)

const openTaskModal = (id) => {
    taskId.value = id
    const taskValues = tasks.value.find((item) => item._id == id)
    //! Garbaj
    taskData.title = taskValues.title
    taskData.description = taskValues.description
    taskData.flag = taskValues.flag
    taskData.user = taskValues.user
    taskData.status = taskValues.status
    taskData._id = taskValues._id

    taskModal.value.openModal()
}

const closeTaskModal = () => taskModal.value.closeModal()

const startDrag = (event, item) => {
    console.log(event.target)
    event.dataTransfer.dropEffect = "move"
    event.dataTransfer.effectAllowed = "move"
    event.dataTransfer.setData("itemID", item._id)
}

const getList = computed(() => {
    return function(list){
        return tasks.value.filter((item) => item.status === list)
    }
})

onMounted(() => {
    getAdmins()
})
</script>
