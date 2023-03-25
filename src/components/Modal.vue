<template>
    <ion-modal ref="modal" trigger="open-modal" id="modal" :initial-breakpoint="0.25" :breakpoints="[0, 0.25, 0.5, 0.75]">
        <ion-content class="ion-padding">

            <strong>Add your wee data</strong>
            <ion-list>
                <div id="#container">
                    <ion-item>
                        <ion-label>Wee Measurement</ion-label>
                        <ion-select interface="popover" name="weeMeasurement" v-model="state.weeMeasurement"
                            placeholder="Select Wee Measurement" aria-required="true">
                            <ion-select-option value="ML">ML</ion-select-option>
                            <ion-select-option value="fl. oz.">fl. oz.</ion-select-option>
                        </ion-select>

                    </ion-item>
                    <ion-item>
                        <ion-label>Wee amount</ion-label>
                        <ion-input name="weeML" clearInput autofocus v-model="state.weeML" type="number"
                            placeholder="Add your wee here" required></ion-input>


                    </ion-item>
                </div>
                <ion-item class="ion-margin-top">
                    <ion-datetime name="weeTime" aria-required="true" v-model="state.weeTime"></ion-datetime>


                </ion-item>
                <ion-item>
                    <ion-label>Urgency</ion-label>
                    <ion-toggle v-model="state.urgency" />
                </ion-item>
                <ion-item>
                    <ion-label>Incontinence</ion-label>
                    <ion-toggle v-model="state.incontinence" />
                </ion-item>
            </ion-list>
            <div id="buttonContainer">
                <ion-button v-if="!state.creatingDoc" @click="handleSubmit" size="default">Submit</ion-button>
                <ion-spinner v-else name="crescent">Submitting</ion-spinner>
            </div>

        </ion-content>
    </ion-modal>
</template>
  
<script lang="ts">
import { db, auth } from '@/utils';
import { weeSchema } from '@/utils/validationSchemas';
import {
    IonModal,
    IonContent,
    IonItem,
    IonList,
    IonLabel,
    IonDatetime,
    IonInput,
    IonButton,
    IonSpinner,
    IonSelect,
    IonSelectOption,
    IonToggle,
} from '@ionic/vue';
import { defineComponent, reactive } from 'vue';
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { useForm, Form as ValidationForm } from 'vee-validate';
import { format, parseISO } from 'date-fns';
import { presentToast } from '@/utils/helpers';

export default defineComponent({
    name: "WeeModal",
    components: {
        IonModal,
        IonContent,
        IonItem,
        IonList,
        IonLabel,
        IonInput,
        IonDatetime,
        IonButton,
        IonSpinner,
        IonSelect,
        IonSelectOption,
        IonToggle,
        // ValidationForm,
    },
    setup() {
        const state = reactive({
            weeMeasurement: '',
            weeML: undefined,
            weeTime: "",
            creatingDoc: false,
            urgency: false,
            incontinence: false
        });



        const handleSubmit = async () => {
            try {
                state.creatingDoc = true;
                const docRef = await addDoc(collection(db, "wees"), {
                    uid: auth?.currentUser?.uid,
                    weeTime: {
                        date: format(parseISO(state.weeTime), "PP"),
                        time: format(parseISO(state.weeTime), "p")
                    },
                    weeML: state.weeML,
                    weeMeasurement: state.weeMeasurement,
                    incontinence: state.incontinence,
                    urgency: state.urgency,
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


        useForm({
            initialValues: state,
            validateOnMount: false,
            validationSchema: weeSchema,

        });
        return {
            state,
            handleSubmit,
            ValidationForm
        };
    }
});
</script>

<style scoped>
#container {
    display: flex;
}

#modal {
    overflow-y: auto;
}

#buttonContainer {
    widows: 100%;
    display: flex;
    justify-content: center;
}
</style>