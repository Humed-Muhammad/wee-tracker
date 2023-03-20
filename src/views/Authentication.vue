<script lang="ts">

import {
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonCard,
    IonCardSubtitle,
    // IonCardTitle,
    IonCardHeader,
    IonCardContent,
    IonButton,
    IonIcon,
    IonText
} from "@ionic/vue";
import { reactive, toRefs } from "vue";
import { useRouter } from "vue-router";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { provider } from "@/utils"
import { logoGoogle } from 'ionicons/icons';

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
        IonText
    },
    setup() {
        const router = useRouter();

        const state = reactive({
            authenticated: false,
            errorMsg: "",
        });
        const signInWithGoogle = async (
        ) => {

            const auth = getAuth();
            signInWithPopup(auth, provider)
                .then((result) => {
                    // This gives you a Google Access Token. You can use it to access the Google API.
                    const credential = GoogleAuthProvider.credentialFromResult(result);
                    const token = credential?.accessToken;
                    // The signed-in user info.
                    const user = result.user;
                    // IdP data available using getAdditionalUserInfo(result)
                    // ...
                    state.authenticated = true;
                }).catch((error) => {
                    // Handle Errors here.
                    const errorCode = error.code;
                    state.errorMsg = error.message;
                    // The email of the user's account used.
                    const email = error.customData.email;
                    // The AuthCredential type that was used.
                    const credential = GoogleAuthProvider.credentialFromError(error);
                    // ...
                });
        };

        return {
            // eslint-disable-next-line no-undef
            ...toRefs(state),
            signInWithGoogle,
            logoGoogle
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
                    <ion-text>{{ authenticated ? "User Authenticated" : "User UnAuthenticated" }}</ion-text>
                </ion-card-content>
            </ion-card>
        </ion-content>
    </ion-page>
</template>