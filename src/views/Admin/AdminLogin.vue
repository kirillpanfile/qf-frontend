<template>
    <div class="admin">
        <div class="admin__container">
            <div class="admin__login">
                <form class="admin__login-form" @submit.prevent="login" v-if="!loading">
                    <h1 class="admin__login-title">Admin Login</h1>
                    <div class="admin__login-form-group">
                        <label for="username" class="admin__login-form-label">Username</label>
                        <input type="text" id="username" class="admin__login-form-input" v-model="user.username" />
                    </div>
                    <div class="admin__login-form-group">
                        <label for="password" class="admin__login-form-label">Password</label>
                        <input type="password" id="password" class="admin__login-form-input" v-model="user.password" />
                    </div>
                    <div class="admin__login-form-group">
                        <input type="checkbox" v-model="user.remember" name="remember" />
                        <label for="remember">Remember</label>
                    </div>
                    <div class="admin__login-form-group">
                        <button v-wave type="submit" class="admin__login-form-button">Login</button>
                    </div>
                </form>
                <app-loader v-else></app-loader>
            </div>
        </div>
    </div>
</template>

<script setup>
// imports
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useAdminStore } from '@/store/adminStore'

const admin = useAdminStore()
const { authAdmin } = admin
const loading = ref(false)
const router = useRouter()

const user = reactive({ username: '', password: '', remember: false })

const login = () => {
    loading.value = true
    authAdmin(user).then(() => {
        loading.value = false
        router.push('/admin/users')
    })
}
</script>
