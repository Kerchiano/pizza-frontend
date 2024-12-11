import * as Yup from "yup";

export const validationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  first_name: Yup.string().required("Ім'я обов'язково"),
  phone_number: Yup.string().required("Номер телефону обов'язково"),
  review: Yup.string().required("Текст відгуку обов'язково"),
  restaurant: Yup.string().required("Ресторан обов'язково"),
});
