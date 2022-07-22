<template>
    <div
        :class="{
            'admin-user__card-selected': user.selected,
        }"
        class="admin-user__card"
        @click="$emit('select', user._id)"
    >
        <input v-model="user.selected" type="checkbox" />
        <div class="admin-user__card-content">
            <div class="admin-user__info">
                <h1>{{ user.username }}</h1>
                <div class="admin-user__line"></div>
                <h1>{{ user.email }}</h1>
                <div class="admin-user__line hide-tablet"></div>
                <h1 class="hide-tablet">Roles: '{{ user.roles }}'</h1>
            </div>
            <div class="admin-user__buttons">
                <button @click.stop class="admin-user__button">✍️</button>
                <button @click.stop class="admin-user__button btn-danger" @click="deleteUser(user._id)">✖</button>
            </div>
        </div>
    </div>
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
