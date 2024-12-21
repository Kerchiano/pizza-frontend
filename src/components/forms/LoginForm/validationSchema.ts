import * as Yup from "yup";

export const validationSchema = Yup.object({
  email: Yup.string()
    .email("Невірна електронна пошта")
    .required("Електронна пошта обов'язково"),
  password: Yup.string()
    .required("Пароль обов'язково")
    .min(8, "Пароль має містити щонайменше 8 символів"),
});
