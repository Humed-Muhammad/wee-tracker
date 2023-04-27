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

                <ion-datetime @ionChange="handleDateSelect" class="w-full ion-margin-top" presentation="date"
                    :highlighted-dates="generateCalendarWeeData(monthlyState.allWees)"></ion-datetime>
            </div>
        </ion-content>
    </ion-page>
</template>

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
import { useRouter } from "vue-router";
import { useHomeStore } from "@/store/useHomeStore";
import { formatISO } from "date-fns";
import { getWeesByDay } from "@/utils/helpers";

const store = useMonthlyStore()
const homeStore = useHomeStore()

const { state: monthlyState } = storeToRefs(store)
const { state: homeState } = storeToRefs(homeStore)
const router = useRouter()


const handleDateSelect = (value: { detail: { value: string } }) => {
    console.log(value)
    const date = (formatISO(new Date(value.detail.value)))
    homeStore.handleDateChange(new Date(date))
    getWeesByDay(homeState.value);
    router.push('/tab1')
}



</script>


<style scoped>
.calendar-next-prev {
    --display: none;
}
</style>
