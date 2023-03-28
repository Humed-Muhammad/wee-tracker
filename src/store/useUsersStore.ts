import { IUserStoreState } from "@/types";
import { auth, db, provider } from "@/utils";
import { getUSerData, updateUserData } from "@/utils/helpers";
import { getAuth, signInWithPopup } from "firebase/auth";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { defineStore } from "pinia";
import { ref } from "vue";
import { useRouter } from "vue-router";

export const useUsersStore = defineStore("users", () => {
  const state = ref<IUserStoreState>({
    authenticated: false,
    count: 0,
    errorMsg: "",
    updatingData: false,
    user: {
      email: "",
      fullName: "",
      phoneNumber: "",
      uid: "",
      weeMeasurement: "",
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
    updateUserData(state.value);
  };

  const inc = () => state.value.count++;
  return {
    signInWithGoogle,
    updateUserWeeMeasurement,
    logOut,
    inc,
    state,
  };
});
