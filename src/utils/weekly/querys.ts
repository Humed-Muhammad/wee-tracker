import { orderBy, query, where } from "firebase/firestore";

import { weeRef } from "../dbRefs";

export const weeklyQuery = (dateRange: {
  startDate: string;
  endDate: string;
}) =>
  query(
    weeRef,
    where("weeDate", ">=", dateRange.startDate),
    where("weeDate", "<=", dateRange.endDate),
    orderBy("weeDate")
  );
