import { IHomeStoreState } from "@/types";
import { getWeesByDay } from "@/utils/helpers";
import { addDays, subDays } from "date-fns";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useHomeStore = defineStore("home", () => {
  const state = ref<IHomeStoreState>({
    weesDuringDay: [],
    chartLabel: [],
    chartData: [],
    averageWeeDuringDay: undefined,
    fetchingWees: false,
    currentDate: new Date(),
  });

  getWeesByDay(state.value);

  const handleAddDays = () => {
    state.value.currentDate = addDays(state.value.currentDate, 1);
    getWeesByDay(state.value);
  };
  const handleSubDays = () => {
    state.value.currentDate = subDays(state.value.currentDate, 1);
    getWeesByDay(state.value);
  };
  return { handleAddDays, handleSubDays, state };
});
