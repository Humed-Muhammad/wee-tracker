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
import { reactive, toRefs } from "vue";
import { useRouter } from "vue-router";
import { getAuth, signInWithPopup } from "firebase/auth";
import { db, provider } from "@/utils"
import { logoGoogle } from 'ionicons/icons';
import { doc, serverTimestamp, setDoc } from "@firebase/firestore";

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
        const router = useRouter();

        const state = reactive({
            authenticated: false,
            errorMsg: "",
        });
        const signInWithGoogle = async (
        ) => {

            const auth = getAuth();
            signInWithPopup(auth, provider)
                .then(async (result) => {

                    const user = result.user;

                    const data = {
                        uid: user?.uid,
                        email: user?.email,
                        createdAt: serverTimestamp(),
                        fullName: user?.displayName,
                        phoneNumber: user?.phoneNumber,
                        weeMeasurement: "",
                    }
                    state.authenticated = true;

                    await setDoc(doc(db, "users", user?.uid), data);

                    router.push('/')
                }).catch((error) => {
                    state.errorMsg = error.message;
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

                </ion-card-content>
            </ion-card>
        </ion-content>
    </ion-page>
</template>