<template>
    <canvas class="cursor-crosshair h-max" id="myChart"> </canvas>
</template>

<script setup>
import Chart from 'chart.js/auto'
import { onMounted } from 'vue'

onMounted(() => {
    const ctx = document.getElementById('myChart').getContext('2d')
    const myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Jun 1', 'Jun 2', 'Jun 3', 'Jun 4', 'Jun 5', 'Jun 6'],
            datasets: [
                {
                    label: 'new users',
                    data: [12, 19, 3, 5, 2, 3],
                    borderColor: '#91c788',
                    backgroundColor: 'rgba(146, 200, 137, 0.6)',
                    borderWidth: 5,
                },
            ],
        },
        options: {
            fill: true,
            transitions: true,
            tension: 0.4,
            legend: true,
            maintainAspectRatio: false,
            responsive: true,
            interaction: {
                intersect: false,
                mode: 'index',
            },
        },
        plugins: [
            {
                afterDraw: (chart) => {
                    if (chart.tooltip?._active?.length) {
                        let x = chart.tooltip._active[0].element.x
                        let yAxis = chart.scales.y
                        let ctx = chart.ctx
                        ctx.save()
                        ctx.beginPath()
                        ctx.setLineDash([10, 12])
                        ctx.beginPath()
                        ctx.moveTo(x, yAxis.top)
                        ctx.lineTo(x, yAxis.bottom)
                        ctx.lineWidth = 1
                        ctx.strokeStyle = 'rgba(0,0,0,0.4)'
                        ctx.stroke()
                        ctx.restore()
                    }
                },
            },
        ],
    })
    myChart
})
</script>
