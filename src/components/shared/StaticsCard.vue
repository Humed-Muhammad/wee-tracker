<template>
    <ion-label class="ion-margin cardLabel">{{ props.label }}</ion-label>

    <ion-card class="weeCard container justify-around">
        <div>
            <ion-card-header>
                <ion-card-title class="cardTitle">Min</ion-card-title>
            </ion-card-header>

            <ion-card-content class="justify-center items-center flex flex-col">
                <ion-text class="weeText" v-if="!props.loading">
                    {{ convertUnits(props.min, props.weeMeasurement) }} {{ props.weeMeasurement }}
                </ion-text>
                <ion-skeleton-text v-else />
            </ion-card-content>
        </div>
        <vertical-divider />
        <div>
            <ion-card-header>
                <ion-card-title class="cardTitle">Avg</ion-card-title>
            </ion-card-header>

            <ion-card-content class="justify-center items-center flex flex-col">
                <ion-text class="weeText" v-if="!props.loading">
                    {{ convertUnits(props.avg, props.weeMeasurement) }} {{ props.weeMeasurement }}
                </ion-text>
                <ion-skeleton-text v-else />
            </ion-card-content>
        </div>
        <vertical-divider />
        <div>
            <ion-card-header>

                <ion-card-title class="cardTitle">Max</ion-card-title>
            </ion-card-header>

            <ion-card-content class="justify-center items-center flex flex-col">
                <ion-text class="weeText" v-if="!props.loading">
                    {{ convertUnits(props.max, props.weeMeasurement) }} {{ props.weeMeasurement }}
                </ion-text>
                <ion-skeleton-text v-else />
            </ion-card-content>
        </div>
    </ion-card>
</template>

<script setup lang="ts" >
import { convertUnits } from "@/utils/baseUtils";
import { IonCard, IonCardHeader, IonCardContent, IonText, IonSkeletonText, IonLabel, IonCardTitle } from "@ionic/vue"

import VerticalDivider from "./VerticalDivider.vue";
interface Props {
    weeMeasurement?: "fl. oz." | "ML" | undefined;
    max: number | undefined;
    min: number | undefined;
    avg: number | undefined;
    label: string;
    loading: boolean
}

const props = defineProps<Props>()

</script>

<style scoped>
.weeText {
    color: #04ae6d;
    font-weight: 600;
}

.cardTitle {
    font-weight: 600;
    font-size: larger;
}

.weeCard {
    flex-grow: 1;
    margin-top: 15px;
    margin-bottom: 15px;
}

.cardLabel {
    margin-top: 30px;
    color: gray;
}
</style>