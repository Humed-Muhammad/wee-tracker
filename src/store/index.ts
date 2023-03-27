import { IUser } from "@/types";
import { getUSerData } from "@/utils/helpers";
import { reactive } from "vue";

export const storeState = reactive<IUser>({
  user: {
    email: "",
    fullName: "",
    phoneNumber: "",
    uid: "",
    weeMeasurement: "",
  },
  fetchUserData() {
    getUSerData(storeState);
  },
});
