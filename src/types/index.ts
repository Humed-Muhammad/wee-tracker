export interface IAddWeeData {
  weeMeasurement: string;
  weeML: undefined;
  weeTime: string;
  creatingDoc: boolean;
  urgency: boolean;
  incontinence: boolean;
}

export type ILastSevenDaysData = Omit<IAddWeeData, "creatingDoc">;
