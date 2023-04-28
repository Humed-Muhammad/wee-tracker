import { ICalenderState } from "@/types";
import { auth } from "@/utils";
import { getWeesByMonth } from "@/utils/calender";
import { subMonths } from "date-fns";

import { defineStore } from "pinia";
import { ref } from "vue";

export const useCalenderStore = defineStore("calender", () => {
  const state = ref<ICalenderState>({
    currentDate: new Date(),
    daysInMonth: [],
    monthAndYear: "",
    filterDate: new Date(),
    averageWee: undefined,
    chartData: [],
    chartLabel: [],
    fetchingWees: false,
    maxWee: undefined,
    minWee: undefined,
    allWees: undefined,
    calenderWees: undefined,
  });

  if (auth.currentUser?.uid) {
    getWeesByMonth(state.value);
  }

  const handleMove = (value: any) => {
    state.value.currentDate = subMonths(
      new Date(value?.[0]?.year, value?.[0]?.month),
      1
    );
    getWeesByMonth(state.value);
  };

  return { state, handleMove };
});
