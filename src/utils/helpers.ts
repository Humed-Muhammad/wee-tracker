import { IHomeStoreState, IUserStoreState, IWeeDuringDaysData } from "@/types";
import { toastController } from "@ionic/vue";
import { mean } from "lodash";
import {
  // endOfDay
  format,
  // formatISO, subDays
} from "date-fns";
import {
  collection,
  doc,
  DocumentData,
  getDocs,
  onSnapshot,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { auth, db } from ".";
import { checkbox, warning } from "ionicons/icons";
import { Color } from "@ionic/core";

const weeRef = collection(db, "wees");
const userRef = collection(db, "users");

export const getWeesByDay = (state: IHomeStoreState) => {
  try {
    state.fetchingWees = true;
    const dayWeesQuery = query(
      weeRef,

      where("uid", "==", auth.currentUser?.uid),
      where("weeTime.date", "==", format(state.currentDate, "PP"))
    );

    const unsubscribe = onSnapshot(dayWeesQuery, (querySnapshot) => {
      const result: IWeeDuringDaysData[] | DocumentData = [];
      querySnapshot.forEach((doc) => {
        result.push(doc.data());
      });

      state.chartData = result.map((data: IWeeDuringDaysData) => data.weeML);
      state.chartLabel = result.map(
        (data: IWeeDuringDaysData) => data.weeTime.time
      );

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

export const presentToast = async (
  message: string,
  color: Color,
  icon?: string | undefined
) => {
  const toast = await toastController.create({
    message,
    duration: 1500,
    icon: icon,
    color,
  });

  await toast.present();
};

export const calculateWeeAverage = (
  weesDuringDay: IWeeDuringDaysData[] | DocumentData
) => {
  const weeML = weesDuringDay?.map((item: IWeeDuringDaysData) =>
    Number(item.weeML)
  );

  return Math.round(mean(weeML)) || 0;
};

export const getUSerData = async (state: IUserStoreState) => {
  const userQuery = query(userRef, where("uid", "==", auth.currentUser?.uid));

  await getDocs(userQuery)
    .then((data) => {
      data.forEach((doc) => {
        state.user = doc.data();
      });
    })
    .catch((err) => {
      presentToast("Error during fetching", "warning", warning);

      console.log(err);
    });
};

export const updateUserData = async (state: IUserStoreState) => {
  state.updatingData = true;
  const docRef = doc(db, "users", auth.currentUser?.uid as string);
  updateDoc(docRef, {
    weeMeasurement: state.user.weeMeasurement,
  })
    .then(() => {
      state.updatingData = false;
      presentToast("Measurement updated successfully", "success", checkbox);
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

export const convertUnits = (unit: string, to: "FlOz" | "ML") => {
  if (!to) {
    throw new Error("to is required!.");
  }
  if (to === "ML") {
    return Math.round(Number(unit) * 0.033814);
  }
  return Math.round(Number(unit) * 29.5735);
};
