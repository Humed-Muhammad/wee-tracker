import { IWeeklyStoreState } from "@/types";
import { addWeeks, subWeeks } from "date-fns";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useWeeklyStore = defineStore("weekly", () => {
  const state = ref<IWeeklyStoreState>({
    filterDate: new Date(),
  });

  const handleAddWeeks = () => {
    state.value.filterDate = addWeeks(state.value.filterDate, 1);
  };
  const handleSubWeeks = () => {
    state.value.filterDate = subWeeks(state.value.filterDate, 1);
  };
  return { handleAddWeeks, handleSubWeeks, state };
});
