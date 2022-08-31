<template>
    <div class="flex flex-col">
        <div class="overflow-x-auto">
            <div class="min-w-full inline-block align-middle">
                <div class="shadow-sm overflow-hidden">
                    <div class="px-4 justify-start items-start flex">
                        <div class="min-w-[30rem]">
                            <h1 class="text-gray-900 font-semibold text-base py-4">
                                To Do
                            </h1>

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
                                class="drag-zone"
                                @drop="onDrop($event, 'In Progress')"
                                @dragenter.prevent
                                @dragover.prevent>
                                <div
                                    class="max-w-[30rem] mb-4"
                                    draggable="true"
                                    @dragstart="startDrag($event, item)"
                                    v-for="(item, index) in items"
                                    :key="item.id">
                                    <div
                                        class="shadow-sm p-5 bg-white rounded-lg flex flex-col cursor-move select-none">
                                        <div
                                            class="pb-1 justify-between items-center flex">
                                            <h2
                                                class="text-gray-900 font-semibold text-base">
                                                Update Form Validation
                                            </h2>
                                            <button
                                                type="button"
                                                class="text-gray-900 font-semibold text-base p-1">
                                                <i class="fa-solid fa-pen-to-square"></i>
                                            </button>
                                        </div>
                                        <div class="flex flex-col">
                                            <p
                                                class="text-gray-900 font-normal text-sm pb-4">
                                                In _variables.scss on line 672 you define
                                                $table_variants. Each instance of
                                                "color-level" needs to be changed to
                                                "shift-color".
                                            </p>
                                            <div
                                                class="flex justify-between items-center">
                                                <div
                                                    class="w-8 h-8 flex items-center justify-center text-xl rounded-full border-dashed border overflow-hidden">
                                                    <img src="#" alt="ProfilePic" />
                                                </div>

                                                <div
                                                    class="bg-red-600 py-1 px-4 h-min rounded-lg text-sm text-white">
                                                    Urgent
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <button
                                type="button"
                                class="text-gray-600 w-full font-bold border-dashed border-2 border-gray-300 rounded-lg py-2">
                                + Add another Task
                            </button>
                        </div>
                        <div class="min-w-[30rem] p-4">
                            <h1 class="text-gray-900 font-semibold text-base py-4">
                                For review
                            </h1>
                        </div>
                        <div class="min-w-[30rem] p-4">
                            <h1 class="text-gray-900 font-semibold text-base py-4">
                                Done
                            </h1>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div
        class="drop-zone"
        @drop="onDrop($event, 'In Progress')"
        @dragenter.prevent
        @dragover.prevent>
        <div
            v-for="(item, index) in getList('In Progress')"
            :key="index"
            class="drag_el"
            draggable="true"
            @dragstart="startDrag($event, item)">
            {{ item.title }}
        </div>
    </div>

    <div
        class="drop-zone"
        @drop="onDrop($event, 'To Do')"
        @dragenter.prevent
        @dragover.prevent>
        <div
            v-for="(item, index) in getList('To Do')"
            :key="index"
            class="drag_el"
            draggable="true"
            @dragstart="startDrag($event, item)">
            {{ item.title }}
        </div>
    </div>
</template>

<script setup>
import { ref } from "vue"

const items = ref([
    {
        id: 1,
        title: "Update Form Validation",
        description:
            'In _variables.scss on line 672 you define $table_variants. Each instance of "color-level" needs to be changed to "shift-color".',
        user: {
            picture:
                "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
        },
        flag: "Urgent",
        status: "In Progress",
    },
    {
        id: 2,
        title: "Update Form Validation",
        description:
            'In _variables.scss on line 672 you define $table_variants. Each instance of "color-level" needs to be changed to "shift-color".',
        user: {
            picture:
                "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
        },
        flag: "Urgent",
        status: "In Progress",
    },
    {
        id: 3,
        title: "Update Form Validation",
        description:
            'In _variables.scss on line 672 you define $table_variants. Each instance of "color-level" needs to be changed to "shift-color".',
        user: {
            picture:
                "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
        },
        flag: "Urgent",
        status: "In Progress",
    },
    {
        id: 4,
        title: "Update Form Validation",
        description:
            'In _variables.scss on line 672 you define $table_variants. Each instance of "color-level" needs to be changed to "shift-color".',
        user: {
            picture:
                "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
        },
        flag: "Urgent",
        status: "To Do",
    },
    {
        id: 5,
        title: "Update Form Validation",
        description:
            'In _variables.scss on line 672 you define $table_variants. Each instance of "color-level" needs to be changed to "shift-color".',
        user: {
            picture:
                "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
        },
        flag: "Urgent",
        status: "To Do",
    },
])

const startDrag = (event, item) => {
    console.log(event.target)
    event.dataTransfer.dropEffect = "move"
    event.dataTransfer.effectAllowed = "move"
    event.dataTransfer.setData("itemID", item.id)
}

const onDrop = (event, list) => {
    const itemID = event.dataTransfer.getData("itemID")
    const item = items.value.find((item) => item.id == itemID)
    item.status = list
    console.log(item)
}

const getList = (list) => items.value.filter((item) => item.status === list)
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