import { IUserStoreState } from "@/types";
import { auth, db, provider } from "@/utils";
import {
  changeProfilePhoto,
  getUSerData,
  presentToast,
  updateUserData,
} from "@/utils/helpers";
import { subscribeToUserDataChanged } from "@/utils/subscribe";
import { signInWithPopup, updatePassword, User } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { checkbox, warning } from "ionicons/icons";
import { defineStore } from "pinia";
import { ref } from "vue";
import { useRouter } from "vue-router";

export const useUsersStore = defineStore("users", () => {
  const state = ref<IUserStoreState>({
    profilePhoto: undefined,
    profilePhotoPreview: undefined,
    profilePhotoName: "",
    uploadingFile: false,
    updatingProfile: false,
    isSigningIn: false,
    isModalOpen: false,
    errorMsg: "",
    updatingData: false,
    fetchingUserData: false,
    userCredentials: undefined,
    newPassword: "",
    user: {
      email: "",
      fullName: "",
      phoneNumber: "",
      uid: "",
      weeMeasurement: "",
      profileURL: "",
    },
  });
  const router = useRouter();
  const signInWithGoogle = async (shouldNavigate?: boolean) => {
    state.value.isSigningIn = true;
    signInWithPopup(auth, provider)
      .then(async (result) => {
        state.value.userCredentials = result;
        const user = result.user;

        const data = {
          uid: user?.uid,
          email: user?.email,
        };

        await setDoc(doc(db, "users", user?.uid), data);

        shouldNavigate && router.push("/");
        state.value.isSigningIn = false;
      })
      .catch((error) => {
        state.value.isSigningIn = false;
        state.value.errorMsg = error.message;
      });
  };

  /**Logout */
  const logOut = () => {
    auth.signOut();
    router.push("/auth");
  };

  /**@Fetch User data */
  const fetchUserData = () => {
    if (auth.currentUser?.uid) {
      getUSerData(state.value);
    }
  };

  const updateUserWeeMeasurement = () => {
    updateUserData(state.value, {
      weeMeasurement: state.value.user.weeMeasurement,
    });
  };

  const toggleModal = () => {
    state.value.isModalOpen = !state.value.isModalOpen;
  };

  const getProfilePhotoFile = (event: any) => {
    state.value.profilePhotoName = event?.target?.files[0]?.name;
    state.value.profilePhoto = event?.target?.files[0];

    const reader = new FileReader();
    reader.onloadend = function () {
      state.value.profilePhotoPreview = reader.result;
    };
    reader.readAsDataURL(event?.target.files[0]);
    state.value.isModalOpen = true;
  };

  const confirmProfileChange = () => {
    changeProfilePhoto(state.value);
  };

  const changePassword = () => {
    const user = auth.currentUser;
    if (state.value.newPassword && user) {
      updatePassword(user as User, state.value.newPassword)
        .then(() => {
          // Update successful.
          presentToast("Password Successfully Changed", "success", checkbox);
        })
        .catch(() => {
          // An error ocurred
          presentToast("An Error Occurred", "error", warning);
          // ...
        });
    }
  };

  /**@Realtime Subscription*/
  subscribeToUserDataChanged(state.value);
  /**@End */
  return {
    signInWithGoogle,
    updateUserWeeMeasurement,
    logOut,
    toggleModal,
    state,
    getProfilePhotoFile,
    confirmProfileChange,
    changePassword,
    fetchUserData,
  };
});
