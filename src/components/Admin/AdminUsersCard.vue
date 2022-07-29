<template>
    <div class="flex gap-2 sm:grid sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 py-3 px-4 w-auto items-center" :class="{'bg-lime': user.selected}" v-ripple @click="$emit('select', user._id)">
        <div class="relative w-8 h-8 mr-3 rounded-full hidden md:block">
            <img class="object-cover w-full h-full rounded-full" src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" alt="ProfilePic">
        </div>
        <div class="text-sm">{{ user.username }}</div>
        <div class="text-xs justify-self-center">
            <p class="bg-teal-300 w-max p-1 rounded-sm">
                {{ user.roles[0] }}
            </p>
        </div>
        <div class="text-sm lg:block hidden">{{ user.email }}</div>
        <div class="text-sm justify-self-end">
            <div class="flex items-center space-x-2 md:space-x-4 text-sm">
                <button class="flex items-center justify-between px-2 py-2 text-sm font-medium leading-5 text-purple-600 rounded-lg">
                    <i class="fa-solid fa-pen-to-square"></i>
                </button>
                <button @click="deleteUser(user._id)" class="flex items-center justify-between px-2 py-2 text-sm font-medium leading-5 text-purple-600 rounded-lg">
                    <i class="fa-solid fa-trash-can"></i>
                </button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useAdminStore } from '@/store/adminStore'
const admin = useAdminStore()
const { deleteUser } = admin
defineProps({
    user: {
        type: Object,
        required: true,
    },
})
</script>

<style></style>
