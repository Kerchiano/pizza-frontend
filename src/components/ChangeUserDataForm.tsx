import { Formik, Form, useField } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import { useChangeUserDetailsMutation, User } from "../authApi";

interface PersonalDataErrorResponse {
  status: number;
  data: {
    email?: string[];
  };
}

interface PersonalDataFormProps {
  userDetails: User;
}

const PersonalDataForm = ({ userDetails }: PersonalDataFormProps) => {
  const [changeUserDetails] = useChangeUserDetailsMutation();
  const [successMessage, setSuccessMessage] = useState(false);

  const transformErrors = (err: PersonalDataErrorResponse) => {
    const formikErrors: { [key: string]: string } = {};
    if (err.data.email) {
      formikErrors.email = err.data.email[0];
    }
    return formikErrors;
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
  });

  const isErrorResponse = (
    error: unknown
  ): error is PersonalDataErrorResponse => {
    return (
      typeof error === "object" &&
      error !== null &&
      "data" in error &&
      typeof (error as PersonalDataErrorResponse).data === "object"
    );
  };

  const InputWithErrorStyle = ({ name, type, placeholder, disabled }: any) => {
    const [field, meta] = useField(name);
    const isDisabled = name === "phone_number" ? true : disabled;
    return (
      <div>
        <label className="block text-black text-sm mb-[5px] min-h-[20px]">
          {placeholder}
        </label>
        <input
          {...field}
          type={type}
          placeholder={placeholder}
          disabled={isDisabled}
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
        first_name: userDetails?.first_name || "",
        phone_number: userDetails?.phone_number || "",
        email: userDetails?.email || "",
        gender: userDetails?.gender || "",
      }}
      enableReinitialize
      validationSchema={validationSchema}
      validateOnChange={true}
      validateOnBlur={false}
      onSubmit={async (values, { setSubmitting, setErrors }) => {
        const { phone_number, ...dataToSubmit } = values;
        try {
          await changeUserDetails(dataToSubmit).unwrap();
          setSuccessMessage(true);
        } catch (err: unknown) {
          console.error("Failed to change personal data: ", err);
          if (isErrorResponse(err)) {
            setErrors(transformErrors(err));
          }
        } finally {
          setSubmitting(false);
        }
      }}
    >
      {({ isSubmitting, handleChange, values }) => (
        <Form className="personad-data-form flex flex-wrap justify-between">
          <InputWithErrorStyle
            name="first_name"
            type="text"
            placeholder="Ім'я"
          />
          <InputWithErrorStyle
            name="phone_number"
            type="text"
            placeholder="Номер телефону"
          />
          <InputWithErrorStyle
            name="email"
            type="email"
            placeholder="Електронна пошта"
          />
          <div className="form-group">
            <label className="block text-black text-sm mb-[5px] min-h-[20px]">
              Стать
            </label>
            <select
              id="gender"
              name="gender"
              value={values.gender}
              onChange={handleChange}
              className="input-with-error-style border cursor-pointer mb-[10px]"
            >
              <option value="M">Чоловіча</option>
              <option value="F">Жіноча</option>
            </select>
            <button type="submit" disabled={isSubmitting}>
              Зберегти зміни
            </button>
          </div>
          {successMessage && (
            <div className="success-mesage">Профіль оновлено</div>
          )}
        </Form>
      )}
    </Formik>
  );
};

export default PersonalDataForm;
