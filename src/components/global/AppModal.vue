<template>
    <div
        class="w-screen fixed h-screen top-0 left-0 bg-black bg-opacity-20 z-50 flex items-center justify-center"
        v-if="isOpen"
        @click="closeModal"
    >
        <div
            class="max-w-2xl max-h-[600px] w-full relative bg-white p-4 rounded-lg shadow mx-4 overflow-y-scroll"
            @click.stop
        >
            <div class="flex items-start justify-between p-5 border-b rounded-t w-full">
                <h3 class="text-xl font-semibold">Create New Task</h3>
                <button
                    type="button"
                    class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
                    data-modal-toggle="user-modal"
                >
                    <i class="fa-solid fa-xmark text-xl" @click="closeModal"></i>
                </button>
            </div>

            <div class="p-6 space-y-6">
                <form action="#">
                    <div class="grid grid-cols-6 gap-6">
                        <div class="col-span-6">
                            <label for="task" class="text-sm font-medium text-gray-900 block mb-2">Task Title</label>
                            <input
                                type="text"
                                id="task"
                                class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 mb-4"
                                placeholder="Fix navbar"
                            />
                            <label for="description" class="text-sm font-medium text-gray-900 block mb-2"
                                >Task Description</label
                            >
                            <textarea
                                id="description"
                                cols="10"
                                rows="5"
                                placeholder="Fix navbar on mobile, burger menu animation is not working. Reference : https://palceholder.com"
                                class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 mb-4 resize-none"
                            ></textarea>
                        </div>
                        <div class="col-span-6 sm:col-span-3">
                            <label for="assign" class="text-sm font-medium text-gray-900 block mb-2">Assign to </label>
                            <select
                                type="text"
                                id="assign"
                                class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 mb-4"
                                placeholder="Fix navbar"
                            >
                                <option value="all">For all</option>
                                <option value="1">User 1</option>
                                <option value="2">User 2</option>
                                <option value="3">User 3</option>
                            </select>
                        </div>
                        <div class="col-span-6 sm:col-span-3">
                            <label for="flag" class="text-sm font-medium text-gray-900 block mb-2">Flag </label>
                            <select
                                type="text"
                                id="flag"
                                class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 mb-4"
                                placeholder="Fix navbar"
                            >
                                <option value="all">Normal</option>
                                <option value="1">High</option>
                                <option value="2">Urgent</option>
                            </select>
                        </div>
                    </div>
                </form>
            </div>
            <div class="items-center p-6 border-t border-gray-200 rounded-b">
                <button
                    class="text-white bg-cyan-600 hover:bg-cyan-700 focus:ring-4 focus:ring-cyan-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                    type="submit"
                    @click="closeModal"
                >
                    Save all
                </button>
            </div>
        </div>
        <!-- <div class="relative w-full max-w-2xl px-4 h-full md:h-auto">

                <div class="p-6 space-y-6">
                    <form action="#">
                        <div class="grid grid-cols-6 gap-6">
                            <div class="col-span-6 sm:col-span-3">
                                <label for="first-name" class="text-sm font-medium text-gray-900 block mb-2"
                                    >First Name</label
                                >
                                <input
                                    type="text"
                                    name="first-name"
                                    id="first-name"
                                    class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                                    placeholder="Bonnie"
                                    required=""
                                />
                            </div>
                            <div class="col-span-6 sm:col-span-3">
                                <label for="last-name" class="text-sm font-medium text-gray-900 block mb-2"
                                    >Last Name</label
                                >
                                <input
                                    type="text"
                                    name="last-name"
                                    id="last-name"
                                    class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                                    placeholder="Green"
                                    required=""
                                />
                            </div>
                            <div class="col-span-6 sm:col-span-3">
                                <label for="email" class="text-sm font-medium text-gray-900 block mb-2">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    id="email"
                                    class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                                    placeholder="example@company.com"
                                    required=""
                                />
                            </div>
                            <div class="col-span-6 sm:col-span-3">
                                <label for="phone-number" class="text-sm font-medium text-gray-900 block mb-2"
                                    >Phone Number</label
                                >
                                <input
                                    type="number"
                                    name="phone-number"
                                    id="phone-number"
                                    class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                                    placeholder="e.g. +(12)3456 789"
                                    required=""
                                />
                            </div>
                            <div class="col-span-6 sm:col-span-3">
                                <label for="department" class="text-sm font-medium text-gray-900 block mb-2"
                                    >Department</label
                                >
                                <input
                                    type="text"
                                    name="department"
                                    id="department"
                                    class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                                    placeholder="Development"
                                    required=""
                                />
                            </div>
                            <div class="col-span-6 sm:col-span-3">
                                <label for="company" class="text-sm font-medium text-gray-900 block mb-2"
                                    >Company</label
                                >
                                <input
                                    type="number"
                                    name="company"
                                    id="company"
                                    class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                                    placeholder="123456"
                                    required=""
                                />
                            </div>
                            <div class="col-span-6 sm:col-span-3">
                                <label for="current-password" class="text-sm font-medium text-gray-900 block mb-2"
                                    >Current Password</label
                                >
                                <input
                                    type="password"
                                    name="current-password"
                                    id="current-password"
                                    class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                                    placeholder="••••••••"
                                    required=""
                                />
                            </div>
                            <div class="col-span-6 sm:col-span-3">
                                <label for="new-password" class="text-sm font-medium text-gray-900 block mb-2"
                                    >New Password</label
                                >
                                <input
                                    type="password"
                                    name="new-password"
                                    id="new-password"
                                    class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                                    placeholder="••••••••"
                                    required=""
                                />
                            </div>
                        </div>
                    </form>
                </div>

                <div class="items-center p-6 border-t border-gray-200 rounded-b">
                    <button
                        class="text-white bg-cyan-600 hover:bg-cyan-700 focus:ring-4 focus:ring-cyan-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                        type="submit"
                    >
                        Save all
                    </button>
                </div>
            </div>
        </div> -->
    </div>
</template>

<script setup>
import { ref } from 'vue'

const isOpen = ref(false)

const closeModal = () => (isOpen.value = false)
const openModal = () => (isOpen.value = true)

defineExpose({
    openModal,
})
</script>

<style></style>
