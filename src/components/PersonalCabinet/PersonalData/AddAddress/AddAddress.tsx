import { Formik, Form } from "formik";
import { useAddAddressMutation } from "../../../../authApi";
import { validationSchema } from "./validationSchema";
import { InputWithErrorStyle } from "./InputWithErrorStyle";
import { CitySelect } from "./CitySelect";

interface IAddAddress {
  user: number;
}

const AddAddress = ({ user }: IAddAddress) => {
  const [addAddress] = useAddAddressMutation();

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
            <CitySelect
              name="city"
              value={values.city}
              handleChange={handleChange}
            />
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
