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
  isLoading: boolean;
  userDetails: User | undefined;
}

const PersonalDataForm = ({
  userDetails,
  isLoading,
}: PersonalDataFormProps) => {
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
        id: userDetails?.id || 0,
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
      {({ isSubmitting, handleChange, values }) =>
        isLoading ? (
          <div className="flex justify-between flex-wrap">
            <div className="w-full custom-569:w-[calc(50%-20px)] mb-[35px] custom-569:mb-[50px]">
              <div className="h-[20px] w-full mb-[5px] bg-gray-300 animate-pulse"></div>
              <div className="w-full py-0 px-5 h-[50px] border-[3px] bg-gray-300 animate-pulse" />
            </div>
            <div className="w-full custom-569:w-[calc(50%-20px)] mb-[35px] custom-569:mb-[50px]">
              <div className="h-[20px] w-full mb-[5px] bg-gray-300 animate-pulse"></div>
              <div className="w-full py-0 px-5 h-[50px] border-[3px] bg-gray-300 animate-pulse" />
            </div>
            <div className="w-full custom-569:w-[calc(50%-20px)] mb-[35px]">
              <div className="h-[20px] w-full mb-[5px] bg-gray-300 animate-pulse"></div>
              <div className="w-full py-0 px-5 h-[50px] border-[3px] bg-gray-300 animate-pulse" />
            </div>
            <div className="w-full custom-569:w-[calc(50%-20px)] mb-[35px]">
              <div className="h-[20px] w-full mb-[5px] bg-gray-300 animate-pulse"></div>
              <div className="w-full py-0 px-5 h-[50px] border-[3px] bg-gray-300 animate-pulse" />
              <div className="max-w-[260px] m-auto mt-8 h-[54px] bg-gray-300 animate-pulse block"></div>
            </div>
          </div>
        ) : (
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
        )
      }
    </Formik>
  );
};

export default PersonalDataForm;
