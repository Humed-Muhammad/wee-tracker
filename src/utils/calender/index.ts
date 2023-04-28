import { IWeeData, ICalenderWee, ICalenderState } from "@/types";
import { endOfMonth, formatISO, startOfMonth } from "date-fns";
import { DocumentData, onSnapshot } from "firebase/firestore";
import { warning } from "ionicons/icons";
import { calculateMinAndMax, presentToast } from "../baseUtils";
import { calculateWeeAverage } from "../baseUtils";
import { rangeQuery } from "../querys";

export const getWeesByMonth = (state: ICalenderState) => {
  try {
    state.fetchingWees = true;

    onSnapshot(
      rangeQuery({
        startDate: `${formatISO(startOfMonth(state.currentDate))}`,
        endDate: `${formatISO(endOfMonth(state.currentDate))}`,
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
        state.calenderWees = generateCalendarWeeData(result);
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
): ICalenderWee[] => {
  const result = weeData?.map((item: IWeeData) => {
    const calenderData = {
      highlight: {
        color: "yellow",
        fillMode: "solid",
      },
      dates: new Date(item.weeTimeStamp),
    };
    return calenderData;
  });

  return result;
};
