import * as yup from "yup";

export const weeSchema = yup.object({
  weeML: yup.number().required(),
  weeTime: yup.string().required(),
  weeMeasurement: yup.string().required(),
});
