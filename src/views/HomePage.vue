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

      <div class="chevronContainer">
        <ion-icon @click="handleSubDays" class="fabButton" :icon="chevronBackOutline"></ion-icon>
        <ion-text>{{ getMonthAndDay(state.currentDate) }}</ion-text>
        <ion-icon @click="handleAddDays" class="fabButton" :icon="chevronForwardOutline"></ion-icon>
      </div>

      <div class="container flex-col">
        <ion-text class="averageText">Average</ion-text>
        <div class="container outerCircle">

          <div class="dailyAverageCircle container">
            <ion-text v-if="!state.fetchingWees" class="lg">{{ state.averageWeeDuringDay }} {{
              storeState?.user?.weeMeasurement }}</ion-text>
            <ion-spinner v-else name="crescent" />
          </div>
        </div>
      </div>
      <AddWeeData name="Home" />
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonHeader, IonToolbar, IonCardHeader, IonCardSubtitle, IonContent, IonSegment, IonSegmentButton, IonText } from '@ionic/vue';
import AddWeeData from '@/components/AddWeeData.vue';
import { chevronBackOutline, chevronForwardOutline } from "ionicons/icons"
import { reactive } from 'vue';

import { IHomeState } from "@/types"
import { getMonthAndDay, getWeesByDay } from "@/utils/helpers"
import { addDays, subDays } from 'date-fns';
import { storeState } from "@/store"

const state = reactive<IHomeState>({
  weesDuringDay: [],
  averageWeeDuringDay: undefined,
  currentDate: new Date(),
  fetchingWees: false,
})

getWeesByDay(state)

storeState.fetchUserData()

const handleAddDays = () => {
  state.currentDate = addDays(state.currentDate, 1)
  getWeesByDay(state)

}

const handleSubDays = () => {
  state.currentDate = subDays(state.currentDate, 1)
  getWeesByDay(state)

}




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

.chevronContainer {
  margin-top: 20px;
  display: flex;
  justify-content: space-around;
  align-items: center;
}

.fabButton {
  background-color: aliceblue;
  padding: 10px;
  border-radius: 10px;
  cursor: pointer;
}

.container {
  display: flex;
  justify-content: center;
  align-items: center;
}

.flex-col {
  flex-direction: column;
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

.lg {
  font-size: larger;
}

.xl {
  font-size: x-large;
}
</style>