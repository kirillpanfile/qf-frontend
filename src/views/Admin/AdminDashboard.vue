<template>
    <h1 class="my-6 text-2xl font-semibold text-gray-700">Dashboard</h1>

    <a
        href="https://github.com/kirillpanfile/qf-frontend"
        target="_blank"
        v-ripple
        class="flex items-center justify-between sm:p-3 p-4 mb-8 text-sm shrink font-semibold bg-lime rounded-lg shadow-md text-white"
    >
        <div class="flex items-center">
            <i class="fa-solid fa-code-branch w-5 mr-2"></i>
            <span>See this project on Github</span>
        </div>
        <span>View more -></span>
    </a>

    <div class="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-4">
        <AdminDashCard text="Total Users" count="2320" color="orange" icon="fa-solid fa-user-check" />
        <AdminDashCard text="New Users" count="140" color="green" icon="fa-solid fa-user-pen" />
        <AdminDashCard text="New Recepies" count="100" color="blue" icon="fa-solid fa-pizza-slice" />
        <AdminDashCard text="New Ingredients" count="100" color="teal" icon="fa-solid fa-carrot" />
    </div>
    <h1 class="my-6 text-2xl font-semibold text-gray-700">New Users</h1>

    <div class="w-full overflow-hidden rounded-lg shadow-xs">
        <div class="w-full overflow-y-scroll">
            <div class="w-full whitespace-nowrap">
                <div>
                    <div
                        class="text-xs font-semibold flex justify-between tracking-wide text-left text-gray-500 uppercase border-b bg-gray-50 mb-2"
                    >
                        <div class="pb-4 md:block hidden">Pic</div>
                        <div class="pb-4">User</div>
                        <div class="pb-4 md:block hidden">Role</div>
                        <div class="pb-4 lg:block hidden">Email</div>
                        <div class="pb-4">Action</div>
                    </div>
                </div>
                <div class="bg-white divide-y overflow-x-scroll max-h-96">
                    <admin-users-card
                        v-for="(item, index) in newUsers"
                        :key="index"
                        :user="item"
                        @select="newUsers"
                    ></admin-users-card>
                </div>
            </div>
        </div>
    </div>
    <h1 class="my-6 text-2xl font-semibold text-gray-700">Charts</h1>

    <div class="grid gap-6 mb-8 mt-14">
        <div class="min-w-0 p-4 sm:p-0 bg-white rounded-lg shadow-xs">
            <div class="chartjs-size-monitor">
                <div class="chartjs-size-monitor-expand"><div class=""></div></div>
                <div class="chartjs-size-monitor-shrink"><div class=""></div></div>
            </div>
            <h4 class="mb-4 font-semibold text-gray-800 dark:text-gray-300">Traffic</h4>
            <AdminChart :width="chartData.width" :height="chartData.height" class="block w-full h-full" />
        </div>
    </div>
</template>
<script setup>
import AdminUsersCard from '@/components/Admin/AdminUsersCard.vue'
import AdminDashCard from '@/components/Admin/AdminDashCard.vue'
import AdminChart from '@/components/Admin/AdminChart.vue'
import { onMounted } from 'vue'
import { useAdminStore } from '@/store/adminStore'
import { storeToRefs } from 'pinia'

const admin = useAdminStore()
const { loadNewUsers } = admin
const { newUsers } = storeToRefs(admin)

const chartData = {
    width: 1144,
    height: 532,
}
onMounted(() => loadNewUsers())
</script>

<style>
.w-400 {
    max-width: 500px;
    width: 100%;
}
.chart > div > canvas {
    display: block;
    position: relative !important;
    width: 100%;
}
</style>
