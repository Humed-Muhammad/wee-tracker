import { IUserStoreState } from "@/types";
import { onSnapshot, query, where } from "firebase/firestore";
import { warning } from "ionicons/icons";
import { auth } from ".";
import { userRef } from "./dbRefs";
import { presentToast } from "./helpers";

export const subscribeToUserDataChanged = (storeState: IUserStoreState) => {
  if (auth.currentUser?.uid) {
    const userQuery = query(
      userRef,
      where("uid", "==", auth?.currentUser?.uid)
    );
    onSnapshot(
      userQuery,
      (data) => {
        data.forEach((doc) => {
          storeState.user = doc.data();
        });
      },
      () => {
        presentToast("Error during fetching", "warning", warning);
      }
    );
  }
};
