<template>
    <div class="max-w-[30rem] mb-4">
        <div class="shadow-sm p-5 bg-white dark:bg-gray-800 rounded-lg flex flex-col cursor-move select-none">
            <div class="pb-1 justify-between items-center flex">
                <h2 class="text-gray-900 dark:text-gray-300 font-semibold text-base">
                    {{ title }}
                </h2>
                <button type="button" class="text-gray-900 dark:text-gray-300 font-semibold text-base p-1">
                    <i class="fa-solid fa-pen-to-square" @click="$emit('open', id)"></i>
                </button>
            </div>
            <div class="flex flex-col">
                <p class="text-gray-900 dark:text-gray-300 font-normal text-sm pb-4">
                    {{ description }}
                </p>
                <div class="flex justify-between items-center">
                    <div class="w-8 h-8 flex items-center justify-center text-xl rounded-full overflow-hidden">
                        <img :src="picture" class="object-cover w-full h-full" alt="ProfilePic" />
                    </div>

                    <div
                        class="py-1 px-4 h-min rounded-lg text-sm text-white"
                        :class="
                            flag == 'Low'
                                ? 'bg-gray-400'
                                : flag == 'Normal'
                                ? 'bg-blue-400'
                                : flag == 'High'
                                ? 'bg-yellow-500'
                                : 'bg-red-500'
                        ">
                        {{ flag }}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
defineProps({
    title: { required: true, type: String },
    description: { required: true, type: String },
    picture: { required: true, type: String },
    flag: { required: true, type: String },
    id: { required: true, type: String },
})
defineEmits(["open"])
</script>
