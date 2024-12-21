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
