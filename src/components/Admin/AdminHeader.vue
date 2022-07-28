<template>
    <header class="z-10 py-4 bg-white shadow-md">
        <div
            class="container max-w-7xl flex items-center md:justify-end justify-between h-full px-6 mx-auto text-purple-600"
        >
            <button class="p-1 mr-5 -ml-1 rounded-md md:hidden" @click="$emit('toggleSideMenu')" aria-label="Menu">
                <i class="fa-solid fa-bars"></i>
            </button>
            <ul class="flex flex-shrink-0 space-x-6">
                <li class="relative flex gap-8">
                    <button class="relative align-middle rounded-md cursor-default">
                        <i class="fa-solid fa-bell cursor-pointer" @click="notificationsOpen = !notificationsOpen"></i>
                        <div
                            class="flex-col flex gap-2 w-60 bg-white shadow-sm absolute top-12 -right-24 p-3"
                            v-if="notificationsOpen"
                        >
                            <div class="flex justify-between items-center">
                                <!-- Header -->
                                <h1 class="font-extrabold">Notifications</h1>
                                <button class="text-xs text-white bg-lime px-3 py-1 font-bold">Read all</button>
                            </div>

                            <div class="w-auto bg-black opacity-20 h-xs"></div>
                            <!-- Line -->

                            <div
                                class="flex items-center gap-2 flex-shrink-0 border-b-1 border-black/20"
                                v-for="item in newNotifications"
                            >
                                <i class="fa-solid fa-circle text-xsm text-lime"></i>
                                <!-- circle -->
                                <div class="pb-2 text-left">{{ item }}</div>
                                <!-- notification-text -->
                            </div>
                            <router-link to="/admin/notifications" @click="notificationsOpen = !notificationsOpen">
                                <button class="px-4 py-2 bg-lime text-white">Show all notifications</button>
                            </router-link>
                        </div>
                    </button>
                    <button class="relative align-middle rounded-md" @click="logOut">
                        <i class="fa-solid fa-arrow-right-from-bracket"></i>
                    </button>
                </li>
                <li class="relative">
                    <button class="align-middle rounded-full focus:shadow-outline-purple focus:outline-none">
                        <img
                            class="object-cover w-8 h-8 rounded-full"
                            src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                            alt="profilePic"
                            @click="dropOpen = !dropOpen"
                            aria-hidden="true"
                        />
                    </button>
                    <ul class="absolute bg-white w-max px-5 right-0 top-12" v-if="dropOpen">
                        <li class="admin-header__item">
                            <i class="fa-solid fa-user"></i>
                            <span>{{ user.username }}</span>
                        </li>
                        <li class="admin-header__item">
                            <i class="fa-solid fa-crown"></i>
                            <span>{{ role }}</span>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
    </header>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useAdminStore } from '@/store/adminStore'
import { usePostStore } from '@/store/postStore'
import { storeToRefs } from 'pinia'
const admin = useAdminStore()
const postStore = usePostStore()
const { newNotifications } = storeToRefs(postStore)
const dropOpen = ref(false)
const notificationsOpen = ref(false)
const { user } = storeToRefs(admin) // state
const { logOut } = admin // actions

//user
const role = computed(() => (user?.value.roles.includes('ROLE_ADMIN') ? 'SuperAdmin' : 'Moderator'))
</script>

<style>
.text-xsm {
    font-size: 0.5rem;
}
.h-xs {
    height: 1px;
}
.border-b-1 {
    border-bottom-width: 1px;
}
</style>
