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

export interface IUserInfo {
  weeMeasurement: string;
  createdAt?: { seconds: number; nanoseconds: number };
  email: string;
  fullName: string;
  phoneNumber: string;
  uid: string;
}

export interface IUser {
  user: IUserInfo | DocumentData;
  fetchUserData: () => void;
}
