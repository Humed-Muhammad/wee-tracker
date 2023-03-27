<template>
    <Bar id="my-chart-id" :options="{
        responsive: true,
    }" :data="
    {
        labels: storeState?.chartLabel,
        datasets: [{
            label: 'Wees During the Day',
            data: storeState?.chartData,
            backgroundColor: [
                'rgba(255, 206, 96, 0.4)',
            ],
            borderColor: [
                'rgba(255, 206, 96, 1)',
            ],
            borderWidth: 1
        }],

    }" />
</template>
  
<script lang="ts">
import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'
import { storeState } from "@/store"
ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

export default {
    name: 'BarChart',
    components: { Bar },
    setup() {

        return {
            storeState,

        }
    },

}
</script>