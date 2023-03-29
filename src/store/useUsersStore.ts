import { IUserStoreState } from "@/types";
import { auth, db, provider } from "@/utils";
import { getUSerData, presentToast, updateUserData } from "@/utils/helpers";
import { getAuth, signInWithPopup } from "firebase/auth";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { defineStore } from "pinia";
import { ref } from "vue";
import {
  getDownloadURL,
  ref as fireBaseRef,
  uploadBytesResumable,
} from "firebase/storage";
import { useRouter } from "vue-router";

import { getStorage } from "firebase/storage";
import { warning } from "ionicons/icons";

export const useUsersStore = defineStore("users", () => {
  const state = ref<IUserStoreState>({
    profilePhoto: undefined,
    profilePhotoPreview: undefined,
    profilePhotoName: "",
    uploadingFile: false,
    authenticated: false,
    isModalOpen: false,
    errorMsg: "",
    updatingData: false,
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
  const signInWithGoogle = async () => {
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
        };
        state.value.authenticated = true;

        await setDoc(doc(db, "users", user?.uid), data);

        router.push("/");
      })
      .catch((error) => {
        state.value.errorMsg = error.message;
      });
  };

  /**Logout */
  const logOut = () => {
    auth.signOut();
    router.push("/auth");
  };

  /**FetchUser data */
  getUSerData(state.value);

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

  /**
   * @Upload
   * Profile Photo upload
   *
   */
  const storage = getStorage();

  const confirmProfileChange = async () => {
    const storageRef = fireBaseRef(
      storage,
      `images/${state.value?.profilePhotoName}`
    );
    const uploadTask = uploadBytesResumable(
      storageRef,
      state.value?.profilePhoto as ArrayBuffer
    );
    state.value.uploadingFile = true;
    uploadTask.on(
      "state_changed",
      null,
      (error) => {
        switch (error.code) {
          case "storage/unauthorized":
            // User doesn't have permission to access the object
            presentToast(
              "User doesn't have permission to access the object",
              "error",
              warning
            );
            break;
          case "storage/canceled":
            // User canceled the upload
            presentToast("Upload canceled", "warning", warning);
            break;
          case "storage/unknown":
            // Unknown error occurred, inspect error.serverResponse
            presentToast("Unknown error occurred", "error", warning);

            break;
        }
      },
      () => {
        // Handle successful uploads on complete

        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          updateUserData(state.value, {
            profileURL: downloadURL,
          });
          state.value.uploadingFile = false;
          state.value.isModalOpen = false;
        });
      }
    );
  };
  /**@End */

  return {
    signInWithGoogle,
    updateUserWeeMeasurement,
    logOut,
    toggleModal,
    state,
    getProfilePhotoFile,
    confirmProfileChange,
  };
});
