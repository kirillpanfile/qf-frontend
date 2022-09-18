<template>
    <section class="w-full flex lg:flex-row flex-col h-screen items-center" v-if="remember">
        <div class="lg:w-3/5 h-screen flex items-center justify-center" v-if="!loading">
            <div class="p-16 w-full h-screen flex flex-col justify-center">
                <a
                    class="text-2xl mb-4 font-extrabold text-transparent bg-clip-text bg-gradient-to-tr hidden md:flex gap-2 text-[#2c9228] dark:text-gray-300">
                    <img src="@/assets/Logo.svg" class="w-8" alt="" />
                    QuickFood
                </a>
                <h1 class="text-3xl font-black mb-6 dark:text-gray-300">Log in.</h1>
                <p class="text-gray-400">
                    Welocem back dear admin, hope you have <br />
                    a good time cooking your food !
                </p>
                <form class="mt-8" action="#" method="POST" @submit.prevent="login">
                    <div>
                        <label class="block text-gray-700 dark:text-gray-300">Enter your username</label>
                        <input
                            type="text"
                            v-model="user.username"
                            placeholder="john.doe@gmail.com"
                            class="w-full px-4 py-2 rounded-lg mt-2 border focus:border-lime focus:bg-white focus:outline-none" />
                    </div>

                    <div class="mt-6">
                        <label class="block text-gray-700 dark:text-gray-300">Enter your password</label>
                        <input
                            type="password"
                            placeholder="***************"
                            v-model="user.password"
                            class="w-full px-4 py-2 rounded-lg mt-2 border focus:border-lime focus:bg-white focus:outline-none" />
                    </div>

                    <button
                        type="submit"
                        class="w-full block bg-lime hover:bg-green-400 text-white font-semibold rounded-lg px-4 py-2 mt-8">
                        Log In
                    </button>

                    <a class="text-lime block font-semibold mt-6"> Forgot password ?</a>
                </form>
            </div>
        </div>
        <div v-else class="lg:w-3/5 h-screen flex items-center justify-center">
            <app-loader></app-loader>
        </div>

        <div class="w-full h-full hidden lg:flex items-center justify-center p-12 bg-gray-50">
            <div class="text-center">
                <h3 class="text-lg text-gray-500">Nice to see you again</h3>
                <h1 class="text-[48px] tracking-widest font-black text-lime">Welcome Back</h1>
                <img class="max-h-[460px]" src="../../assets/Friends-have-barbecue-party.svg" alt="" />
            </div>
        </div>
    </section>
    <div v-else class="h-[100vh] flex items-center">
        <app-loader></app-loader>
    </div>
</template>

<script setup>
import { ref, reactive, onMounted } from "vue"
import { useRouter } from "vue-router"
import { useAdminStore } from "@/store"
import { useLoader } from "@/composables/useLoader.js"
import { AppLoader } from "@/components"

const loader = useLoader()
const user = reactive({ username: "", password: "", remember: false })
const { authAdmin, authRemeber } = useAdminStore()
const { push } = useRouter()
const { loading, setLoader } = loader
const remember = ref(false)

onMounted(() => {
    remember.value = false
    authRemeber().finally(() => (remember.value = true))
})

const login = () => {
    setLoader(true)
    authAdmin(user)
        .then(() => {
            push("/admin/dashboard")
            setLoader(false)
        })
        .catch(() => {
            setLoader(false)
        })
}
</script>
