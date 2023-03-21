<template>
  <ion-fab id="addIcon">
    <ion-fab-button id="open-modal">
      <ion-icon :icon="add"></ion-icon>
    </ion-fab-button>
  </ion-fab>
  <Modal />
</template>

<script setup lang="ts">
import { add } from 'ionicons/icons';
import Modal from './Modal.vue';
defineProps({
  name: String,
});


</script>

<style scoped>
#addIcon {
  position: absolute;
  top: 83%;
  left: 50%;
  transform: translateX(-50%);
}

#container strong {
  font-size: 20px;
  line-height: 26px;
}

#container p {
  font-size: 16px;
  line-height: 22px;
  color: #8c8c8c;
  margin: 0;
}

#container a {
  text-decoration: none;
}
</style>
