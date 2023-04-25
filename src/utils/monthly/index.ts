import { IWeeData, IStoreState } from "@/types";
import { endOfMonth, formatISO, startOfMonth } from "date-fns";
import { DocumentData, onSnapshot } from "firebase/firestore";
import { warning } from "ionicons/icons";
import { calculateMinAndMax, presentToast } from "../baseUtils";
import { calculateWeeAverage } from "../baseUtils";
import { rangeQuery } from "../querys";

export const getWeesByMonth = (state: IStoreState) => {
  try {
    state.fetchingWees = true;

    onSnapshot(
      rangeQuery({
        startDate: `${formatISO(startOfMonth(state.filterDate))}`,
        endDate: `${formatISO(endOfMonth(state.filterDate))}`,
      }),
      (querySnapshot) => {
        const result: IWeeData[] | DocumentData = [];
        querySnapshot.forEach((doc) => {
          result.push(doc.data());
        });

        state.chartData = result.map((data: IWeeData) => data.weeML);
        state.chartLabel = result.map((data: IWeeData) => data.weeDate);

        state.allWees = result;

        state.averageWee = calculateWeeAverage(result);

        const minAndMax = calculateMinAndMax(result);

        state.minWee = minAndMax.min;
        state.maxWee = minAndMax.max;

        state.fetchingWees = false;
      },
      (error) => {
        presentToast(error.message, "warning", warning);
      }
    );
    // unsubscribe();
  } catch (error) {
    presentToast(error as string, "warning", warning);
    state.fetchingWees = false;
  }
};
