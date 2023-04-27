<script setup lang="ts">
import { generateCalendarWeeData } from "@/utils/monthly";
import {
    IonLabel,
    IonPage,
    IonHeader,
    IonToolbar,
    IonContent,
    IonSegment,
    IonSegmentButton,
    IonDatetime
} from "@ionic/vue";
import { useMonthlyStore } from "@/store/useMonthlyStore";
import { storeToRefs } from "pinia";
const store = useMonthlyStore()
const { state } = storeToRefs(store)

</script>

<template>
    <ion-page>

        <ion-header>
            <ion-toolbar>
                <ion-segment value="Wee">
                    <ion-segment-button value="Wee">
                        <ion-label>Wee Calender</ion-label>
                    </ion-segment-button>
                </ion-segment>
            </ion-toolbar>
        </ion-header>
        <ion-content :fullscreen="true">

            <div class="container">

                <ion-datetime class="w-full ion-margin-top" presentation="date"
                    :highlighted-dates="generateCalendarWeeData(state.allWees)"></ion-datetime>
            </div>
        </ion-content>
    </ion-page>
</template>