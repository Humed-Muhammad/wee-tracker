<template>
    <div class="container ion-margin">
        <!--  -->

        <ion-button @click="openPopover" fill="clear">Export Your Data</ion-button>
        <ion-popover :is-open="popoverOpen.open" :event="popoverOpen.event" @didDismiss="closePopover">
            <ion-list lines="none" class="ion-padding">
                <ion-item button @click="props.exportPdf">
                    <ion-icon class="export-icon" :icon="documentTextOutline"></ion-icon>
                    <ion-text class="ion-margin">PDF</ion-text>
                </ion-item>
                <ion-item button @click="props.exportCvs">
                    <ion-icon class="export-icon" :icon="receiptOutline"></ion-icon>
                    <ion-text class="ion-margin">CSV</ion-text>
                </ion-item>
            </ion-list>
        </ion-popover>

    </div>
</template>

<script setup lang="ts">
import { documentTextOutline, receiptOutline } from 'ionicons/icons';
import { IonIcon, IonText, IonPopover, IonButton, IonList, IonItem } from '@ionic/vue';
import { ref } from 'vue';

interface Props {
    exportPdf: () => void;
    exportCvs?: () => void;
}

const props = defineProps<Props>()

const popoverOpen = ref<{
    open: boolean,
    event: Event | null
}>({
    open: false,
    event: null
})

const openPopover = (event: Event) => {
    popoverOpen.value.event = event
    popoverOpen.value.open = true
}

const closePopover = () => {
    popoverOpen.value.open = false
}

</script>