<template>
    <div class="admin">
        <div class="admin__container">
            <div class="admin__login">
                <form class="admin__login-form" @submit.prevent="login" v-if="!loading">
                    <h1 class="admin__login-title">Admin Login</h1>
                    <div class="admin__login-form-group">
                        <label for="username" class="admin__login-form-label">Username</label>
                        <input type="text" id="username" class="admin__login-form-input" v-model="username" />
                    </div>
                    <div class="admin__login-form-group">
                        <label for="password" class="admin__login-form-label">Password</label>
                        <input type="password" id="password" class="admin__login-form-input" v-model="password" />
                    </div>
                    <div class="admin__login-form-group">
                        <button type="submit" class="admin__login-form-button">Login</button>
                    </div>
                </form>
                <app-loader v-else></app-loader>
            </div>
        </div>
    </div>
</template>

<script setup>
// imports
import { ref } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { notify } from '@kyvg/vue3-notification'

// refs
const username = ref('')
const password = ref('')
const store = useStore()
const router = useRouter()

const loading = ref(false)

const login = () => {
    loading.value = true

    store
        .dispatch('admin/authAdmin', { username: username.value, password: password.value })
        .then(() => {
            if (store.state.admin.accessToken) {
                loading.value = false
                router.push('/admin')
                notify({
                    text: 'Login successful :)',
                })
            }
            loading.value = false
        })
        .catch((err) => {
            loading.value = false
        })
}
</script>

<style scoped></style>
