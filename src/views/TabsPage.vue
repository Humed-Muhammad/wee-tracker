<template>
  <ion-page>
    <ion-tabs>
      <ion-router-outlet></ion-router-outlet>
      <ion-tab-bar slot="bottom">
        <ion-tab-button tab="tab1" href="/tab1">
          <ion-icon aria-hidden="true" :icon="homeOutline" />

        </ion-tab-button>

        <ion-tab-button tab="tab2" href="/tab2">
          <ion-icon aria-hidden="true" :icon="barChartOutline" />

        </ion-tab-button>

        <ion-tab-button tab="tab3" href="/tab3">
          <ion-icon aria-hidden="true" :icon="calendar" />

        </ion-tab-button>

        <ion-tab-button tab="tab4" href="/tab4">
          <ion-icon aria-hidden="true" :icon="personOutline" />

        </ion-tab-button>
      </ion-tab-bar>
    </ion-tabs>
  </ion-page>
</template>

<script setup lang="ts">
import { IonTabBar, IonTabButton, IonTabs, IonIcon, IonPage, IonRouterOutlet } from '@ionic/vue';
import { personOutline, homeOutline, barChartOutline, calendar } from 'ionicons/icons';
</script>
