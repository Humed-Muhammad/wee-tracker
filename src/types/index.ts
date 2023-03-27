import { DocumentData } from "firebase/firestore";

export interface IAddWeeData {
  weeMeasurement: string;
  weeML: undefined;
  weeTime: {
    date: Date;
    time: string;
  };
  creatingDoc: boolean;
  urgency: boolean;
  incontinence: boolean;
}

export type IWeeDuringDaysData = Omit<IAddWeeData, "creatingDoc">;

export interface IHomeState {
  weesDuringDay: IWeeDuringDaysData[] | undefined | DocumentData;
  chartLabel: string[];
  chartData: number[];
  averageWeeDuringDay: number | undefined;
  currentDate: Date;
  fetchingWees: boolean;
  requestWeesByDay: () => void;
  handleAddDays: () => void;
  handleSubDays: () => void;
}

export interface IUserInfo {
  weeMeasurement: string;
  createdAt?: { seconds: number; nanoseconds: number };
  email: string;
  fullName: string;
  phoneNumber: string;
  uid: string;
}

export interface IUser extends IHomeState {
  user: IUserInfo | DocumentData;
  updatingData: boolean;
  fetchUserData: () => void;
  updateUserWeeMeasurement: () => void;
}
