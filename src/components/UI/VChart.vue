<template>
    <div class="h-full">
        <canvas class="cursor-crosshair" style="height: 100%" id="myChart"> </canvas>
    </div>
</template>

<script setup>
import Chart from "chart.js/auto"
import { onMounted } from "vue"

const props = defineProps({
    data: {
        type: Object,
        required: true,
    },
    type: {
        type: String,
        required: true,
        validator: (value) => ["line", "bar", "pie", "doughnut", "polarArea", "radar"].includes(value),
    },
    intersec: {
        type: Boolean,
        default: false,
    },
})

onMounted(() => {
    const ctx = document.getElementById("myChart")?.getContext("2d")

    if (props.intersec) {
        var interaction = {
            intersect: false,
            mode: "index",
        }
    }
    const myChart = new Chart(ctx, {
        type: props.type,
        data: props.data,
        options: {
            fill: true,
            transitions: true,
            tension: 0.4,
            legend: true,
            maintainAspectRatio: false,
            responsive: true,
            interaction: interaction,
        },
        plugins: [
            {
                afterDraw: (chart) => {
                    if (props.type == "line" || props.type == "bar") {
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
                            ctx.strokeStyle = "rgba(0,0,0,0.4)"
                            ctx.stroke()
                            ctx.restore()
                        }
                    }
                },
            },
        ],
    })
    myChart

    console.log(myChart)
})
</script>
