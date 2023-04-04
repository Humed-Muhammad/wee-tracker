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
  to: "fl. oz." | "ML"
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
