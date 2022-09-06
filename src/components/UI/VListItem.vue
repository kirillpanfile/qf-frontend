<template>
    <li v-if="type === 'user'" class="py-3 sm:py-4 list-none cursor-pointer hover:bg-gray-100 entranceFromRight">
        <div class="flex items-center space-x-4 px-2">
            <div class="flex-shrink-0">
                <img class="w-8 h-8 rounded-full object-cover" :src="picture" lt="ProfilePic" />
            </div>
            <div class="flex-1 min-w-0">
                <p class="text-sm font-medium text-gray-900 truncate dark:text-white">{{ name }}</p>
                <p class="text-sm text-gray-500 truncate dark:text-gray-400">{{ aditional }}</p>
            </div>
            <div v-if="flag" class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                {{ flag }}
            </div>
        </div>
    </li>

    <li v-else-if="type === 'recipe'" class="py-3 sm:py-4 list-none cursor-pointer hover:bg-gray-100 entranceFromRight">
        <div class="items-center space-x-4 px-2 grid grid-cols-5">
            <div class="flex-1 min-w-0 col-span-3">
                <p class="text-sm text-gray-500 truncate dark:text-gray-400">{{ aditional }}</p>
            </div>
            <div class="flex-1 min-w-0 col-span-2">
                <p class="text-sm font-medium text-gray-900 truncate dark:text-white">{{ name }}</p>
            </div>
        </div>
    </li>
</template>

<script setup>
defineProps({
    picture: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    aditional: {
        type: String,
    },
    type: {
        type: String,
        required: true,
        validator: (value) => ["user"].includes(value),
    },
    flag: String,
})
</script>

<style></style>
