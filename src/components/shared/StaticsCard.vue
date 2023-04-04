<template>
    <ion-label class="ion-margin cardLabel">{{ props.label }}</ion-label>

    <ion-card class="weeCard container">
        <div>
            <ion-card-header>
                <ion-card-title class="cardTitle">Min</ion-card-title>
            </ion-card-header>

            <ion-card-content class="ion-justify-content ion-align-items-center ion-display-flex ion-flex-direction-column">
                <ion-text class="weeText">
                    {{ convertUnits(props.min, props.weeMeasurement) }} {{ props.weeMeasurement }}
                </ion-text>
            </ion-card-content>
        </div>
        <div>
            <ion-card-header>

                <ion-card-title class="cardTitle">Avg</ion-card-title>
            </ion-card-header>

            <ion-card-content class="ion-justify-content ion-align-items-center ion-display-flex ion-flex-direction-column">
                <ion-text class="weeText">
                    {{ convertUnits(props.avg, props.weeMeasurement) }} {{ props.weeMeasurement }}
                </ion-text>
            </ion-card-content>
        </div>
        <div>
            <ion-card-header>

                <ion-card-title class="cardTitle">Max</ion-card-title>
            </ion-card-header>

            <ion-card-content class="ion-justify-content ion-align-items-center ion-display-flex ion-flex-direction-column">
                <ion-text class="weeText">
                    {{ convertUnits(props.max, props.weeMeasurement) }} {{ props.weeMeasurement }}
                </ion-text>
            </ion-card-content>
        </div>
    </ion-card>
</template>

<script setup lang="ts" >
import { convertUnits } from "@/utils/baseUtils";
import { IonCard, IonCardHeader, IonCardContent } from "@ionic/vue"
import { defineProps } from "vue"
interface Props {
    weeMeasurement: "fl. oz." | "ML";
    max: number | undefined;
    min: number | undefined;
    avg: number | undefined;
    label: string;
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
}

.cardLabel {
    margin-top: 30px;
    color: gray;
}
</style>