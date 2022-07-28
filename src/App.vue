<template>
    <app-navbar></app-navbar>
    <router-view to="/"></router-view>
</template>

<script>
import AppNavbar from "./components/AppNavbar.vue";
export default{
    components: {
        AppNavbar
    }
}
</script>
