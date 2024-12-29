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
  phone_number: Yup.string()
    .required("Номер телефону обов'язково")
    .matches(/^\d+$/, "Номер телефону потрібен перебувати з одних чисел"),
  password: Yup.string()
    .min(8, "Пароль має містити щонайменше 8 символів")
    .matches(/[a-z]/, "Пароль має містити щонайменше одну маленьку літеру")
    .matches(/[A-Z]/, "Пароль має містити щонайменше одну велику літеру")
    .matches(/\d/, "Пароль має містити щонайменше одну цифру")
    .matches(
      /[@$!%*?&]/,
      "Пароль має містити щонайменше один спеціальний символ (@, $, !, %, *, ?, &)"
    )
    .required("Пароль обов'язково"),
});
