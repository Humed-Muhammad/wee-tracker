<template>
    <ion-modal ref="modal" trigger="open-modal" :initial-breakpoint="0.25" :breakpoints="[0, 0.25, 0.5, 0.75]">
        <ion-content class="ion-padding">
            <div class="ion-margin-top">
                <ion-label>Add your wee data</ion-label>
                <ion-list>
                    <ion-item>
                        <ion-label position="floating" color="gray">Wee amount</ion-label>
                        <ion-input v-model="state.weeML" type="number" placeholder="Wee in ml"></ion-input>
                        <ion-note slot="error">Required</ion-note>
                    </ion-item>
                    <ion-item class="ion-margin-top">
                        <ion-datetime v-model="state.weeTime"></ion-datetime>
                    </ion-item>
                    <ion-item>
                        <ion-button v-if="!state.creatingDoc" @click="handleSubmit" type="button"
                            size="large">Submit</ion-button>
                        <ion-spinner v-else name="crescent"></ion-spinner>
                    </ion-item>
                </ion-list>
            </div>
        </ion-content>
    </ion-modal>
</template>
  
<script lang="ts">
import { db, auth } from '@/utils';
import {
    IonModal,
    IonContent,
    IonItem,
    IonList,
    IonLabel,
    IonDatetime,
    IonNote,
    IonInput,
    IonButton,
    IonSpinner,
    toastController
} from '@ionic/vue';
import { defineComponent, reactive } from 'vue';
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { checkmark } from 'ionicons/icons';
import { Color } from '@ionic/core';

export default defineComponent({
    name: "WeeModal",
    components: {
        IonModal,
        IonContent,
        IonItem,
        IonList,
        IonLabel,
        IonNote,
        IonInput,
        IonDatetime,
        IonButton,
        IonSpinner
    },
    setup() {
        const state = reactive({
            weeML: 0,
            weeTime: "",
            creatingDoc: false
        });

        const presentToast = async (message: string, color: Color) => {
            const toast = await toastController.create({
                message,
                duration: 1500,
                icon: checkmark,
                color
            });

            await toast.present();
        }


        const handleSubmit = async () => {
            try {

                state.creatingDoc = true;
                const docRef = await addDoc(collection(db, "wees"), {
                    uid: auth?.currentUser?.uid,
                    weeTime: state.weeTime,
                    weeML: state.weeML,
                    createdAt: serverTimestamp(),

                });
                if (docRef.id) {
                    state.creatingDoc = false
                    presentToast("Wee successfully created!.", "success",)
                }

            } catch (e: any) {
                presentToast(e.message, "danger",)
                state.creatingDoc = false

            }
        }

        return {
            state,
            handleSubmit
        };
    }
});
</script>