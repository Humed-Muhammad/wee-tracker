import { orderBy, query, where } from "firebase/firestore";
import { auth } from "..";

import { weeRef } from "../dbRefs";

export const weeklyQuery = (dateRange: {
  startDate: string;
  endDate: string;
}) => {
  const weeQuery = query(
    weeRef,
    where("uid", "==", auth.currentUser?.uid),
    where("weeDate", ">=", dateRange.startDate),
    where("weeDate", "<=", dateRange.endDate),
    orderBy("weeDate")
  );
  return weeQuery;
};
