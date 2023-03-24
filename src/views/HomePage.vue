<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <!-- <ion-title>Home</ion-title> -->
        <ion-segment value="Wee">
          <ion-segment-button value="Wee">
            <ion-label>Wee</ion-label>
          </ion-segment-button>
          <ion-segment-button value="Fluid">
            <ion-label>Fluid</ion-label>
          </ion-segment-button>
        </ion-segment>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-card>
        <ion-card-header>
          <ion-card-title style="color: darkcyan;">Your Daily Wee</ion-card-title>
          <ion-card-subtitle>Last 7 days</ion-card-subtitle>
        </ion-card-header>

        <ion-card-content class="cardContent">
          <div>
            <ion-card-subtitle>Average</ion-card-subtitle>
            <ion-text class="averageText">245ml</ion-text>
          </div>
          <div class="dailyContainer">

            <ion-text v-for="(item, index) in state.lastSevenDays" :key="index" class="averageText">
              <p>{{ getDay(new Date(item?.weeTime)) }}</p>
              <p class="weeClass">{{ item?.weeML || 0 }}</p>
              <p>{{ item?.weeMeasurement || "ML" }}</p>
            </ion-text>
          </div>
        </ion-card-content>
      </ion-card>
      <AddWeeData name="Home" />
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonHeader, IonToolbar, IonCard, IonCardHeader, IonCardSubtitle, IonContent, IonSegment, IonSegmentButton, IonText } from '@ionic/vue';
import AddWeeData from '@/components/AddWeeData.vue';
import { reactive } from 'vue';

import { getDay } from "date-fns"
import { IHomeState } from "@/types"
import { getLastWeekWeeData } from "@/utils/helpers"


const state = reactive<IHomeState>({
  lastSevenDays: [],
  sevenDaysAverage: undefined
})

getLastWeekWeeData(state)

</script>

<style scoped>
.averageText {
  color: darkcyan;
  margin: 2px;
  text-align: center;
}

.cardContent {
  display: flex;
  justify-content: space-between;
}

.dailyContainer {
  display: flex;
  flex-direction: row;
  line-height: 1;
}
</style>