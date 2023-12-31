import { IHomeStoreState, IUserStoreState, IWeeData } from "@/types";

import { endOfWeek, format, startOfWeek } from "date-fns";
import {
  doc,
  DocumentData,
  getDocs,
  onSnapshot,
  query,
  updateDoc,
  where,
  orderBy,
} from "firebase/firestore";
import { auth, db } from ".";
import { checkbox, warning } from "ionicons/icons";
import { calculateWeeAverage, presentToast } from "./baseUtils";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { userRef, weeRef } from "./dbRefs";
import { uuidv4 } from "@firebase/util";

export const getWeesByDay = (state: IHomeStoreState) => {
  try {
    state.fetchingWees = true;
    const dayWeesQuery = query(
      weeRef,
      where("uid", "==", auth.currentUser?.uid),
      where("weeDate", "==", format(state.currentDate, "PP")),
      orderBy("weeTime")
    );

    onSnapshot(dayWeesQuery, (querySnapshot) => {
      const result: IWeeData[] | DocumentData = [];
      querySnapshot.forEach((doc) => {
        result.push(doc.data());
      });

      state.chartData = result.map((data: IWeeData) => data.weeML);
      state.chartLabel = result.map((data: IWeeData) => data.weeTime);

      state.weesDuringDay = result;

      state.averageWeeDuringDay = calculateWeeAverage(result);

      state.fetchingWees = false;
    });
    // unsubscribe();
  } catch (error) {
    presentToast("Error during fetching", "warning", warning);
    state.fetchingWees = false;
  }
};

export const getMonthAndDay = (date: Date) => {
  return `${format(date, "LLL")} ${format(date, "d")}`;
};

export const getUSerData = async (state: IUserStoreState) => {
  state.fetchingUserData = true;
  const userQuery = query(
    userRef,
    where("uid", "==", auth?.currentUser?.uid || "")
  );

  await getDocs(userQuery)
    .then((data) => {
      data.forEach((doc) => {
        state.user = doc.data();
        state.fetchingUserData = false;
      });
    })
    .catch(() => {
      state.fetchingUserData = false;
      presentToast("Error during fetching", "warning", warning);
    });
};

export const updateUserData = async (state: IUserStoreState, data: any) => {
  state.updatingData = true;
  const docRef = doc(db, "users", auth.currentUser?.uid as string);
  updateDoc(docRef, data)
    .then(() => {
      state.updatingData = false;
      presentToast("Updated successfully", "success", checkbox);
    })
    .catch((err: any) => {
      state.updatingData = false;
      if (err.message) {
        presentToast(err.message, "warning", warning);
      } else {
        presentToast(
          "Error during update please try again!.",
          "warning",
          warning
        );
      }
    });
};

/**
 * @Upload
 * Profile Photo upload
 *
 */
const storage = getStorage();

export const changeProfilePhoto = async (state: IUserStoreState) => {
  const photoExtension = state.profilePhotoName.substring(
    state.profilePhotoName.lastIndexOf(".")
  );
  const storageRef = ref(storage, `images/${uuidv4()}${photoExtension}`);
  const uploadTask = uploadBytesResumable(
    storageRef,
    state?.profilePhoto as ArrayBuffer
  );
  state.uploadingFile = true;
  state.updatingProfile = true;
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
        updateUserData(state, {
          profileURL: downloadURL,
        });
        state.uploadingFile = false;
        state.isModalOpen = false;
        state.updatingProfile = false;
      });
    }
  );
};
/**@End */

/**@WeeksDayAggregator */
export const groupWeeks = (date: Date) => {
  const getStartOfWeek = startOfWeek(date);
  const getEndOfWeek = endOfWeek(date);
  switch (true) {
    case format(getStartOfWeek, "LLL") === format(getEndOfWeek, "LLL"):
      return `${format(getStartOfWeek, "d")} - ${format(
        getEndOfWeek,
        "d"
      )} ${format(getEndOfWeek, "LLLL")}`;
    default:
      return `${format(getStartOfWeek, "d")} ${format(
        getStartOfWeek,
        "LLLL"
      )} - ${format(getEndOfWeek, "d")} ${format(getEndOfWeek, "LLLL")}`;
  }
};

export const getMonthAndYear = (date: Date) => {
  return `${format(date, "MMM")} ${format(date, "Y")}`;
};
