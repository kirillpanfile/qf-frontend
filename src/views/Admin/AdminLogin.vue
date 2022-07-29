<template>
    <section class="w-full flex md:flex-row flex-col h-screen items-center">
        <div class="bg-lime hidden lg:block md:w-1/4 h-screen">
            <img src="../../assets/pattern.png" alt="" class="w-full h-full object-cover" />
        </div>
        <div
            v-if="!loading"
            class="bg-white w-full md:max-w-md lg:max-w-full md:mx-auto md:w-1/2 xl:w-1/3 h-screen px-6 lg:px-16 xl:px-12 flex items-center justify-center"
        >
            <div class="w-full h-100">
                <h1 class="text-xl md:text-2xl font-bold leading-tight mt-12">Log in to your account</h1>

                <form class="mt-6" action="#" method="POST" @submit.prevent="login">
                    <div>
                        <label class="block text-gray-700">Username</label>
                        <input
                            type="text"
                            v-model="user.username"
                            placeholder="Username"
                            class="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-lime focus:bg-white focus:outline-none"
                        />
                    </div>

                    <div class="mt-4">
                        <label class="block text-gray-700">Password</label>
                        <input
                            type="password"
                            placeholder="Enter Password"
                            v-model="user.password"
                            class="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-lime focus:bg-white focus:outline-none"
                        />
                    </div>

                    <div class="mt-4">
                        <input
                            type="checkbox"
                            name="remeber"
                            v-model="user.remember"
                            class="mr-2"
                            placeholder="remember"
                        />
                        <label class="text-gray-700" for="remember">Remember</label>
                    </div>
                    <button
                        type="submit"
                        class="w-full block bg-lime hover:bg-green-400 text-white font-semibold rounded-lg px-4 py-3 mt-6"
                    >
                        Log In
                    </button>
                </form>
            </div>
        </div>
        <app-loader v-else></app-loader>
    </section>
</template>

<script setup>
// imports
import { ref, reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAdminStore } from '@/store/adminStore'

const admin = useAdminStore()
const { authAdmin, authRemeber } = admin

// refs

const user = reactive({
    username: '',
    password: '',
    remember: false,
})

onMounted(() => {
    authRemeber()
})

const router = useRouter()
let loading = ref(false)

const login = () => {
    loading.value = true
    const req = {
        username: user.username,
        password: user.password,
        remember: user.remember,
    }
    authAdmin(req).then(() => {
        loading.value = false
        router.push('/admin/dashboard')
    })
}
</script>
