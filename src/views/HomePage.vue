<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title size="small">Home</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Home</ion-title>
          <!-- <ion-button size="small" @click="logOut">Logout</ion-button> -->
        </ion-toolbar>
      </ion-header>

      <AddWeeData name="Home" />
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/vue';
import AddWeeData from '@/components/AddWeeData.vue';

</script>
