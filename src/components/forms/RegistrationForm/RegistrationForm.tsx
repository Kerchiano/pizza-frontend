import { useRegisterMutation } from "../../../authApi";
import { Formik, Form } from "formik";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import UserCreatedSuccess from "./UserCreatedSuccessModal";
import { validationSchema } from "./validationSchema";
import { isErrorResponse } from "./isErrorResponse";
import { InputWithErrorStyle } from "./InputWithErrorStyle";

export interface RegisterErrorResponse {
  status: number;
  data: {
    email?: string[];
    phone_number?: string[];
  };
}

const transformErrors = (err: RegisterErrorResponse) => {
  const formikErrors: { [key: string]: string } = {};

  if (err.data.phone_number) {
    formikErrors.phone_number = err.data.phone_number[0];
  }

  if (err.data.email) {
    formikErrors.email = err.data.email[0];
  }

  return formikErrors;
};

const RegistrationForm = () => {
  const [register] = useRegisterMutation();
  const navigate = useNavigate();
  const location = useLocation();
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => setModalIsOpen(true);
  const closeModal = () => {
    setModalIsOpen(false);
    const params = new URLSearchParams(location.search);
    const redirectPath = params.get("redirect")
      ? `/login?redirect=/checkout`
      : "/login";
    navigate(redirectPath);
  };

  return (
    <>
      <Formik
        initialValues={{
          first_name: "",
          email: "",
          phone_number: "",
          password: "",
        }}
        validationSchema={validationSchema}
        validateOnChange={true}
        validateOnBlur={false}
        onSubmit={async (values, { setSubmitting, setErrors }) => {
          try {
            await register(values).unwrap();
            openModal();
          } catch (err: unknown) {
            console.error("Failed to register: ", err);

            if (isErrorResponse(err)) {
              const formikErrors = transformErrors(err);
              setErrors(formikErrors);
            } else {
              alert("Registration failed. Please try again.");
            }
          } finally {
            setSubmitting(false);
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form className="registration-form">
            <InputWithErrorStyle
              name="first_name"
              type="text"
              placeholder="First Name"
            />
            <InputWithErrorStyle
              name="email"
              type="email"
              placeholder="Email"
            />
            <InputWithErrorStyle
              name="phone_number"
              type="tel"
              placeholder="Phone Number"
            />
            <InputWithErrorStyle
              name="password"
              type="password"
              placeholder="Password"
            />
            <button type="submit" disabled={isSubmitting}>
              Register
            </button>
          </Form>
        )}
      </Formik>
      <UserCreatedSuccess modalIsOpen={modalIsOpen} closeModal={closeModal} />
    </>
  );
};

export default RegistrationForm;