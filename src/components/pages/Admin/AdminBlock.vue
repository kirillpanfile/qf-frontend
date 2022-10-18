<template>
    <!-- Admin card -->
    <div class="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8 dark:bg-gray-800 dark:shadow-dark-xl" :class="size">
        <div class="flex items-center justify-between">
            <div>
                <!-- Admin card title -->
                <span class="text-2xl sm:text-3xl leading-none font-bold text-gray-900 dark:text-gray-300">{{
                    title
                }}</span>

                <!-- Admin card description -->
                <h3 class="text-base font-normal text-gray-500">{{ description }}</h3>
            </div>

            <!-- Admin card aditional -->
            <slot name="aditional"></slot>
        </div>

        <div
            class="overflow-y-scroll no-scrollbar overflow-x-hidden"
            :class="{
                ' max-h-[440px] h-full': h === 'full',
                ' max-h-64': h === 'standart',
                ' max-h-[240px] h-full sm:max-h-[240px] md:max-h-[300px] lg:max-h-[440px] 2xl:max-h-[500px]':
                    h === 'mobile',
            }">
            <!-- Admin card header -->
            <slot name="header" class="mt-4"></slot>
            <!-- Admin card body -->
            <slot name="body"></slot>
        </div>
    </div>
</template>

<script setup>
// import { computed, ref } from "vue"

const props = defineProps({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    size: String,
    h: {
        type: String,
        default: "standart",
        validator: (value) => ["standart", "full", "mobile"].includes(value),
    },
})
</script>

<style scoped>
.no-scrollbar::-webkit-scrollbar {
    display: none;
}

/* Hide scrollbar for IE, Edge and Firefox */
.no-scrollbar {
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */
}
</style>
