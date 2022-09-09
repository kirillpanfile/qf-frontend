<template>
    <main class="dark-scroll">
        <router-view></router-view>
        <notifications />
    </main>
</template>

<script setup>
import router from "./router"
import { onMounted } from "vue"

onMounted(() => {
    window.addEventListener("beforeunload", (e) => {
        localStorage.setItem("lastPath", router.currentRoute.value.path)
    })
})
</script>
