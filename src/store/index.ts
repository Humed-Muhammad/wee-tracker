import { IUser } from "@/types";
import { getUSerData, getWeesByDay, updateUserData } from "@/utils/helpers";
import { addDays, subDays } from "date-fns";
import { reactive } from "vue";

export const storeState = reactive<IUser>({
  user: {
    email: "",
    fullName: "",
    phoneNumber: "",
    uid: "",
    weeMeasurement: "",
  },
  updatingData: false,
  fetchUserData() {
    getUSerData(storeState);
  },
  updateUserWeeMeasurement() {
    updateUserData(storeState);
  },
  weesDuringDay: [],
  chartLabel: [],
  chartData: [],
  averageWeeDuringDay: undefined,
  currentDate: new Date(),
  fetchingWees: false,
  requestWeesByDay() {
    getWeesByDay(storeState);
  },
  handleAddDays() {
    storeState.currentDate = addDays(storeState.currentDate, 1);
    storeState.requestWeesByDay();
  },
  handleSubDays() {
    storeState.currentDate = subDays(storeState.currentDate, 1);
    storeState.requestWeesByDay();
  },
});
