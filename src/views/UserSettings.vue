<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Settings</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">

      <ion-card>
        <img alt="Silhouette of mountains" src="https://ionicframework.com/docs/img/demos/card-media.png" />
        <ion-card-header>
          <ion-card-title>{{ auth.currentUser?.displayName }}</ion-card-title>
          <ion-card-subtitle>{{ auth.currentUser?.email }}</ion-card-subtitle>
        </ion-card-header>

        <ion-card-content>
          <ion-item>
            <ion-label position="stacked">Your Wee Measurement</ion-label>
            <ion-select interface="popover" name="weeMeasurement" v-model="storeState.user.weeMeasurement"
              placeholder="Select Wee Measurement">
              <ion-select-option value="ML">ML</ion-select-option>
              <ion-select-option value="fl. oz.">fl. oz.</ion-select-option>
            </ion-select>
          </ion-item>
          <div class="logoutButtonContainer">
            <ion-label position="stacked" />
            <ion-button @click="logOut" class="logoutButton" size="small">Logout</ion-button>
          </div>
        </ion-card-content>
      </ion-card>

    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { auth } from '@/utils';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonLabel, IonSelect, IonSelectOption, IonItem } from '@ionic/vue';

import { useRouter } from 'vue-router';

import { storeState } from "@/store"
const router = useRouter()

const logOut = () => {
  auth.signOut()
  router.push("/auth")
}


storeState.fetchUserData()
</script>

<style scoped>
#container {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateX(-50%);
}

.logoutButtonContainer {
  display: flex;
  width: 100%;
  justify-content: flex-end;
}

.logoutButton {
  --background: rgb(218, 8, 8);
  border-radius: 5px;
  font-size: medium;
  margin: 10px;
}
</style>