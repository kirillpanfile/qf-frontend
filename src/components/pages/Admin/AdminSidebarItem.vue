<template>
    <li class="list-none flex items-center flex-row">
        <router-link
            :class="active ? 'bg-gray-100 dark:bg-slate-600' : ''"
            v-wave
            :to="path"
            @click="$emit('press'), (open = !open)"
            v-if="!children"
            class="text-base text-gray-600 dark:hover:text-gray-400 font-bold rounded-lg flex items-center p-2 hover:bg-gray-100 dark:hover:bg-slate-600 group w-full">
            <i
                :class="icon"
                class="w-6 text-gray-500 group-hover:text-gray-600 dark:text-gray-400 dark:group-hover:text-gray-400 transition duration-75"></i>
            <span class="ml-3 text-md dark:text-gray-400">{{ text }}</span>
        </router-link>
        <a
            v-else
            v-wave
            @click.prevent="open = !open"
            href="#"
            class="text-base text-gray-600 font-bold rounded-lg flex items-center p-2 hover:bg-gray-100 dark:hover:bg-slate-600 group w-full">
            <i
                :class="icon"
                class="w-6 text-gray-500 dark:text-gray-400 group-hover:text-gray-600 transition duration-75"></i>
            <span class="ml-3 text-md dark:text-gray-400">{{ text }}</span>
        </a>
    </li>
    <div class="w-full border-y py-2 space-y-2" v-if="children && open">
        <li class="list-none flex items-center flex-row" v-for="(item, index) in childs" :key="index">
            <router-link
                v-wave
                class="text-base text-gray-600 font-bold rounded-lg flex items-center p-2 hover:bg-gray-100 dark:hover:bg-slate-600 group w-full"
                :to="item.path"
                @click.prevent="$emit('press')">
                <i :class="item.icon" class="w-6 text-gray-500 group-hover:text-gray-600 transition duration-75"></i>
                <span class="ml-3 text-md dark:text-gray-400">{{ item.text }}</span>
            </router-link>
        </li>
    </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue"
import { useRouter } from "vue-router"

//veriofy if the route is active

const router = useRouter()
const active = computed(() => {
    return router.currentRoute.value.path === props.path
})

const props = defineProps({
    path: { type: String, required: true },
    icon: { type: String, required: true },
    text: { type: String, required: true },
    children: { type: Array, default: null },
})

const open = ref(false)
const childs = ref(null)

onMounted(() => (props.children ? (childs.value = props.children.filter((route) => !route.exclude)) : void 0))

defineEmits(["press"])
</script>

<style scoped></style>
