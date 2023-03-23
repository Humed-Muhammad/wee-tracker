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
            <ion-text class="averageText">45</ion-text>
            <span>ml</span>

          </div>
        </ion-card-content>
      </ion-card>
      <AddWeeData name="Home" />
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonHeader, IonToolbar, IonCard, IonCardHeader, IonCardSubtitle, IonContent, IonSegment, IonSegmentButton, IonItem, IonText } from '@ionic/vue';
import AddWeeData from '@/components/AddWeeData.vue';
import { reactive } from 'vue';
import { collection, DocumentData, getDoc, getDocs, orderBy, query, where } from '@firebase/firestore';
import { auth, db } from '@/utils';
import { formatISO, endOfDay } from "date-fns"
import {ILastSevenDaysData} from "@/types"

interface IState {
  lastSevenDays: ILastSevenDaysData[] | undefined|DocumentData,
  sevenDaysAverage: number | undefined,
}

const state = reactive<IState>({
  lastSevenDays: [],
  sevenDaysAverage: undefined
})

const weeRef = collection(db, "wees");

const userWeesQuery = query(weeRef, orderBy("weeTime"), where("weeTime", "<=", formatISO(endOfDay(new Date()))));
const querySnapshot = getDocs(userWeesQuery).then(data => {

  data.forEach((doc) => {
    
    state.lastSevenDays?.push(doc.data());
  });
});
</script>

<style scoped>
.averageText {
  color: darkcyan;
  margin: 2px;
}

.cardContent {
  display: flex;
  justify-content: space-between;
}

.dailyContainer {
  display: flex;
  flex-direction: column;
  line-height: 1;
}
</style>