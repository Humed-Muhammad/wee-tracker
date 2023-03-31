<script lang="ts" setup>

import {
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonCard,
    IonCardSubtitle,
    IonCardHeader,
    IonCardContent,
    IonCardTitle,

} from "@ionic/vue";
import { useUsersStore } from "@/store/useUsersStore";
import { storeToRefs } from "pinia";
import SigninWithGoogle from "@/components/shared/SigninWithGoogle.vue";
// import SignInWithGoogle from '@/components/shared/SigninWithGoogle.vue'

const store = useUsersStore()
const { state } = storeToRefs(store)
const { signInWithGoogle, } = store


</script>

<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-title>Wee Tracker</ion-title>
            </ion-toolbar>
        </ion-header>

        <ion-content :fullscreen="true" class="ion-justify-content ion-align-items-center ion-display-flex" color="red">
            <div class="container">
                <ion-card>
                    <ion-card-header>
                        <ion-card-subtitle>Welcome to Wee Tracker!</ion-card-subtitle>
                        <ion-card-title> Sign In </ion-card-title>
                        <img src="assets/login.jpg" />
                    </ion-card-header>

                    <ion-card-content
                        class="ion-justify-content ion-align-items-center ion-display-flex ion-flex-direction-column">
                        <SigninWithGoogle :command="signInWithGoogle" :is-signing-in="state.isSigningIn" />
                    </ion-card-content>
                </ion-card>
            </div>
        </ion-content>
    </ion-page>
</template>


<style scoped>
.signInBtn {
    width: 90%;
    font-size: 16px;
    text-align: center;
}

.container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
}
</style>