import { IStoreState } from "@/types";
import { auth } from "@/utils";
import { getWeesByMonth } from "@/utils/monthly";
import { addMonths, subMonths } from "date-fns";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useMonthlyStore = defineStore("monthly", () => {
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
    getWeesByMonth(state.value);
  }

  const handleAddMonth = () => {
    state.value.filterDate = addMonths(state.value.filterDate, 1);
    getWeesByMonth(state.value);
  };
  const handleSubMonth = () => {
    state.value.filterDate = subMonths(state.value.filterDate, 1);
    getWeesByMonth(state.value);
  };
  return { handleAddMonth, handleSubMonth, state };
});
