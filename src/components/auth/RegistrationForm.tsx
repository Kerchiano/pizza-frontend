import { useRegisterMutation } from "../../authApi";
import { Formik, Form, useField } from "formik";
import { useState } from "react";
import * as Yup from "yup";
import Modal from "react-modal";
import { X, CircleCheck } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface RegisterErrorResponse {
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
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => setModalIsOpen(true);
  const closeModal = () => {
    setModalIsOpen(false);
    navigate("/login")
  };

  const validationSchema = Yup.object({
    first_name: Yup.string().required("First name is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    phone_number: Yup.string().required("Phone number is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  const isErrorResponse = (error: unknown): error is RegisterErrorResponse => {
    return (
      typeof error === "object" &&
      error !== null &&
      "data" in error &&
      typeof (error as RegisterErrorResponse).data === "object"
    );
  };

  const InputWithErrorStyle = ({ name, type, placeholder }: any) => {
    const [field, meta] = useField(name);
    return (
      <div>
        <input
          {...field}
          type={type}
          placeholder={placeholder}
          className={`border p-2 rounded w-full ${
            meta.touched && meta.error ? "border-red-500 mb-0" : "mb-4"
          }`}
        />
        {meta.touched && meta.error ? (
          <div className="text-red-500 text-sm mb-2 mt-1">{meta.error}</div>
        ) : null}
      </div>
    );
  };

  return (
    <>
      <Formik
        initialValues={{
          first_name: "",
          last_name: "",
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
              name="last_name"
              type="text"
              placeholder="Last Name"
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
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        portalClassName="modal-root"
        style={{
          overlay: { backgroundColor: "rgba(0, 0, 0, 0.7)" },
          content: {
            color: "black",
            padding: "20px",
            margin: "auto",
            width: "500px",
            height: "350px",
            borderRadius: "10px",
          },
        }}
        contentLabel="Успешная регистрация"
      >
        <div className="flex flex-col justify-center items-center relative">
          <h2 className="mb-5 mt-10">Реєстрація успішна!</h2>
          <p className="mb-8">Ваш акаунт був успішно створений!</p>
          <X
            size={30}
            className="absolute -right-[10px] -top-[10px] text-gray-500 cursor-pointer hover:text-red-600 transition-colors duration-300"
            onClick={closeModal}
          >
            Закрыть
          </X>
          <CircleCheck className="text-green-500" size={88} />
        </div>
      </Modal>
    </>
  );
};

export default RegistrationForm;
