<template>
    <main class="dark-scroll">
        <router-view></router-view>
        <notifications />
    </main>
</template>

<script setup>
import router from "./router"
import { onMounted } from "vue"
import { useCookie } from "@/composables/useCookie"

const { getCookie, setCookie } = useCookie()

onMounted(() => {
    if (!getCookie("darkMode")) setCookie("darkMode", "false")

    window.addEventListener("beforeunload", (e) => {
        localStorage.setItem("lastPath", router.currentRoute.value.path)
    })
})
</script>
