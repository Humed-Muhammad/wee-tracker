<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-title>Password</ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content :fullscreen="true">
            <ion-card>
                <ion-card-header>
                    <ion-card-title> Change Your Password </ion-card-title>
                </ion-card-header>

                <ion-img
                    src="https://png.pngtree.com/png-vector/20191113/ourmid/pngtree-lock-password-password-lock-secure-password-blue-icon-on-abst-png-image_1985473.jpg" />
                <ion-card-content>
                    <div v-if="state.isReAuthenticationSuccess">
                        <ion-item>
                            <ion-input aria-label="New Password" type="password" v-model="state.newPassword" />
                        </ion-item>
                        <div class="container ion-margin-top ion-margin-bottom">
                            <ion-button class="saveButton">Ok</ion-button>
                        </div>
                    </div>
                    <SigninWithGoogle v-else :command="reAuthenticate" :is-signing-in="state.isSigningIn"
                        text="Authenticate" />
                </ion-card-content>
            </ion-card>
        </ion-content>
    </ion-page>
</template>

<script setup lang="ts" >
import { useUsersStore } from '@/store/useUsersStore';
import SigninWithGoogle from '@/components/shared/SigninWithGoogle.vue';
import { IonPage, IonCardHeader, IonHeader, IonToolbar, IonContent, IonItem, IonButton, IonInput, IonTitle, IonCard, IonImg, IonCardContent, IonCardTitle } from '@ionic/vue';
import { storeToRefs } from 'pinia';



const store = useUsersStore()
const { state } = storeToRefs(store)


// TODO(you): prompt the user to re-provide their sign-in credentials

const reAuthenticate = () => {
    store.signInWithGoogle(false)
}



</script>

<style scoped>
.saveButton {
    width: 50%;
}

.container {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>