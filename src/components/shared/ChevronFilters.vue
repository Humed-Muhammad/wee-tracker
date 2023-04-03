<template>
    <div class="chevronContainer">
        <ion-icon @click="props.handleSubDate" class="fabButton" :icon="chevronBackOutline"></ion-icon>
        <ion-text>{{ props.date }}</ion-text>
        <ion-icon @click="props.handleAddDate" class="fabButton" :icon="chevronForwardOutline"></ion-icon>
    </div>
</template>

<script setup lang="ts" >
import { chevronBackOutline, chevronForwardOutline } from 'ionicons/icons';
import { IonIcon, IonText } from "@ionic/vue"

const props = defineProps<{
    handleAddDate: () => void;
    handleSubDate: () => void;
    date: string
}>()


</script>

<style scoped>
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
</style>