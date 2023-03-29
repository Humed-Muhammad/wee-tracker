<template>
    <ion-modal :is-open="state.isModalOpen">
        <ion-header>
            <ion-toolbar>
                <ion-title>Confirm</ion-title>
                <ion-buttons slot="end">
                    <ion-button @click="store.toggleModal">Close</ion-button>
                </ion-buttons>
            </ion-toolbar>
        </ion-header>
        <ion-content class="ion-padding">
            <img :src="state.profilePhotoPreview?.toString()" />
            <div class="btnContainer ion-margin-top">
                <ion-button @click="store.toggleModal" class="cancelBtn">Cancel</ion-button>
                <ion-button v-if="!state.uploadingFile" @click="store.confirmProfileChange"
                    class="confirmBtn">Confirm</ion-button>
                <ion-button class="confirmBtn" v-else>
                    <ion-spinner name="crescent" />
                </ion-button>
            </div>
        </ion-content>
    </ion-modal>
</template>
  
<script lang="ts" setup>
import { useUsersStore } from '@/store/useUsersStore';
import { IonButtons, IonButton, IonModal, IonHeader, IonToolbar, IonContent, IonTitle, IonSpinner } from '@ionic/vue';
import { storeToRefs } from 'pinia';

const store = useUsersStore()
const { state } = storeToRefs(store)

</script>

<style scoped>
.btnContainer {
    display: flex;
    justify-content: space-around;
    width: 100%;
    /* flex-direction: column; */
    align-items: center;
}

.cancelBtn {
    --background: rgb(192, 0, 0);
    border: 1px solid;
    border-radius: 5px;
    font-size: 17px;
    width: 50%;
}

.confirmBtn {
    font-size: 17px;
    --background: rgb(0, 177, 0);
    border: 1px solid;
    width: 50%;
}
</style>