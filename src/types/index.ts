import { AuthCredential, UserCredential } from "firebase/auth";
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

export interface IUserInfo {
  weeMeasurement: string;
  createdAt?: { seconds: number; nanoseconds: number };
  email: string;
  fullName: string;
  phoneNumber: string;
  uid: string;
}

/**@NewState */

export interface IHomeStoreState {
  weesDuringDay: IWeeDuringDaysData[] | undefined | DocumentData;
  chartLabel: string[];
  chartData: number[];
  averageWeeDuringDay: number | undefined;
  currentDate: Date;
  fetchingWees: boolean;
}

export interface IUserStoreState {
  userCredentials: any | undefined;
  isSigningIn: boolean;
  errorMsg: string;
  updatingData: boolean;
  uploadingFile: boolean;
  updatingProfile: boolean;
  fetchingUserData: boolean;
  user: DocumentData | IUserState;
  isModalOpen: boolean;
  profilePhoto: string | ArrayBuffer | null | undefined;
  profilePhotoPreview: string | ArrayBuffer | null | undefined;
  profilePhotoName: string;
  newPassword: string;
}

export interface IUserState {
  email: string;
  fullName: string;
  phoneNumber: string;
  uid: string;
  weeMeasurement: string;
  profileURL: string;
}
