import { IWeeData, IWeeklyStoreState } from "@/types";
import { endOfWeek, formatISO, startOfWeek } from "date-fns";
import { DocumentData, onSnapshot } from "firebase/firestore";
import { warning } from "ionicons/icons";
import { calculateMinAndMax, presentToast } from "../baseUtils";
import { calculateWeeAverage } from "../baseUtils";
import { weeklyQuery } from "./querys";

export const getWeesByWeek = (state: IWeeklyStoreState) => {
  try {
    state.fetchingWeeklyWees = true;

    onSnapshot(
      weeklyQuery({
        startDate: `${formatISO(startOfWeek(state.filterDate))}`,
        endDate: `${formatISO(endOfWeek(state.filterDate))}`,
      }),
      (querySnapshot) => {
        const result: IWeeData[] | DocumentData = [];
        querySnapshot.forEach((doc) => {
          result.push(doc.data());
        });

        state.chartData = result.map((data: IWeeData) => data.weeML);
        state.chartLabel = result.map((data: IWeeData) => data.weeDate);

        state.weesDuringWeek = result;

        state.averageWeeDuringWeek = calculateWeeAverage(result);

        const minAndMax = calculateMinAndMax(result);

        state.minDuringWeek = minAndMax.min;
        state.maxDuringWeek = minAndMax.max;

        state.fetchingWeeklyWees = false;
      },
      (error) => {
        presentToast(error.message, "warning", warning);
      }
    );
    // unsubscribe();
  } catch (error) {
    presentToast(error as string, "warning", warning);
    state.fetchingWeeklyWees = false;
  }
};
