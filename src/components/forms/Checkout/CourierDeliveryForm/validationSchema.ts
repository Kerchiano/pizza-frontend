import * as Yup from "yup";

export const validationSchema = (cartTotalPrice: number) =>
  Yup.object({
    delivery_address: Yup.string().test(
      "delivery-address-required",
      "Виберіть адрес або якщо його нема то введіть нижче адресу",
      function (value) {
        const { street, house_number, floor } = this.parent;
        if (value && value !== "0") {
          return true;
        }
        return street && house_number && floor;
      }
    ),
    delivery_time: Yup.string().required("Виберіть час"),
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
    paid_amount: Yup.number()
      .nullable()
      .transform((value, originalValue) => {
        if (originalValue === "") return null;
        return isNaN(originalValue) ? NaN : value;
      })
      .typeError("Введіть число")
      .test(
        "is-greater-than-cartTotalPrice",
        `Недостатньо. Мінімальна сума: ${cartTotalPrice + 59 + 5}`,
        (value) =>
          value == null ||
          (typeof value === "number" && value > cartTotalPrice + 59)
      ),
  });
