<template>
    <div class="w-full text-sm rounded-md border relative" tabindex="0" @click="toggleFocus" v-outside="removeFocus">
        <div class="w-full bg-white px-3 py-2 flex items-center cursor-pointer select-none">
            <div class="text-gray-500 font-bold">States</div>
            <i class="fa fa-chevron-down mt-1 ml-auto text-base text-gray-500 font-bold"></i>
        </div>
        <transition name="fadeHeight" mode="out-in">
            <div class="max-h-48 absolute mt-1 bg-white overflow-y-scroll w-full" v-if="isFocus">
                <div>
                    <input type="search" placeholder="Search states" @click.stop class="border w-full p-2 mt-1" />
                </div>
                <ul @click.stop>
                    <li
                        v-for="(item, index) in data"
                        :key="index"
                        @click="item.selected = !item.selected"
                        class="select-none w-full py-2 hover:bg-gray-50">
                        <div class="px-1 flex gap-2 text-base">
                            <input v-model="item.selected" type="checkbox" class="w-4 bg-blue-300" />
                            <span>{{ item[by] }}</span>
                        </div>
                    </li>
                </ul>
            </div>
        </transition>
    </div>
</template>

<script src="./ThreeSelect.js"></script>

<style scoped>
.fadeHeight-enter-active,
.fadeHeight-leave-active {
    transition: all 0.2s;
    max-height: 230px;
}
.fadeHeight-enter,
.fadeHeight-leave-to {
    opacity: 0;
    max-height: 0px;
}
</style>
