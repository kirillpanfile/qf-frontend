<template>
    <transition name="fade">
        <div class="bg-white w-80 shadow-md absolute top-14 -right-0 rounded-md overflow-hidden">
            <h1 class="block py-2 px-4 font-medium text-center text-gray-700 bg-gray-50">Notifications</h1>

            <main v-for="item in newNotifications">
                <router-link to="" class="flex py-3 px-4 hover:bg-gray-100 border-b border-gray-400/10">
                    <div class="pl-3 w-full">
                        <div class="text-gray-500 text-sm mb-1.5">
                            <span class="font-semibold text-gray-900">@{{ item.username }}</span> {{ item.message }}
                            <span class="font-medium text-blue-500">#pending #hot </span>
                        </div>
                        <div class="text-xs text-blue-600">1 hour ago</div>
                    </div>
                </router-link>
            </main>
            <router-link
                to="/admin/notifications"
                class="block py-2 text-sm font-medium text-center text-gray-900 bg-gray-50 hover:bg-gray-100"
            >
                <div class="flex items-center justify-center">
                    <i class="fa-solid fa-eye mr-2 flex items-center text-gray-500"></i>
                    <span>View all</span>
                </div>
            </router-link>
        </div>
    </transition>
</template>

<script setup>
import { usePostStore } from '@/store/postStore'
import { storeToRefs } from 'pinia'
const postStore = usePostStore()
const { newNotifications } = storeToRefs(postStore)
</script>
