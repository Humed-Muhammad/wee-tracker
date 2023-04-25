<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>

        <ion-segment v-model="segmentRef">
          <ion-segment-button value="weekly">
            <ion-label>Weekly</ion-label>
          </ion-segment-button>
          <ion-segment-button value="monthly">
            <ion-label>Monthly</ion-label>
          </ion-segment-button>
        </ion-segment>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <div v-if="segmentRef === 'weekly'">
        <chevron-filters :handle-add-date="weeklyStore.handleAddWeeks" :handle-sub-date="weeklyStore.handleSubWeeks"
          :date="groupWeeks(state.filterDate)" />

        <div class="ion-margin-top barChart weekly-chart-container" style="height: auto;">
          <BarChart :chart-data="state.chartData" :chart-label="state.chartLabel" />
        </div>
        <ExportData :exportCvs="() => convertToCsv(monthlyState.allWees)" :export-pdf="exportPdf" />

        <StaticsCard :min="state.minWee" :max="state.maxWee" :wee-measurement="userState.user.weeMeasurement"
          :avg="state.averageWee" label="Amount of Wees" :loading="state.fetchingWees" />

        <StaticsCard :min="getWeeklyWeeFrequency(state.allWees).min" :max="getWeeklyWeeFrequency(state.allWees).max"
          :avg="getWeeklyWeeFrequency(state.allWees).average" label="Wee frequency" :loading="state.fetchingWees" />
      </div>
      <div v-if="segmentRef === 'monthly'">
        <chevron-filters :handle-add-date="monthlyStore.handleAddMonth" :handle-sub-date="monthlyStore.handleSubMonth"
          :date="getMonthAndYear(monthlyState.filterDate)" />

        <div class="ion-margin-top barChart weekly-chart-container" style="height: auto;">
          <BarChart :chart-data="monthlyState.chartData" :chart-label="monthlyState.chartLabel" />
        </div>
        <ExportData :exportCvs="() => convertToCsv(monthlyState.allWees)" :export-pdf="exportPdf" />

        <StaticsCard :min="monthlyState.minWee" :max="monthlyState.maxWee"
          :wee-measurement="userState.user.weeMeasurement" :avg="monthlyState.averageWee" label="Amount of Wees"
          :loading="monthlyState.fetchingWees" />

        <StaticsCard :min="getWeeklyWeeFrequency(monthlyState.allWees).min"
          :max="getWeeklyWeeFrequency(monthlyState.allWees).max"
          :avg="getWeeklyWeeFrequency(monthlyState.allWees).average" label="Wee frequency"
          :loading="monthlyState.fetchingWees" />
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import ChevronFilters from '@/components/shared/ChevronFilters.vue';
import { IonPage, IonHeader, IonToolbar, IonContent, IonSegment, IonSegmentButton, IonLabel } from '@ionic/vue';
import { storeToRefs } from 'pinia';
import { useWeeklyStore } from "@/store/useWeeklyStore"
import { groupWeeks, getMonthAndYear } from "@/utils/helpers"
import BarChart from '@/components/shared/BarChart.vue';
import { useUsersStore } from '@/store/useUsersStore';
import StaticsCard from '@/components/shared/StaticsCard.vue';
import { convertToCsv, getWeeklyWeeFrequency } from '@/utils/baseUtils';
import { ref } from 'vue';
import { exportToPdf } from '@/utils';
import ExportData from '@/components/shared/ExportData.vue';
import { useMonthlyStore } from '@/store/useMonthlyStore';

const weeklyStore = useWeeklyStore()
const { state } = storeToRefs(weeklyStore)
const monthlyStore = useMonthlyStore()
const { state: monthlyState } = storeToRefs(monthlyStore)

const userStore = useUsersStore()
const { state: userState } = storeToRefs(userStore)

const segmentRef = ref<"weekly" | "monthly">('weekly')

const exportPdf = () => {
  monthlyStore
  exportToPdf({
    title: "Weekly Wees Data",
    weeData: state.value.allWees,
    averageWee: state.value.averageWee as number,
    classSelector: "weekly-chart-container",
    chartTitle: `Wees between ${groupWeeks(state.value.filterDate)}`,
  });
};

</script>

<style scoped>
.barChart {
  margin-bottom: 20px;
}</style>