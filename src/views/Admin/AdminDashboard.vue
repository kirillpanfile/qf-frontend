<template>
    <h1 class="my-6 text-2xl font-semibold text-gray-700">Dashboard</h1>

    <a
        href="https://github.com/kirillpanfile/qf-frontend"
        target="_blank"
        v-wave
        class="flex items-center justify-between p-4 mb-8 text-sm font-semibold bg-lime rounded-lg shadow-md text-white"
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

    <div class="w-full overflow-hidden rounded-lg shadow-xs">
        <div class="w-full overflow-x-auto max-h-96 overflow-y-scroll">
            <table class="w-full whitespace-nowrap">
                <thead>
                    <tr
                        class="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b bg-gray-50 mb-2"
                    >
                        <th class="pb-4 md:block hidden">Pic</th>
                        <th class="pb-4">User</th>
                        <th class="pb-4">Role</th>
                        <th class="pb-4 lg:block hidden">Email</th>
                        <th class="pb-4">Action</th>
                    </tr>
                </thead>
                <tbody class="bg-white divide-y">
                    <admin-users-card
                        v-wave
                        v-for="(item, index) in newUsers"
                        :key="index"
                        :user="item"
                        @select="newUsers"
                    ></admin-users-card>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useAdminStore } from '@/store/adminStore'
import AdminUsersCard from '@/components/Admin/AdminUsersCard.vue'
import AdminDashCard from '@/components/Admin/AdminDashCard.vue'
import { storeToRefs } from 'pinia'
const admin = useAdminStore()
const { loadNewUsers } = admin
const { newUsers } = storeToRefs(admin)
onMounted(() => loadNewUsers())
</script>
