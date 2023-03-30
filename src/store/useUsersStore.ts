import { IUserStoreState } from "@/types";
import { auth, db, provider } from "@/utils";
import { userRef } from "@/utils/dbRefs";
import {
  changeProfilePhoto,
  getUSerData,
  presentToast,
  updateUserData,
} from "@/utils/helpers";
import { getAuth, signInWithPopup, updatePassword, User } from "firebase/auth";
import {
  doc,
  onSnapshot,
  query,
  serverTimestamp,
  setDoc,
  where,
} from "firebase/firestore";
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
    authenticated: false,
    isModalOpen: false,
    errorMsg: "",
    updatingData: false,
    fetchingUserData: false,
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

  /**@Fetch User data */
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
        .catch((error) => {
          // An error ocurred
          presentToast("An Error Occurred", "error", warning);
          // ...
        });
    }
  };

  /**@Realtime Subscription*/
  const userQuery = query(userRef, where("uid", "==", auth?.currentUser?.uid));
  onSnapshot(
    userQuery,
    (data) => {
      data.forEach((doc) => {
        state.value.user = doc.data();
      });
    },
    () => {
      presentToast("Error during fetching", "warning", warning);
    }
  );
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
  };
});
