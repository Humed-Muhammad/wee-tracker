<template>
    <Bar id="my-chart-id" :options="{
        responsive: true,
    }" :data="
    {
        labels: state?.chartLabel,
        datasets: [{
            label: 'Wees Amount',
            data: state?.chartData,
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

import { useHomeStore } from '@/store/useHomeStore'
import { storeToRefs } from 'pinia'
ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

/**@HomeStore */
const homeStore = useHomeStore()
const { state } = storeToRefs(homeStore)


export default {
    name: 'BarChart',
    components: { Bar },
    setup() {

        return {
            state,

        }
    },

}
</script>