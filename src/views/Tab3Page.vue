<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Tab 3</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Tab 3</ion-title>
        </ion-toolbar>
      </ion-header>
      <div id="container">
        <ion-button @click="logOut">Logout</ion-button>
      </div>
      <!-- <ExploreContainer name="Tab 3 page" /> -->
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { auth } from '@/utils';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButton } from '@ionic/vue';
import { useRouter } from 'vue-router';
const router = useRouter()
const logOut = () => {
  auth.signOut()
  router.push("/auth")
}
</script>

<style scoped>
#container {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateX(-50%);
}
</style>