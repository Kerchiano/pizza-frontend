import * as Yup from "yup";

export const validationSchema = Yup.object({
    street: Yup.string()
      .required("Вулиця обов'язково")
      .matches(
        /^[A-Za-zА-Яа-яЁёІіЇїЄєґґ\s\-]+$/,
        "Вулиця має містити лише букви та пробіли"
      ),
    house_number: Yup.number()
      .typeError("Будинок має бути числом")
      .required("Будинок обов'язково")
      .positive("Будинок має бути більше нуля")
      .integer("Будинок має бути цілим числом"),
    floor: Yup.number()
      .typeError("Під'їзд має бути числом")
      .required("Під'їзд обов'язково")
      .positive("Під'їзд має бути більше нуля")
      .integer("Під'їзд має бути цілим числом"),
    entrance: Yup.number()
      .typeError("Этаж має бути числом")
      .positive("Этаж має бути більше нуля")
      .integer("Этаж має бути цілим числом"),
    flat: Yup.number()
      .typeError("Квартира має бути числом")
      .positive("Квартира має бути більше нуля")
      .integer("Квартира має бути цілим числом"),
  });