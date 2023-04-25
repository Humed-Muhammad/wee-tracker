import { orderBy, query, where } from "firebase/firestore";
import { auth } from ".";

import { weeRef } from "./dbRefs";

export const rangeQuery = (dateRange: {
  startDate: string;
  endDate: string;
}) => {
  const weeQuery = query(
    weeRef,
    where("uid", "==", auth.currentUser?.uid),
    where("weeTimeStamp", ">=", dateRange.startDate),
    where("weeTimeStamp", "<=", dateRange.endDate),
    orderBy("weeTimeStamp")
  );
  return weeQuery;
};
