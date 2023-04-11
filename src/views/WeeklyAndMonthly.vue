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


        <chevron-filters :handle-add-date="store.handleAddWeeks" :handle-sub-date="store.handleSubWeeks"
          :date="groupWeeks(state.filterDate)" />

        <div class="ion-margin-top barChart weekly-chart-container" style="height: auto;">
          <BarChart :chart-data="state.chartData" :chart-label="state.chartLabel" />
        </div>
        <ExportData :export-pdf="exportPdf" />

        <StaticsCard :min="state.minDuringWeek" :max="state.maxDuringWeek"
          :wee-measurement="userState.user.weeMeasurement" :avg="state.averageWeeDuringWeek" label="Amount of Wees"
          :loading="state.fetchingWeeklyWees" />

        <StaticsCard :min="getWeeklyWeeFrequency(state.weesDuringWeek).min"
          :max="getWeeklyWeeFrequency(state.weesDuringWeek).max"
          :avg="getWeeklyWeeFrequency(state.weesDuringWeek).average" label="Wee frequency"
          :loading="state.fetchingWeeklyWees" />
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import ChevronFilters from '@/components/shared/ChevronFilters.vue';
import { IonPage, IonHeader, IonToolbar, IonContent, IonSegment, IonSegmentButton, IonLabel } from '@ionic/vue';
import { storeToRefs } from 'pinia';
import { useWeeklyStore } from "@/store/useWeeklyStore"
import { groupWeeks } from "@/utils/helpers"
import BarChart from '@/components/shared/BarChart.vue';
import { useUsersStore } from '@/store/useUsersStore';
import StaticsCard from '@/components/shared/StaticsCard.vue';
import { getWeeklyWeeFrequency } from '@/utils/baseUtils';
import { ref } from 'vue';
import { exportToPdf } from '@/utils';
import ExportData from '@/components/shared/ExportData.vue';

const store = useWeeklyStore()
const { state } = storeToRefs(store)

const userStore = useUsersStore()
const { state: userState } = storeToRefs(userStore)

const segmentRef = ref<"weekly" | "monthly">('weekly')

const exportPdf = () => {
  exportToPdf({
    title: "Weekly Wees Data",
    weeData: state.value.weesDuringWeek,
    averageWee: state.value.averageWeeDuringWeek as number,
    classSelector: "weekly-chart-container",
    chartTitle: `Wees between ${groupWeeks(state.value.filterDate)}`,
  });
};

</script>

<style scoped>
.barChart {
  margin-bottom: 20px;
}
</style>