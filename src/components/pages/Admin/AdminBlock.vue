<template>
    <!-- Admin card -->
    <div class="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8" :class="size">
        <div class="flex items-center justify-between">
            <div>
                <!-- Admin card title -->
                <span class="text-2xl sm:text-3xl leading-none font-bold text-gray-900">{{ title }}</span>

                <!-- Admin card description -->
                <h3 class="text-base font-normal text-gray-500">{{ description }}</h3>
            </div>

            <!-- Admin card aditional -->
            <slot name="aditional"></slot>
        </div>

        <!-- Admin card header -->
        <slot name="header" class="mt-4"></slot>

        <!-- Admin card body -->
        <div class="overflow-y-scroll no-scrollbar overflow-x-hidden max-h-96">
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
