<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-title>Change Password</ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content :fullscreen="true">
            <ion-card>
                <ion-img
                    src="https://png.pngtree.com/png-vector/20191113/ourmid/pngtree-lock-password-password-lock-secure-password-blue-icon-on-abst-png-image_1985473.jpg" />
                <ion-card-content>
                    <ion-card-title>
                        Change Your Password
                    </ion-card-title>
                    <ion-item>
                        <ion-label position="floating">New Password</ion-label>
                        <ion-input type="password" v-model="state.newPassword" />
                    </ion-item>
                    <div class="container ion-margin-top ion-margin-bottom">
                        <ion-button class="saveButton">Ok</ion-button>
                    </div>
                </ion-card-content>
            </ion-card>
        </ion-content>
    </ion-page>
</template>

<script setup lang="ts" >
import { useUsersStore } from '@/store/useUsersStore';
import { IonPage, IonHeader, IonToolbar, IonContent, IonLabel, IonInput, IonTitle, IonCard, IonImg, IonCardContent, IonCardTitle } from '@ionic/vue';
import { storeToRefs } from 'pinia';

const store = useUsersStore()
const { state } = storeToRefs(store)

</script>

<style scoped>
.saveButton {
    width: 50%;
}

.container {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>