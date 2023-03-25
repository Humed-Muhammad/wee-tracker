import { DocumentData } from "firebase/firestore";

export interface IAddWeeData {
  weeMeasurement: string;
  weeML: undefined;
  weeTime: Date;
  creatingDoc: boolean;
  urgency: boolean;
  incontinence: boolean;
}

export type IWeeDuringDaysData = Omit<IAddWeeData, "creatingDoc">;

export interface IHomeState {
  weesDuringDay: IWeeDuringDaysData[] | undefined | DocumentData;
  averageWeeDuringDay: number | undefined;
  currentDate: Date;
  fetchingWees: boolean;
}
