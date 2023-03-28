<script lang="ts">

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
    IonButton,
    IonIcon,
} from "@ionic/vue";
import { logoGoogle } from 'ionicons/icons';
import { useUsersStore } from "@/store/useUsersStore";
import { storeToRefs } from "pinia";

export default {
    name: "SignIn",
    components: {
        IonHeader,
        IonToolbar,
        IonTitle,
        IonContent,
        IonPage,
        IonCard,
        IonCardSubtitle,
        // IonCardTitle,
        IonCardHeader,
        IonCardContent,
        IonButton,
        IonIcon,
    },
    setup() {
        const store = useUsersStore()
        const { state } = storeToRefs(store)
        // store.fetchUserData()
        const { signInWithGoogle, } = store

        return {
            logoGoogle,
            signInWithGoogle,
            authenticated: state.value.authenticated,
            errorMsg: state.value.errorMsg,
        };
    },
};


</script>

<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-title>Wee Tracker</ion-title>
            </ion-toolbar>
        </ion-header>

        <ion-content :fullscreen="true" class="ion-justify-content ion-align-items-center ion-display-flex" color="red">
            <ion-card>
                <ion-card-header>
                    <ion-card-subtitle>Welcome to Wee Tracker!</ion-card-subtitle>
                    <!-- <ion-card-title> Sign In </ion-card-title> -->
                </ion-card-header>

                <ion-card-content
                    class="ion-justify-content ion-align-items-center ion-display-flex ion-flex-direction-column">

                    <ion-button color="warning" class="ion-margin-top ion-align-self-center" @click="signInWithGoogle">
                        <ion-icon expand="block" slot="start" :icon="logoGoogle"></ion-icon>
                        Sign In
                    </ion-button>

                </ion-card-content>
            </ion-card>
        </ion-content>
    </ion-page>
</template>