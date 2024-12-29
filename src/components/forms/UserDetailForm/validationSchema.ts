import * as Yup from "yup";

export const validationSchema = Yup.object({
  first_name: Yup.string()
    .required("Ім'я обов'язково")
    .matches(
      /^[A-Za-zА-Яа-яЁёІіЇїЄєґґ\s\-']+$/,
      "Ім'я має містити лише букви, пробіли, дефіси та апострофи"
    ),
  email: Yup.string()
    .email("Невірна електронна пошта")
    .required("Електронна пошта обов'язково"),
});
