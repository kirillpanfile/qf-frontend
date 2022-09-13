<template>
    <admin-wrapper>
        <template #header>
            <AdminHeader @openSideMenu="openAside"></AdminHeader>
        </template>
        <template #aside>
            <AdminAside ref="sidemenu"></AdminAside>
        </template>
        <template #view>
            <router-view></router-view>
        </template>
    </admin-wrapper>

    <TaskModal v-if="taskShow" ref="taskRef" />
    <UserModal v-if="userShow" ref="userRef" />
</template>

<script setup>
import { ref, defineAsyncComponent, provide, watchEffect, onMounted } from "vue"
import { AdminHeader, AdminAside, AdminWrapper } from "@/components"
import { createRefs } from "@/helpers"
import { useAdminStore } from "@/store"

const { getRoles, loadNewUsers } = useAdminStore()

const TaskModal = defineAsyncComponent(() => import("@/components/UI/modals/TaskModal.vue"))
const UserModal = defineAsyncComponent(() => import("@/components/UI/modals/UserModal.vue"))

const [taskRef, taskShow] = createRefs([null, false])
const [userRef, userShow] = createRefs([null, false])

provide("openTaskModal", (type, task) => {
    taskShow.value = true
    watchEffect(() => taskRef.value && taskRef.value.open({ type, task }))
    stop()
})

provide("openUserModal", (type, user) => {
    userShow.value = true
    watchEffect(() => userRef.value && userRef.value.open({ type, user }))
    stop()
})

onMounted(() => {
    getRoles()
    loadNewUsers()
})

const sidemenu = ref(null)
const openAside = () => sidemenu.value.toggleAside()
</script>

<style></style>
