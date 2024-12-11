import * as Yup from "yup";

export const validationSchema = Yup.object({
  restaurant: Yup.string().required("Виберіть ресторан"),
  delivery_time: Yup.string().required("Виберіть час"),
});
