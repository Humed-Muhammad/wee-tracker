<template>
    <div class="chart-container">
        <vue-highcharts type="chart" :options="chartOptions" :redrawOnUpdate="true" :oneToOneUpdate="false"
            :animateOnUpdate="true" :rendered="onRender" />
    </div>
</template>

<script setup lang="ts">
import Highcharts from "highcharts"

import VueHighcharts from "vue3-highcharts"


let chartOptions: Highcharts.Options = {
    chart: {
        height: (3 / 4 * 100) + '%',
        reflow: true,
    },
    title: {
        text: 'Wees',
        align: 'left'
    },
    subtitle: {
        text: 'During the day'
    },
    credits: {
        enabled: false
    },
    xAxis: [{
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
            'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        crosshair: true
    }],
    yAxis: [{ // Primary yAxis
        labels: {
            format: '{value}ML',
            style: {
                color: Highcharts.getOptions().colors?.[1] as string
            }
        },
        title: {
            text: '',
            style: {
                color: Highcharts.getOptions().colors?.[1] as string
            }
        }
    },],
    tooltip: {
        shared: true
    },
    legend: {
        align: 'left',
        x: 80,
        verticalAlign: 'top',
        y: 80,
        floating: true,
        backgroundColor:
            Highcharts.defaultOptions.legend?.backgroundColor || // theme
            'rgba(255,255,255,0.25)'
    },
    series: [{
        name: 'Wees',
        type: 'spline',
        data: [27, 100, 50, 120],
        tooltip: {
            valueSuffix: 'ML'
        }
    }]
}

const onRender = () => {
    chartOptions = { ...chartOptions, chart: { ...chartOptions.chart, width: '100%' } }
};


</script>

<style scoped>
.chart-container {
    width: 100%;
}
</style>