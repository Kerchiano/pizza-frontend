import { Formik, Form, useField } from "formik";
import * as Yup from "yup";
import { useAddAddressMutation } from "../authApi";

interface IAddAddress {
  user: number;
}

const AddAddress = ({ user }: IAddAddress) => {
  const [addAddress] = useAddAddressMutation();

  const validationSchema = Yup.object({
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

  const InputWithErrorStyle = ({ name, type, placeholder }: any) => {
    const [field, meta] = useField(name);
    return (
      <div className={`${field.name}-field`}>
        <label className="block text-black text-sm mb-[5px]">
          {placeholder}
        </label>
        <input
          {...field}
          type={type}
          className={`border p-2 rounded w-full ${
            meta.touched && meta.error ? "border-red-500 mb-0" : "mb-4"
          }`}
        />
        {meta.touched && meta.error ? (
          <div className="text-red-500 text-sm">{meta.error}</div>
        ) : null}
      </div>
    );
  };

  return (
    <Formik
      initialValues={{
        street: "",
        house_number: "",
        floor: "",
        entrance: "",
        flat: "",
        city: "K",
      }}
      enableReinitialize
      validationSchema={validationSchema}
      validateOnChange={true}
      validateOnBlur={false}
      onSubmit={async (values, { setSubmitting, resetForm }) => {
        try {
          await addAddress({ ...values, user }).unwrap();
          resetForm();
        } catch (err: unknown) {
          console.error("Failed to add address: ", err);
        } finally {
          setSubmitting(false);
        }
      }}
    >
      {({ isSubmitting, handleChange, values }) => (
        <Form className="add-delivery-address">
          <div className="title">Додати адресу</div>
          <div className="new-address">
            <div className="form-group city-field">
              <label className="block text-black text-sm mb-[5px]">Місто</label>
              <select
                name="city"
                value={values.city}
                onChange={handleChange}
                className="input-with-error-style border cursor-pointer"
              >
                <option value="K">Київ</option>
                <option value="Kh">Харків</option>
                <option value="D">Дніпро</option>
                <option value="M">Миколаїв</option>
              </select>
            </div>
            <InputWithErrorStyle
              placeholder="Вулиця:"
              name="street"
              type="text"
            />
            <InputWithErrorStyle
              placeholder="Будинок:"
              name="house_number"
              type="text"
            />
            <InputWithErrorStyle
              placeholder="Під'їзд:"
              name="floor"
              type="text"
            />
            <InputWithErrorStyle
              placeholder="Этаж:"
              name="entrance"
              type="text"
            />
            <InputWithErrorStyle
              placeholder="Квартира:"
              name="flat"
              type="text"
            />
          </div>
          <button type="submit" disabled={isSubmitting}>
            Додати адресу
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default AddAddress;
