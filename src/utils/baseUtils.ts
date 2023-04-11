import { IWeeData } from "@/types";
import { Color } from "@ionic/core";
import { toastController } from "@ionic/vue";
import { DocumentData } from "firebase/firestore";
import { mean } from "lodash";

export const extractFileExtension = (fileName: string) => {
  const result = fileName.substring(fileName.lastIndexOf(".") + 1);

  return result;
};

export const convertUnits = (
  unit: number | undefined,
  to: "fl. oz." | "ML" | undefined
) => {
  if (to === "fl. oz.") {
    return Math.round(Number(unit) * 0.033814);
  }
  return Math.round(Number(unit));
};

export const calculateWeeAverage = (wees: IWeeData[] | DocumentData) => {
  const weeML = wees?.map((item: IWeeData) => Number(item.weeML));

  return Math.round(mean(weeML)) || 0;
};

export const calculateMinAndMax = (wees: IWeeData[] | DocumentData) => {
  let weeML: number[];
  if (wees.length) {
    weeML = wees?.map((item: IWeeData) => Number(item.weeML));
  } else {
    weeML = [0];
  }

  const min = Math.min(...weeML);
  const max = Math.max(...weeML);
  return {
    min,
    max,
  };
};

export const presentToast = async (
  message: string,
  color: Color,
  icon?: string | undefined
) => {
  const toast = await toastController.create({
    message,
    duration: 2500,
    icon: icon,
    color,
  });

  await toast.present();
};

export const getWeeklyWeeFrequency = (
  wees: IWeeData[] | DocumentData | undefined
) => {
  const countArray: number[] = [];
  if (wees) {
    const result = wees?.reduce(
      (acc: { [key: string]: IWeeData[] }, curr: IWeeData) => {
        acc[curr?.weeDate] = acc[curr?.weeDate] || [];
        acc[curr?.weeDate].push(curr);
        return acc;
      },
      {}
    );
    if (Object.keys(wees).length) {
      Object.keys(result)?.map((key) => {
        countArray.push(result[key].length);
      });
    } else {
      countArray.push(0);
    }
  }

  const average = Math.round(mean(countArray)) || 0;
  const min = Math.min(...countArray) || 0;
  const max = Math.max(...countArray) || 0;

  return {
    average,
    min,
    max,
  };
};

export const createTableForPdf = (
  weeData: DocumentData | IWeeData[] | undefined
) => {
  return weeData?.reduce((acc: Array<Array<any>>, curr: IWeeData) => {
    acc.push([
      curr.weeDate,
      curr.weeTime,
      curr.weeML as string,
      convertUnits(curr.weeML as number, "fl. oz."),
      curr.urgency ? "Yes" : "No",
      curr.incontinence ? "Yes" : "No",
    ]);
    return acc;
  }, []);
};
