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
          :date="groupWeeks(weeklyState.filterDate)" />

        <div class="ion-margin-top barChart weekly-chart-container" style="height: auto;">
          <BarChart :chart-data="weeklyState.chartData" :chart-label="weeklyState.chartLabel" />
        </div>
        <ExportData :exportCvs="() => convertToCsv(weeklyState.allWees)" :export-pdf="() => exportPdf(weeklyState)" />

        <StaticsCard :min="weeklyState.minWee" :max="weeklyState.maxWee" :wee-measurement="userState.user.weeMeasurement"
          :avg="weeklyState.averageWee" label="Amount of Wees" :loading="weeklyState.fetchingWees" />

        <StaticsCard :min="getWeeklyWeeFrequency(weeklyState.allWees).min"
          :max="getWeeklyWeeFrequency(weeklyState.allWees).max" :avg="getWeeklyWeeFrequency(weeklyState.allWees).average"
          label="Wee frequency" :loading="weeklyState.fetchingWees" />
      </div>
      <div v-if="segmentRef === 'monthly'">
        <chevron-filters :handle-add-date="monthlyStore.handleAddMonth" :handle-sub-date="monthlyStore.handleSubMonth"
          :date="getMonthAndYear(monthlyState.filterDate)" />

        <div class="ion-margin-top barChart weekly-chart-container" style="height: auto;">
          <BarChart :chart-data="monthlyState.chartData" :chart-label="monthlyState.chartLabel" />
        </div>
        <ExportData :exportCvs="() => convertToCsv(monthlyState.allWees)" :export-pdf="() => exportPdf(monthlyState)" />

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
import { IStoreState } from '@/types';

const weeklyStore = useWeeklyStore()
const { state: weeklyState } = storeToRefs(weeklyStore)
const monthlyStore = useMonthlyStore()
const { state: monthlyState } = storeToRefs(monthlyStore)

const userStore = useUsersStore()
const { state: userState } = storeToRefs(userStore)

const segmentRef = ref<"weekly" | "monthly">('weekly')

const exportPdf = (state: IStoreState) => {
  monthlyStore
  exportToPdf({
    title: "Weekly Wees Data",
    weeData: state.allWees,
    averageWee: state.averageWee as number,
    classSelector: "weekly-chart-container",
    chartTitle: `Wees between ${groupWeeks(state.filterDate)}`,
  });
};

</script>

<style scoped>
.barChart {
  margin-bottom: 20px;
}
</style>