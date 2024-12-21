import * as Yup from "yup";

export const validationSchema = Yup.object({
  street: Yup.string()
    .required("Вулиця обов'язково")
    .matches(
      /^[A-Za-zА-Яа-яЁёІіЇїЄєҐґ0-9\s\-']+$/,
      "Вулиця має містити лише букви, цифри, пробіли, дефіси або апострофи"
    ),
  house_number: Yup.string()
    .typeError("Будинок має бути числом")
    .required("Будинок обов'язково")
    .matches(/^\d+$/, "Будинок має містити лише цифри"),
  floor: Yup.string()
    .typeError("Під'їзд має бути числом")
    .matches(/^\d+$/, "Під'їзд має містити лише цифри")
    .max(2, "Максимальна кількість цифр для під'їзду 2"),
  entrance: Yup.string()
    .typeError("Поверх має бути числом")
    .matches(/^\d+$/, "Поверх має містити лише цифри"),
  flat: Yup.string()
    .typeError("Квартира має бути числом")
    .matches(/^\d+$/, "Квартира має містити лише цифри"),
});
