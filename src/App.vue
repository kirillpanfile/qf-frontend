<template>
    <router-view></router-view>
    <notifications />
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

<style>
::-webkit-scrollbar {
    width: 6px;
    height: 6px;
}

/* Track */
::-webkit-scrollbar-track {
    background: #f1f1f1;
}

/* Handle */
::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 10px;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
    background: #555;
}
</style>
