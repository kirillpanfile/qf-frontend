<template>
    <main class="pt-6 px-4">
        <div class="w-full grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-4">
            <div class="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8 2xl:col-span-2">
                <div class="flex items-center justify-between mb-4">
                    <div>
                        <span class="text-2xl sm:text-3xl leading-none font-bold text-gray-900">12</span>
                        <h3 class="text-base font-normal text-gray-500">New users this week</h3>
                    </div>
                    <div class="flex items-center justify-end flex-1 text-lime text-base font-bold">
                        <i class="fa fa-arrow-up pr-2"></i>
                        <span>12.5%</span>
                    </div>
                </div>
                <AdminChart class="block w-full max-h-64 xl:max-h-[490px]" />
            </div>
            <div class="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8">
                <div class="flex items-center justify-between mb-4">
                    <div>
                        <span class="text-2xl sm:text-3xl leading-none font-bold text-gray-900">New Recipes</span>
                        <h3 class="text-base font-normal text-gray-500">Incomming from users</h3>
                    </div>
                    <router-link
                        to="/admin/recipes/all"
                        class="text-sm cursor-pointer font-medium text-lime hover:bg-gray-100 rounded-lg p-2"
                    >
                        view all
                    </router-link>
                </div>
                <header class="grid grid-cols-4 bg-gray-50 p-3 rounded-t-lg border-b gap-x-4">
                    <span class="col-span-2 text-gray-500">Title</span>
                    <span class="text-gray-500">User</span>
                    <span class="text-gray-500">Status</span>
                </header>
                <!--! Component AdminListItem.vue-->

                <router-link
                    :to="`/admin/recipes/${item._id}`"
                    class="grid grid-cols-4 gap-x-4 p-3 items-center hover:bg-gray-200 rounded-md"
                    v-for="(item, index) in recipe"
                    :key="item._id"
                    :class="(index + 1) % 2 == 0 && 'bg-gray-50'"
                >
                    <span class="col-span-2 text-gray-500" v-if="!item.langs.ro.title">No title</span>
                    <!--TODO de sters asta cind o sa lucreze validarea la title-->
                    <span class="col-span-2 text-gray-500 whitespace-nowrap overflow-hidden text-ellipsis" v-else>{{
                        item.langs.ro.title
                    }}</span>
                    <span class="text-black font-bold whitespace-nowrap overflow-hidden text-ellipsis">{{
                        item?.user?.username
                    }}</span>
                    <span
                        :class="{
                            'text-lime': item.approved === 'approved',
                            'text-yellow-500': item.approved === 'pending',
                            'text-red-600': item.approved === 'rejected',
                        }"
                        >{{ item.approved }}</span
                    >
                </router-link>
            </div>
        </div>
        <div class="w-full grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-4 pt-6">
            <div class="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8" v-ripple>
                <div class="flex items-center justify-between">
                    <div>
                        <span class="text-2xl sm:text-3xl leading-none font-bold text-gray-900">976</span>
                        <h3 class="text-base font-normal text-gray-500">Total users</h3>
                    </div>
                    <div class="flex items-center justify-end flex-1 text-lime text-base font-bold">
                        <i class="fa fa-arrow-up pr-2"></i>
                        <span>12.5%</span>
                    </div>
                </div>
            </div>
            <div class="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8" v-ripple>
                <div class="flex items-center justify-between">
                    <div>
                        <span class="text-2xl sm:text-3xl leading-none font-bold text-gray-900">17</span>
                        <h3 class="text-base font-normal text-gray-500">New users (last month)</h3>
                    </div>
                    <div class="flex items-center justify-end flex-1 text-lime text-base font-bold">
                        <i class="fa fa-arrow-up pr-2"></i>
                        <span>3%</span>
                    </div>
                </div>
            </div>
            <div class="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8" v-ripple>
                <div class="flex items-center justify-between">
                    <div>
                        <span class="text-2xl sm:text-3xl leading-none font-bold text-gray-900">23</span>
                        <h3 class="text-base font-normal text-gray-500">New Recipes (last month)</h3>
                    </div>
                    <div class="flex items-center justify-end flex-1 text-red-600 text-base font-bold">
                        <i class="fa fa-arrow-down pr-2"></i>
                        <span>-1.2%</span>
                    </div>
                </div>
            </div>
        </div>

        <div class="w-full grid grid-cols-1 xl:grid-cols-2 gap-4 pt-6">
            <div class="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8">
                <div class="flex items-center justify-between mb-4">
                    <div>
                        <span class="text-2xl sm:text-3xl leading-none font-bold text-gray-900">New Users</span>
                        <h3 class="text-base font-normal text-gray-500">Last 10 new users</h3>
                    </div>
                    <div class="text-sm cursor-pointer font-medium text-lime hover:bg-gray-100 rounded-lg p-2">
                        view all
                    </div>
                </div>
                <div class="overflow-y-scroll max-h-96 divide-y">
                    <admin-users-card
                        v-for="(item, index) in newUsers"
                        :key="index"
                        :user="item"
                        type="new"
                        @select="newUsers"
                    ></admin-users-card>
                </div>
            </div>
            <div class="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8">
                <div class="flex items-center justify-between mb-4">
                    <div>
                        <span class="text-2xl sm:text-3xl leading-none font-bold text-gray-900">Tasks</span>
                        <h3 class="text-base font-normal text-gray-500">Need to be done</h3>
                    </div>

                    <div class="flex gap-4">
                        <div class="text-sm cursor-pointer font-medium text-lime hover:bg-gray-100 rounded-lg p-2">
                            Create +
                        </div>
                        <div class="text-sm cursor-pointer font-medium text-lime hover:bg-gray-100 rounded-lg p-2">
                            view all
                        </div>
                    </div>
                </div>
                <div class="overflow-y-scroll max-h-96 divide-y">Tasks</div>
            </div>
        </div>

        <a
            href="https://github.com/kirillpanfile/qf-frontend"
            target="_blank"
            v-ripple
            class="flex items-center justify-between sm:p-3 p-4 mb-8 text-sm shrink font-semibold bg-white rounded-lg shadow-md text-black mt-6"
        >
            <div class="flex items-center">
                <i class="fa-solid fa-code-branch w-5 mr-2"></i>
                <span>Open project on github</span>
            </div>
            <span>View more -></span>
        </a>
    </main>
</template>
<script setup>
import { AdminUsersCard, AdminDashCard, AdminChart } from '@/components'
import { onMounted, computed } from 'vue'
import { useAdminStore } from '@/store/adminStore'
import { useRecipeStore } from '@/store/recipeStore'
import { storeToRefs } from 'pinia'

const { loadNewUsers, newUsers } = useAdminStore()
const { recipe } = storeToRefs(useRecipeStore())

onMounted(() => {
    loadNewUsers()
    useRecipeStore()
        .getAllRecipes()
        .then(() => {
            recipe.value.length = 10
        })
})
</script>

<style>
.w-400 {
    max-width: 500px;
    width: 100%;
}
</style>
