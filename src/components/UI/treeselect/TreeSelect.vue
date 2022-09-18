<template>
    <span class="w-full block mt-12">
        <div class="bg-white flex w-full relative">
            <ul class="w-full flex border border-gray-300 focus:border-blue-500 rounded-md overflow-hidden p-2">
                <li class="flex h-full items-center" v-for="(item, index) in selectedItems" :key="index">
                    <v-badge class="bg-gray-200 w-full">{{ item[by] }}</v-badge>
                </li>

                <li class="w-full">
                    <input
                        @focusout="clearData"
                        type="text"
                        v-model="inputData"
                        class="w-full h-full outline-none rounded-md" />
                </li>
            </ul>
            <transition>
                <ul
                    v-if="filteredItems.length"
                    class="absolute top-20 w-full p-2 z-50 max-h-32 overflow-y-scroll bg-white">
                    <li
                        v-for="(item, index) in filteredItems"
                        :key="index"
                        class="p-2 hover:bg-gray-300 cursor-pointer"
                        @click="selectItem(item)">
                        {{ item[by] }}
                    </li>
                </ul>
            </transition>
        </div>
    </span>
</template>

<script src="./ThreeSelect.js"></script>

<style scoped>
/* we will explain what these classes do next! */
.v-enter-active,
.v-leave-active {
    transition: opacity 0.1s ease;
}

.v-enter-from,
.v-leave-to {
    opacity: 0;
}
</style>
