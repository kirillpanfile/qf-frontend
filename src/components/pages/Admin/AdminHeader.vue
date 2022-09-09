<template>
    <nav
        class="bg-white border-b border-gray-200 fixed z-30 w-full dark:bg-gray-800 dark:border-gray-900 dark:shadow-dark-xl">
        <div class="px-3 py-3 lg:px-5 lg:pl-3">
            <div class="flex items-center justify-between">
                <div class="flex items-center gap-12">
                    <a
                        class="text-xl font-extrabold text-transparent bg-clip-text bg-gradient-to-tr hidden md:flex gap-2 text-[#2c9228] dark:text-gray-300">
                        <img src="@/assets/Logo.svg" class="w-6" alt="" />
                        QuickFood
                    </a>
                    <div class="flex md:hidden flex-col gap-[6px] cursor-pointer" @click="$emit('openSideMenu')">
                        <div class="w-8 h-1 rounded-sm bg-lime"></div>
                        <div class="w-8 h-1 rounded-sm bg-lime"></div>
                        <div class="w-8 h-1 rounded-sm bg-lime"></div>
                    </div>
                </div>

                <div class="flex flex-row gap-10 items-center">
                    <div class="flex items-center gap-2">
                        <img class="object-cover w-10 h-10 rounded-full" :src="user.picture" alt="profilePic"
                            @click="dropOpen = !dropOpen" />
                        <div>
                            <h2 class="text-sm font-bold leading-none dark:text-gray-300" v-if="user?.username">
                                {{ user.username }}
                            </h2>
                            <span class="text-sm text-gray-400">{{ role }}</span>
                        </div>
                    </div>
                    <div class="relative flex gap-4">
                        <button
                            class="relative transition-colors dark:bg-slate-700 dark:text-gray-300 bg-gray-50 p-1 rounded-full w-10 h-10"
                            type="button" @click="changePref">
                            <i class="fa-duotone fa-moon" v-if="!darkMode"></i>
                            <i class="fa-solid fa-sun-bright" v-else></i>
                        </button>
                        <button
                            class="relative transition-colors dark:bg-slate-700 dark:text-gray-300 bg-gray-50 p-1 rounded-full w-10 h-10"
                            type="button" @click="notificationsOpen = !notificationsOpen">
                            <i class="fa-light fa-bell text-xl cursor-pointer"></i>
                        </button>
                        <AdminNotificationMenu v-if="notificationsOpen" @close="notificationsOpen = false" />
                        <button
                            class="relative transition-colors dark:bg-slate-700 dark:text-gray-300 bg-gray-50 p-1 rounded-full w-10 h-10"
                            @click="logOut" type="button">
                            <i class="fa-solid fa-arrow-right-from-bracket"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </nav>
</template>

<script setup>
import { computed, ref, onMounted, watch } from "vue"
import { useAdminStore, refs } from "@/store"
import { AdminNotificationMenu } from "@/components"
import { UseCookie } from "@/composables/useCookie"
const { updateCookie, getCookie } = UseCookie()


const dropOpen = ref(false),
    notificationsOpen = ref(false),
    { user } = refs(useAdminStore()),
    { logOut } = useAdminStore(),
    darkMode = ref(null)

const changePref = () => {
    let cookie = getCookie("darkMode")
    if (cookie == 'false')
        updateCookie("darkMode", 'true')

    else if (cookie == 'true')
        updateCookie("darkMode", 'false')

    darkMode.value = JSON.parse(getCookie("darkMode"))
}

onMounted(() => {
    darkMode.value = JSON.parse(getCookie("darkMode"))
})

watch(darkMode, (newVal, oldVal) => {
    if (newVal == false)
        document.documentElement.setAttribute('class', 'dark')

    else if (newVal == true)
        document.documentElement.setAttribute('class', 'light')
})

const role = computed(() => (user.value?.roles?.includes("ROLE_SUPER_ADMIN") ? "Admin" : "Moderator"))

defineEmits(["openSideMenu"])
</script>
