<template>
    <app-modal :title="title" ref="userModal">
        <div class="grid grid-cols-6 gap-x-6">
            <div class="col-span-6">
                <VInput
                    v-model="userData.username"
                    :disabled="editFlag"
                    placeholder="username..."
                    label="Username"
                    name="username"
                    size="base" />
                <VInput
                    v-model="userData.email"
                    :disabled="editFlag"
                    placeholder="Email..."
                    label="Email"
                    name="email"
                    size="base" />
                <VInput
                    v-if="userType === 'create'"
                    v-model="userData.password"
                    placeholder="Password..."
                    label="Password"
                    name="password"
                    size="base" />
            </div>
            <div class="col-span-6 sm:col-span-3 mb-6">
                <VSelect
                    v-model="userData.roles[0]._id"
                    v-if="userType === 'view'"
                    :disabled="editFlag"
                    :options="roles"
                    name="roles"
                    size="base"
                    label="Role" />
            </div>
        </div>

        <!--? Modal Footer-->

        <div class="items-center py-6 border-t border-gray-200 rounded-b flex gap-4">
            <v-button type="button" bgColor="default" size="base" @btnClick="submitModal"> Submit </v-button>
            <v-button
                type="button"
                v-if="userType === 'view'"
                bgColor="alternative"
                size="base"
                @btnClick="editFlag = !editFlag">
                Edit
            </v-button>
        </div>
    </app-modal>
</template>

<script setup>
import { createRefs } from "@/helpers"
import { AppModal, VButton, VInput, VSelect } from "@/components"
import { useAdminStore, refs } from "@/store"
import { computed } from "vue"
const { editUser, createUser } = useAdminStore()
const { roles } = refs(useAdminStore())
const [userType, userModal, userData, editFlag] = createRefs([null, null, {}, null])

const title = computed(() => {
    return userType.value && userType.value.charAt(0).toUpperCase() + userType.value.slice(1) + " User"
})

const submitModal = () => {
    if (userType.value === "create") {
        createUser(userData)
    } else if (userType.value === "view") {
        editUser(userData)
    }
    userModal.value.closeModal()
}

const open = (data) => {
    const { type, user } = data

    if (!["create", "view"].includes(type)) throw new Error("Invalid type")

    if (type === "create") {
        Object.assign(userData, { username: "", email: "", password: "", picture: "" })
        userType.value = "create"
    }
    if (type === "view") {
        editFlag.value = true
        if (!user) throw new Error("Invalid user")
        userType.value = "view"
        Object.assign(userData, user)
    }

    userModal.value.openModal()
}
defineExpose({ open })
</script>

<style></style>
