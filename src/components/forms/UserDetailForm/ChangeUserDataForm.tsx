import { Formik, Form } from "formik";
import { useState } from "react";
import { useChangeUserDetailsMutation, User } from "../../../authApi";
import { validationSchema } from "./validationSchema";
import { InputWithErrorStyle } from "./InputWithErrorStyle";
import { isErrorResponse } from "./isErrorResponse";
import UserDetailFormSkeleton from "./UserDetailFormSkeleton";
import GenderSelect from "./GenderSelect";

export interface PersonalDataErrorResponse {
  status: number;
  data: {
    email?: string[];
  };
}

export interface PersonalDataFormProps {
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
          <UserDetailFormSkeleton />
        ) : (
          <Form className="personad-data-form flex flex-wrap justify-between">
            <InputWithErrorStyle
              maxLength={50}
              name="first_name"
              type="text"
              placeholder="Ім'я"
            />
            <InputWithErrorStyle
              maxLength={12}
              name="phone_number"
              type="text"
              placeholder="Номер телефону"
            />
            <InputWithErrorStyle
              maxLength={100}
              name="email"
              type="email"
              placeholder="Електронна пошта"
            />
            <GenderSelect
              handleChange={handleChange}
              isSubmitting={isSubmitting}
              values={values}
            />
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
