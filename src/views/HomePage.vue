<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-segment value="Wee">
          <ion-segment-button value="Wee">
            <ion-label>Wee</ion-label>
          </ion-segment-button>
        </ion-segment>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">

      <ion-card-header class="headerTitle">
        <ion-card-title class="cardTitle">Your Daily Wee</ion-card-title>
        <ion-card-subtitle>During the day</ion-card-subtitle>
      </ion-card-header>

      <ChevronFilters :handle-add-date="handleAddDays" :handle-sub-date="handleSubDays"
        :date="getMonthAndDay(homeState.currentDate || new Date())" />

      <div class="container flex-col">
        <ion-text class="averageText">Average</ion-text>
        <div class="container outerCircle">

          <div class="dailyAverageCircle container">
            <ion-text v-if="!homeState.fetchingWees" class="md">{{
              convertUnits(homeState.averageWeeDuringDay, userState.user?.weeMeasurement) }} {{
    userState.user?.weeMeasurement }}</ion-text>
            <ion-spinner v-else name="crescent" />
          </div>
        </div>
      </div>
      <div class="container">
        <div class="ion-margin-top container chartContainer">
          <BarChart :chart-data="homeState.chartData" :chart-label="homeState.chartLabel" />
        </div>
      </div>
      <AddWeeData name="Home" />
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonLabel, IonPage, IonHeader, IonToolbar, IonCardHeader, IonCardTitle, IonCardSubtitle, IonContent, IonSegment, IonSegmentButton, IonText, IonIcon, IonSpinner } from '@ionic/vue';
import AddWeeData from '@/components/AddWeeData.vue';
import { getMonthAndDay } from "@/utils/helpers"
import { convertUnits } from "@/utils/baseUtils"
import { useHomeStore } from '@/store/useHomeStore';
import { useUsersStore } from '@/store/useUsersStore';
import { storeToRefs } from 'pinia';
import BarChart from '@/components/shared/BarChart.vue';
import ChevronFilters from '@/components/shared/ChevronFilters.vue';


/**@UserStore */
const userStore = useUsersStore()
const { state: userState } = storeToRefs(userStore)

/**@FetchUserData */
userStore.fetchUserData()
/**@HomeStore */
const homeStore = useHomeStore()
const { state: homeState } = storeToRefs(homeStore)
const { handleAddDays, handleSubDays } = homeStore


</script>

<style scoped>
.averageText {
  color: rgb(12, 100, 100);
  margin: 2px;
  text-align: center;
}

.cardContent {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
}

.cardTitle {
  color: rgb(12, 100, 100);
  font-size: large;
}

.dailyContainer {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  /* line-height: 1; */
  flex-grow: 1;
}

.container {
  display: flex;
  justify-content: center;
  align-items: center;
}

.chartContainer {
  width: 50%;
  justify-self: center;
}

@media (max-width: 600px) {
  .chartContainer {
    width: 100%;
  }
}

.flex-col {
  flex-direction: column;
}

.flex-row {
  flex-direction: row;
}

.flex {
  display: flex;
}

.headerTitle {
  padding: 0px;
  text-align: center;
  margin-top: 10px;
}

.dailyAverageCircle {
  height: 100px;
  width: 100px;
  color: rgb(5, 5, 5);
  border-radius: 50%;
  border: 5px solid rgb(27, 131, 216);
  font-weight: 600;

}

.outerCircle {
  border-radius: 50%;
  border: 5px solid rgb(10, 167, 106);
  height: 120px;
  width: 120px;
  margin-top: 15px;
}

.md {
  font-size: medium;
}

.lg {
  font-size: larger;
}

.xl {
  font-size: x-large;
}

.weeIcon {
  color: rgb(235, 180, 3);
}
</style>