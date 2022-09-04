<template>
    <li v-if="type === 'new'" class="py-3 sm:py-4 list-none cursor-pointer hover:bg-gray-100" v-wave>
        <div class="flex items-center space-x-4">
            <div class="flex-shrink-0">
                <img class="h-8 w-8 rounded-full" :src="user.picture" alt="ProfilePic" />
            </div>
            <div class="flex-1 min-w-0">
                <p class="text-sm font-medium text-gray-900 truncate">
                    {{ user.username }}
                </p>
                <p class="text-sm text-gray-500 truncate">{{ user.email }}</p>
            </div>
        </div>
    </li>
</template>

<script setup>
import { useAdminStore } from "@/store"
const admin = useAdminStore()
const { deleteUser } = admin
defineProps({
    user: {
        type: Object,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
})
</script>

<style></style>
