import { IWeeklyStoreState } from "@/types";
import { auth } from "@/utils";
import { getWeesByWeek } from "@/utils/weekly";
import { addWeeks, subWeeks } from "date-fns";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useWeeklyStore = defineStore("weekly", () => {
  const state = ref<IWeeklyStoreState>({
    filterDate: new Date(),
    averageWeeDuringWeek: undefined,
    chartData: [],
    chartLabel: [],
    fetchingWeeklyWees: false,
    maxDuringWeek: undefined,
    minDuringWeek: undefined,
    weesDuringWeek: undefined,
  });

  if (auth.currentUser?.uid) {
    getWeesByWeek(state.value);
  }

  const handleAddWeeks = () => {
    state.value.filterDate = addWeeks(state.value.filterDate, 1);
    getWeesByWeek(state.value);
  };
  const handleSubWeeks = () => {
    state.value.filterDate = subWeeks(state.value.filterDate, 1);
    getWeesByWeek(state.value);
  };
  return { handleAddWeeks, handleSubWeeks, state };
});
