import { IHomeState } from "@/types";
import { endOfDay, formatISO, subDays } from "date-fns";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { db } from ".";

export const getLastWeekWeeData = (state: IHomeState) => {
  const weeRef = collection(db, "wees");

  const userWeesQuery = query(
    weeRef,
    orderBy("weeTime"),
    where("weeTime", "<=", formatISO(endOfDay(new Date()))),
    where("weeTime", ">", formatISO(subDays(new Date(), 7)))
  );

  getDocs(userWeesQuery).then((data) => {
    data.forEach((doc) => {
      state.lastSevenDays?.push(doc.data());
    });
  });
};
