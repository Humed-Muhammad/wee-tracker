import { IWeeDuringDaysData } from "@/types";
import { DocumentData } from "firebase/firestore";
import { mean } from "lodash";

export const extractFileExtension = (fileName: string) => {
  const result = fileName.substring(fileName.lastIndexOf(".") + 1);

  return result;
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

export const calculateWeeAverage = (
  weesDuringDay: IWeeDuringDaysData[] | DocumentData
) => {
  const weeML = weesDuringDay?.map((item: IWeeDuringDaysData) =>
    Number(item.weeML)
  );

  return Math.round(mean(weeML)) || 0;
};
