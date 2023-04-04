<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>

        <ion-segment value="weekly">
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
      <chevron-filters :handle-add-date="store.handleAddWeeks" :handle-sub-date="store.handleSubWeeks"
        :date="groupWeeks(state.filterDate)" />

      <div class="ion-margin-top barChart">
        <BarChart :chart-data="state.chartData" :chart-label="state.chartLabel" />
      </div>

      <StaticsCard :min="state.minDuringWeek" :max="state.maxDuringWeek" :wee-measurement="userState.user.weeMeasurement"
        :avg="state.averageWeeDuringWeek" label="Amount of Wees" />



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

const store = useWeeklyStore()
const { state } = storeToRefs(store)

const userStore = useUsersStore()
const { state: userState } = storeToRefs(userStore)
</script>

<style scoped>
.barChart {
  margin-bottom: 20px;
}
</style>