import { DocumentData } from "firebase/firestore";

export interface IAddWeeData {
  weeMeasurement: string;
  weeML: undefined;
  weeTime: Date;
  creatingDoc: boolean;
  urgency: boolean;
  incontinence: boolean;
}

export type ILastSevenDaysData = Omit<IAddWeeData, "creatingDoc">;

export interface IHomeState {
  lastSevenDays: ILastSevenDaysData[] | undefined | DocumentData;
  sevenDaysAverage: number | undefined;
}
