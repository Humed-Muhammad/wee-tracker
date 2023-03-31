<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Settings</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-icon v-if="!state.fetchingUserData" @click="chooseFile" class="camera" :icon="camera"></ion-icon>
      <input @change="store.getProfilePhotoFile" style="display: none;" type="file" ref="input" accept="image/*" />
      <ion-card class="container">
        <div class="profileImageContainer" style="position: relative;" v-if="!state.fetchingUserData">
          <img style="width: 100%; object-fit: cover;" alt="user profile"
            :src="state.user.profileURL || auth.currentUser?.photoURL" />
        </div>
        <ion-skeleton-text v-else style="height: 300px;" :animated="true"></ion-skeleton-text>
        <ion-card-header>
          <ion-card-title>{{ auth.currentUser?.displayName }}</ion-card-title>
          <ion-card-subtitle style="text-transform: none; font-size: larger;">{{ auth.currentUser?.email
          }}</ion-card-subtitle>
        </ion-card-header>

        <ion-card-content>
          <ion-item>
            <ion-label position="stacked">Your Wee Measurement</ion-label>
            <ion-select interface="popover" name="weeMeasurement" v-model="state.user.weeMeasurement"
              placeholder="Select Wee Measurement">
              <ion-select-option value="ML">ML</ion-select-option>
              <ion-select-option value="fl. oz.">fl. oz.</ion-select-option>
            </ion-select>
          </ion-item>

          <div class="logoutButtonContainer">
            <ion-button v-if="!state.updatingData" class="saveButton" size="small"
              @click="store.updateUserWeeMeasurement">Save</ion-button>
            <ion-button class="saveButton" v-else>
              <ion-spinner name="dots" />
            </ion-button>
          </div>
          <div class="logoutButtonContainer">
            <ion-label position="stacked" />
            <ion-button @click="store.logOut" class="logoutButton" size="small">Logout</ion-button>
          </div>
          <div class="ion-padding">
            <ion-text @click="router.push('/change-password')" class="changePasswordText">Change Password?</ion-text>
          </div>
        </ion-card-content>
      </ion-card>

      <profile-update-modal />

    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import ProfileUpdateModal from '@/components/ProfileUpdateModal.vue';
import { useUsersStore } from '@/store/useUsersStore';
import { auth } from '@/utils';
import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonLabel, IonSelect, IonSelectOption, IonItem, IonIcon, IonSkeletonText, IonCardTitle, IonCardSubtitle, IonCardHeader, IonSpinner, IonText, IonCardContent, IonCard,
} from '@ionic/vue';
import { camera } from 'ionicons/icons';
import { storeToRefs } from 'pinia';
import { ref, VueElement } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter()
const store = useUsersStore()
const { state } = storeToRefs(store)

/**@FetchUserData */
store.fetchUserData()

const input = ref<VueElement>()

const chooseFile = () => {
  console.log(input.value)
  input?.value?.click()
}


</script>

<style scoped>
.logoutButtonContainer {
  display: flex;
  width: 100%;
  justify-content: center;
}

.logoutButton {
  --background: rgb(218, 8, 8);
  border-radius: 5px;
  font-size: medium;
  margin: 10px;
  width: 100%;
}

.saveButton {
  border-radius: 5px;
  font-size: medium;
  margin: 10px;
  width: 100%;
}

.camera {
  background-color: rgb(61, 57, 57);
  color: white;
  font-size: 30px;
  border: 1px solid rgb(82, 82, 82);
  border-radius: 10%;
  padding: 7px;
  cursor: pointer;
  position: absolute;
  z-index: 9999;
  left: 16px;
  top: 67px;
}

.profileImageContainer {
  width: 100%;
  height: auto;
}

.changePasswordText {
  color: rgb(24, 126, 221);
}
</style>