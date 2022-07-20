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
                <div class="admin-user__line"></div>
                <h1>Roles: '{{ roles }}'</h1>
            </div>
            <div class="admin-user__buttons">
                <button @click.stop class="admin-user__button btn-primary">✍️</button>
                <button @click.stop class="admin-user__button btn-danger" @click="deleteUser">✖</button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex'
const store = useStore()
const props = defineProps({
    user: {
        type: Object,
        required: true,
    },
})

const roles = computed(() => props.user.roles)
const deleteUser = () => store.dispatch('admin/deleteUser', props.user._id)
</script>

<style></style>
