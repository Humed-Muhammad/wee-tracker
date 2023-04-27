import { IWeeData, IStoreState } from "@/types";
import { endOfMonth, formatISO, startOfMonth } from "date-fns";
import { DocumentData, onSnapshot } from "firebase/firestore";
import { warning } from "ionicons/icons";
import { calculateMinAndMax, formatISODate, presentToast } from "../baseUtils";
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

export const generateCalendarWeeData = (
  weeData: IWeeData[] | DocumentData | undefined
) => {
  const result = weeData?.map((item: IWeeData) => {
    const calenderData = {
      date: formatISODate(item.weeTimeStamp),
      backgroundColor: "rgba(255, 206, 96, 1)",
      textColor: "gray",
    };
    return calenderData;
  });
  return result;
};
