<template>
    <li
        v-if="type === 'user'"
        class="py-3 sm:py-4 list-none cursor-pointer hover:bg-gray-100 dark:hover:bg-slate-600 entranceFromRight">
        <div class="flex items-center space-x-4 px-2">
            <div class="flex-shrink-0">
                <img class="w-8 h-8 rounded-full object-cover" :src="picture" lt="ProfilePic" />
            </div>
            <div class="flex-1 min-w-0">
                <p class="text-sm font-medium text-gray-900 truncate dark:text-white">{{ name }}</p>
                <p class="text-sm text-gray-500 truncate dark:text-gray-400">{{ aditional }}</p>
            </div>
            <div v-if="flag" class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                {{ flag }}
            </div>
        </div>
    </li>

    <li
        v-else-if="type === 'recipe'"
        class="py-3 sm:py-4 list-none cursor-pointer hover:bg-gray-100 dark:hover:bg-slate-600 entranceFromRight">
        <div class="items-center space-x-4 px-2 grid grid-cols-5">
            <div class="flex-1 min-w-0 col-span-3">
                <p class="text-sm text-gray-500 truncate dark:text-gray-400">{{ aditional }}</p>
            </div>
            <div class="flex-1 min-w-0 col-span-2">
                <p class="text-sm font-medium text-gray-900 truncate dark:text-white">{{ name }}</p>
            </div>
        </div>
    </li>

    <li v-else-if="type === 'usersLarge'">
        <div class="hover:bg-gray-100 dark:hover:bg-slate-600">
            <div class="py-4 grid grid-cols-12 gap-2 dark:border-slate-600">
                <div class="px-4 flex col-span-7 lg:col-span-4 xl:col-span-3">
                    <img class="h-10 w-10 rounded-full" :src="picture" alt="ProfilePic" />
                    <div class="text-sm font-normal text-gray-500 ml-4">
                        <div class="text-base font-semibold text-gray-900 dark:text-gray-200">{{ name }}</div>
                        <div class="text-sm font-normal text-gray-500 dark:text-gray-400 text-ellipsis">
                            {{ email }}
                        </div>
                    </div>
                </div>
                <div class="px-4 hidden lg:block lg:col-span-4 xl:col-span-3 self-center">
                    <h1 class="text-base text-gray-700 dark:text-gray-400 font-bold">{{ id }}</h1>
                </div>
                <div class="col-span-3 hidden xl:block px-4 self-center">
                    <h1 class="text-base font-bold text-gray-700 dark:text-gray-400">{{ getUserRole }}</h1>
                </div>
                <div class="col-span-5 md:col-span-3 lg:col-span-4 xl:col-span-3 px-4 flex gap-4">
                    <v-button type="button" size="sm" bgColor="alternative" @click="$emit('edit')">
                        <i class="fa-solid fa-pen-to-square mr-2"></i>Edit User
                    </v-button>
                    <v-button type="button" size="sm" bgColor="red" @click="deleteUser(id)"
                        ><i class="fa-solid fa-trash-can mr-2"></i>Delete User</v-button
                    >
                </div>
            </div>
        </div>
    </li>
</template>

<script setup>
import { VButton } from "@/components"
import { computed } from "vue"
import { useAdminStore, refs } from "@/store"

const { deleteUser } = useAdminStore()
const { roles } = refs(useAdminStore())

const props = defineProps({
    picture: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    aditional: {
        type: String,
    },
    email: {
        type: String,
    },
    id: {
        type: String,
    },
    userRoles: {
        type: Array,
    },

    type: {
        type: String,
        required: true,
        validator: (value) => ["user", "recipe", "usersLarge"].includes(value),
    },
    flag: String,
})

const getUserRole = computed(() => {
    const priority = roles.value.map((role) => role.name)
    return props.userRoles.sort((a, b) => {
        return priority.indexOf(b.name) - priority.indexOf(a.name)
    })[0].name
})

defineEmits(["edit"])
</script>

<style></style>
