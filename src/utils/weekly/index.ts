import { IWeeData, IWeeklyStoreState } from "@/types";
import { endOfWeek, format, startOfWeek } from "date-fns";
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
        startDate: format(startOfWeek(state.filterDate), "PP"),
        endDate: format(endOfWeek(state.filterDate), "PP"),
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
      }
    );
    // unsubscribe();
  } catch (error) {
    presentToast("Error during fetching", "warning", warning);
    state.fetchingWeeklyWees = false;
  }
};
