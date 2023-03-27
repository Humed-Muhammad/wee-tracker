import { IHomeState, IUser, IWeeDuringDaysData } from "@/types";
import { toastController } from "@ionic/vue";
import { mean } from "lodash";
import {
  // endOfDay
  format,
  // formatISO, subDays
} from "date-fns";
import { collection, getDocs, query, where } from "firebase/firestore";
import { auth, db } from ".";
import { warning } from "ionicons/icons";
import { Color } from "@ionic/core";

const weeRef = collection(db, "wees");
const userRef = collection(db, "users");

export const getWeesByDay = (state: IHomeState) => {
  state.fetchingWees = true;
  let dayWeesQuery = query(weeRef, where("uid", "==", auth.currentUser?.uid));
  dayWeesQuery = query(
    weeRef,
    where("weeTime.date", "==", format(state.currentDate, "PP"))
  );
  getDocs(dayWeesQuery)
    .then((data) => {
      data.forEach((doc) => {
        state.weesDuringDay?.push(doc.data());
      });
      calculateWeeAverage(state);
      state.fetchingWees = false;
    })
    .catch((err) => {
      presentToast("Error during fetching", "warning", warning);
      state.fetchingWees = false;
      console.log(err);
    });
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

export const calculateWeeAverage = (state: IHomeState) => {
  const weeML = state.weesDuringDay?.map((item: IWeeDuringDaysData) =>
    Number(item.weeML)
  );
  state.averageWeeDuringDay = mean(weeML) || 0;
};

export const getUSerData = async (state: IUser) => {
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
