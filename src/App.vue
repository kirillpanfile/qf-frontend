<template>
    <router-view></router-view>
    <notifications />
</template>

<script setup></script>


<script>
import AppNavbar from "./components/AppNavbar.vue";
export default{
    components: {
        AppNavbar
    }
}
</script>
