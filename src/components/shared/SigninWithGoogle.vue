<template>
    <ion-button v-if="!props.isSigningIn" color="light" class="ion-margin signInBtn" @click="props.command">
        <ion-img style="width: 35px" src="assets/google.png" />
        {{ text || " Sign In With Google" }}
    </ion-button>
    <ion-button color="dark" class="ion-margin signInBtn" v-else>
        <ion-spinner name="dots" />
    </ion-button>
</template>

<script setup lang="ts" >
import { defineProps } from 'vue';
import {
    IonButton,
    IonSpinner,
    IonImg
} from "@ionic/vue"
const props = defineProps<{
    command: () => void,
    isSigningIn: boolean,
    text?: string,
}>()
</script>

<style scoped>
.signInBtn {
    width: 90%;
    font-size: 16px;
    text-align: center;
}
</style>