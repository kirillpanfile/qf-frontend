<template>
    <Bar
        :chart-options="chartOptions"
        :chart-data="chartData"
        :chart-id="chartId"
        :dataset-id-key="datasetIdKey"
        :plugins="plugins"
        :css-classes="cssClasses"
        :styles="styles"
        :width="width"
        :height="height"
    />
</template>

<script setup>
import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'

ChartJS.register(Tooltip, Legend, BarElement, CategoryScale, LinearScale)

const props = defineProps({
    chartId: {
        type: String,
        default: 'bar-chart',
    },
    datasetIdKey: {
        type: String,
        default: 'label',
    },
    width: {
        type: Number,
        default: 1144,
    },
    height: {
        type: Number,
        default: 572,
    },
    cssClasses: {
        default: '',
        type: String,
    },
    styles: {
        type: Object,
        default: () => {},
    },
    plugins: {
        type: Object,
        default: () => {},
    },
})
const chartData = {
    labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    datasets: [
        {
            label: 'New Users',
            backgroundColor: '#91c788',
            data: [12, 19, 3, 5, 2, 3, 10],
        },
    ],
    legend: {
        display: false,
    },
}
const chartOptions = {
    responsive: true,
}
</script>
