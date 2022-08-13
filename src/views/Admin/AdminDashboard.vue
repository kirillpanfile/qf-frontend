<template>
    <main class="pt-6 px-4">
        <div class="w-full grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-4">
            <div class="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8 2xl:col-span-2">
                <div class="flex items-center justify-between mb-4">
                    <div>
                        <span class="text-2xl sm:text-3xl leading-none font-bold text-gray-900">12</span>
                        <h3 class="text-base font-normal text-gray-500">New users this week</h3>
                    </div>
                    <div class="flex items-center justify-end flex-1 text-lime text-base font-bold">12.5%</div>
                </div>
                <AdminChart :width="chartData.width" :height="chartData.height" class="block w-full h-full" />
            </div>
            <div class="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8">
                <div class="flex items-center justify-between mb-4">
                    <div>
                        <span class="text-2xl sm:text-3xl leading-none font-bold text-gray-900">New Recipes</span>
                        <h3 class="text-base font-normal text-gray-500">Incomming from users</h3>
                    </div>
                    <div class="text-sm cursor-pointer font-medium text-lime hover:bg-gray-100 rounded-lg p-2">
                        view all
                    </div>
                </div>
                <header class="grid grid-cols-4 bg-gray-50 p-3 rounded-t-lg border-b">
                    <span class="col-span-2 text-gray-500">Title</span>
                    <span class="text-gray-500">User</span>
                    <span class="text-gray-500">Status</span>
                </header>
                <!--vfor 10 items-->
                <div>
                    <!--! Component AdminListItem.vue-->
                    <div class="grid grid-cols-4 p-3 items-center">
                        <span class="col-span-2 text-gray-500">Lorem Ipsum dolor sit...</span>
                        <span class="text-black font-bold">kirillpan...</span>
                        <span class="text-yellow-500">Pending</span>
                    </div>
                    <!-------------->

                    <div class="grid grid-cols-4 p-3 items-center bg-gray-50 rounded-md">
                        <span class="col-span-2 text-gray-500">Lorem Ipsum dolor sit...</span>
                        <span class="text-gray-500">User</span>
                        <span class="text-lime">Approved</span>
                    </div>
                    <div class="grid grid-cols-4 p-3 items-center">
                        <span class="col-span-2 text-gray-500">Lorem Ipsum dolor sit...</span>
                        <span class="text-black font-bold">kirillpan...</span>
                        <span class="text-red-600">Rejected</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="w-full grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-4"></div>
    </main>
    <!-- <h1 class="my-6 text-2xl font-semibold text-gray-700">Dashboard</h1>
    
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
            <div class="bg-white divide-y overflow-y-scroll max-h-96">
                <admin-users-card
                    v-for="(item, index) in newUsers"
                    :key="index"
                    :user="item"
                    @select="newUsers"
                ></admin-users-card>
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

    <main class="flex">
        <div class="w-3/4">
            <input type="text" class="w-full bg-gray-50" />
        </div>
        <div class="w-1/3">1</div>
    </main> -->
</template>
<script setup>
import { AdminUsersCard, AdminDashCard, AdminChart } from '@/components'
import { onMounted } from 'vue'
import { useAdminStore } from '@/store/adminStore'
import { storeToRefs } from 'pinia'

const { loadNewUsers } = useAdminStore()
const { newUsers } = storeToRefs(useAdminStore())

onMounted(() => loadNewUsers())

const chartData = { width: 1144, height: 532 }
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
