import * as Yup from "yup";

export const validationSchema = Yup.object({
  first_name: Yup.string()
    .required("Ім'я обов'язково")
    .matches(
      /^[A-Za-zА-Яа-яЁёІіЇїЄєґґ\s\-']+$/,
      "Ім'я має містити лише букви, пробіли, дефіси та апострофи"
    ),
  email: Yup.string()
    .email("Невірнаий формат електронної пошти")
    .matches(/^[A-Za-z0-9._%+-]@.+\.com$/, "Електронна пошта має бути на домені .com")
    .required("Електронна пошта обов'язково"),
});
