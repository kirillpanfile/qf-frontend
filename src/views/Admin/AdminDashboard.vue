<template>
    <h1 class="admin-container__title">Dashboard</h1>
    <section class="admin-dash__wrapper">
        <div class="admin-dash__card">
            <span><i class="fa-solid fa-code-branch"></i> See this project on Github</span>
            <a href="https://github.com/kirillpanfile/qf-frontend" target="_blank"> View more -> </a>
        </div>
        <div class="admin-dash__item">
            <div class="admin-dash__content">
                <div class="admin-dash__content-item">
                    <span>
                        <i class="fa-solid fa-users"></i>
                    </span>
                    <div class="admin-dash__content-item-value">
                        <div class="admin-dash__content-item-title">Total Users</div>
                        624
                    </div>
                </div>
                <div class="admin-dash__content-item">
                    <span>
                        <i class="fa-solid fa-utensils"></i>
                    </span>
                    <div class="admin-dash__content-item-value">
                        <div class="admin-dash__content-item-title">Total Recipes</div>
                        122
                    </div>
                </div>
                <div class="admin-dash__content-item">
                    <span>
                        <i class="fa-solid fa-burger"></i>
                    </span>
                    <div class="admin-dash__content-item-value">
                        <div class="admin-dash__content-item-title">Total Ingredients</div>
                        1342
                    </div>
                </div>
            </div>
        </div>

        <div class="admin-dash__item" v-if="newUsers">
            <h1 class="admin-dash__subtitle">New Users</h1>
            <div class="admin-dash__users">
                <admin-users-card
                    v-wave
                    v-for="(item, index) in newUsers"
                    :key="index"
                    :user="item"
                    @select="newUsers"
                ></admin-users-card>
            </div>
        </div>
    </section>
</template>

<script setup>
import { onMounted } from 'vue'
import { useAdminStore } from '@/store/adminStore'
import AdminUsersCard from '@/components/Admin/AdminUsersCard.vue'
import { storeToRefs } from 'pinia'
const admin = useAdminStore()
const { loadNewUsers } = admin
const { newUsers } = storeToRefs(admin)
onMounted(() => loadNewUsers())
</script>
