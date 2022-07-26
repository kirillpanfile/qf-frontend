<template>
    <div
        :class="{
            'admin-user__card-selected': user.selected,
        }"
        class="admin-user__card"
        @click="$emit('select', user._id)"
    >
        <div class="admin-user__card-content">
            <div class="admin-user__info">
                <img
                    src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                    alt="profilePic"
                    @click="dropOpen = !dropOpen"
                />
                <h1>{{ user.username }}</h1>
                <div class="admin-user__line"></div>
                <h1>{{ user.email }}</h1>
                <div class="admin-user__line hide-tablet"></div>
                <h1 class="hide-tablet role">{{ user.roles[0] }}</h1>
            </div>
            <div class="admin-user__buttons">
                <button @click.stop class="admin-user__button"><i class="fa-solid fa-pen-to-square"></i></button>
                <button @click.stop class="admin-user__button btn-danger" @click="deleteUser(user._id)">
                    <i class="fa-solid fa-trash-can"></i>
                </button>
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
