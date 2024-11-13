import { Formik, Form, useField } from "formik";
import * as Yup from "yup";
import { useAddAddressMutation } from "../authApi";
import { Address } from "./AddressItem";

interface IAddAddress {
  user: string;
  onAddAddress: (newAddress: Address) => void;
}

const AddAddress = ({user, onAddAddress }: IAddAddress) => {
  const [addAddress] = useAddAddressMutation()

  const validationSchema = Yup.object({
    street: Yup.string().required("Street is required"),
    house_number: Yup.number()
      .typeError("House number must be a number")
      .required("House number is required"),
    floor: Yup.number()
      .typeError("Floor must be a number")
      .required("Floor is required"),
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
      onSubmit={async (values, { setSubmitting, resetForm  }) => {
        try {
          const newAddress = await addAddress({ ...values, user }).unwrap();
          onAddAddress(newAddress);
          resetForm()
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
              <label className="block text-black text-sm mb-[5px]">
                Місто
              </label>
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
