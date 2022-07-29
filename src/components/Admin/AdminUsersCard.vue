<template>
    <tr
        class="text-gray-700 relative"
        :class="{
            'bg-lime': user.selected,
        }"
        v-ripple
        @click="$emit('select', user._id)"
    >
        <td class="px-4 py-3 hidden md:block">
            <div class="flex items-center text-sm">
                <div class="relative w-8 h-8 mr-3 rounded-full">
                    <img
                        class="object-cover w-full h-full rounded-full"
                        src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                        alt="ProfilePic"
                    />
                </div>
            </div>
        </td>
        <td class="px-4 py-3 text-sm">{{ user.username }}</td>
        <td class="px-4 py-3 text-xs">
            <p class="bg-teal-300 w-max p-1 rounded-sm">
                {{ user.roles[0] }}
            </p>
        </td>
        <td class="px-4 py-3 text-sm lg:block hidden">{{ user.email }}</td>
        <td class="px-4 py-3 text-sm">
            <div class="flex items-center space-x-4 text-sm">
                <button
                    class="flex items-center justify-between px-2 py-2 text-sm font-medium leading-5 text-purple-600 rounded-lg"
                >
                    <i class="fa-solid fa-pen-to-square"></i>
                </button>
                <button
                    @click="deleteUser(user._id)"
                    class="flex items-center justify-between px-2 py-2 text-sm font-medium leading-5 text-purple-600 rounded-lg"
                >
                    <i class="fa-solid fa-trash-can"></i>
                </button>
            </div>
        </td>
    </tr>
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
