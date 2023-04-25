<template>
    <Bar id="my-chart-id" :options="{
        responsive: true,
    }" :data="
    {
        labels: props?.chartLabel,
        datasets: [{
            label: 'Wee Amount',
            data: props?.chartData,
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
  
<script lang="ts" setup>
import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'


ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)



const props = defineProps<{ chartLabel: string[], chartData: number[] }>()


</script>