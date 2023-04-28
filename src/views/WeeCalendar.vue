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

            <div class="container flex-col">
                <div class="ion-margin w-full">
                    <StaticsCard :min="calenderState.minWee" :max="calenderState.maxWee"
                        :wee-measurement="userState.user.weeMeasurement" :avg="calenderState.averageWee"
                        label="Amount of Wees" :loading="calenderState.fetchingWees" />
                </div>
                <VCalendar @did-move="calenderStore.handleMove" @dayclick="handleDateSelect" style="width: 100%;"
                    :attributes="calenderState.calenderWees" />
            </div>
        </ion-content>
    </ion-page>
</template>

<script setup lang="ts">

import {
    IonLabel,
    IonPage,
    IonHeader,
    IonToolbar,
    IonContent,
    IonSegment,
    IonSegmentButton,
} from "@ionic/vue";
import { useCalenderStore } from "@/store/useCalenderStore";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";
import { useHomeStore } from "@/store/useHomeStore";
import { getWeesByDay } from "@/utils/helpers";
import StaticsCard from "@/components/shared/StaticsCard.vue";
import { useUsersStore } from "@/store/useUsersStore";


const calenderStore = useCalenderStore()
const homeStore = useHomeStore()
const userStore = useUsersStore()

const { state: calenderState } = storeToRefs(calenderStore)
const { state: homeState } = storeToRefs(homeStore)
const { state: userState } = storeToRefs(userStore)
const router = useRouter()


const handleDateSelect = (value: any) => {
    homeStore.handleDateChange(new Date(value?.date))
    getWeesByDay(homeState.value);
    router.push('/tab1')
}

</script>

