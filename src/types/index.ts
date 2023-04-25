import { DocumentData } from "firebase/firestore";
import jsPDF from "jspdf";

export interface IAddWeeData {
  weeMeasurement: string;
  weeML: number | string;
  weeTime: string;
  weeDate: string;
  creatingDoc: boolean;
  urgency: boolean;
  incontinence: boolean;
}

export type IWeeData = Omit<IAddWeeData, "creatingDoc">;

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
  weesDuringDay: IWeeData[] | undefined | DocumentData;
  chartLabel: string[];
  chartData: number[];
  averageWeeDuringDay: number | undefined;
  currentDate: Date;
  fetchingWees: boolean;
}

export interface IStoreState {
  allWees: IWeeData[] | undefined | DocumentData;
  averageWee: number | undefined;
  minWee: number | undefined;
  maxWee: number | undefined;
  filterDate: Date;
  fetchingWees: boolean;
  chartLabel: string[];
  chartData: number[];
}

export interface IUserStoreState {
  isReAuthenticationSuccess: boolean;
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
  weeMeasurement: "fl. oz." | "ML";
  profileURL: string;
}

export interface ICreatePdf {
  doc?: jsPDF;
  elements?: HTMLCollectionOf<Element>;
  title: string;
  weeData: DocumentData | IWeeData[] | undefined;
  averageWee: number;
  chartTitle: string;
  classSelector: string;
}
