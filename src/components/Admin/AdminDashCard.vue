<template>
    <div class="flex items-center p-4 bg-white rounded-lg shadow-xs">
        <div class="p-3 mr-4 rounded-full" :class="getColor">
            <i class="w-8 h-8 text-lg flex items-center justify-center" :class="icon"></i>
        </div>
        <div>
            <p class="mb-2 text-sm font-medium text-gray-600">{{ text }}</p>
            <p class="text-lg font-semibold text-gray-700">{{ count }}</p>
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    text: {
        type: String,
        default: '',
        required: true,
    },
    count: {
        default: 0,
        required: true,
    },
    icon: {
        type: String,
        default: '',
        required: true,
    },
    color: {
        type: String,
        default: 'orange',
        validator: (value) => ['orange', 'green', 'blue', 'teal'].includes(value),
    },
})

const getColor = `text-${props.color}-500 bg-${props.color}-100`
</script>

<style>
/* .text-orange-500 {
    color: #f97316;
}
.bg-orange-100 {
    background-color: #ffedd5;
}
.text-green-500 {
    color: #22c55e;
}
.bg-green-100 {
    background-color: #dcfce7;
}
.text-blue-500 {
    color: #3b82f6;
}
.bg-blue-100 {
    background-color: #dbeafe;
}
.text-teal-500 {
    color: #14b8a6;
}
.bg-teal-100 {
    background-color: #ccfbf1;
} */
</style>
