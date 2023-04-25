import { IStoreState } from "@/types";
import { auth } from "@/utils";
import { getWeesByWeek } from "@/utils/weekly";
import { addWeeks, subWeeks } from "date-fns";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useWeeklyStore = defineStore("weekly", () => {
  const state = ref<IStoreState>({
    filterDate: new Date(),
    averageWee: undefined,
    chartData: [],
    chartLabel: [],
    fetchingWees: false,
    maxWee: undefined,
    minWee: undefined,
    allWees: undefined,
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
