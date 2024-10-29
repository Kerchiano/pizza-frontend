import { useLoginMutation } from "../../authApi";
import { Formik, Form, useField } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { setCredentials } from "../../authSlice";
import { useNavigate } from "react-router-dom";

interface LoginErrorResponse {
  status: number;
  data: {
    password?: string[];
    email?: string[];
  };
}

const transformErrors = (err: LoginErrorResponse) => {
  const formikErrors: { [key: string]: string } = {};

  if (err.data.password) {
    formikErrors.password = err.data.password[0];
  }

  if (err.data.email) {
    formikErrors.email = err.data.email[0];
  }

  return formikErrors;
};

const LoginForm = () => {
  const dispatch = useDispatch();
  const [login] = useLoginMutation();
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const isErrorResponse = (error: unknown): error is LoginErrorResponse => {
    return (
      typeof error === "object" &&
      error !== null &&
      "data" in error &&
      typeof (error as LoginErrorResponse).data === "object"
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
          <div className="text-red-500 text-sm">{meta.error}</div>
        ) : null}
      </div>
    );
  };

  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
      }}
      validationSchema={validationSchema}
      validateOnChange={true}
      validateOnBlur={false}
      onSubmit={async (values, { setSubmitting, setErrors }) => {
        try {
          const user = await login(values).unwrap();
          dispatch(setCredentials({ accessToken: user.access }));
          localStorage.setItem("refresh", user.refresh);
          navigate("/profile/personal_data");
        } catch (err: unknown) {
          console.error("Failed to login: ", err);

          if (isErrorResponse(err)) {
            const formikErrors = transformErrors(err);
            setErrors(formikErrors);
          }
        } finally {
          setSubmitting(false);
        }
      }}
    >
      {({ isSubmitting }) => (
        <Form className="login-form">
          <InputWithErrorStyle name="email" type="email" placeholder="Email" />
          <InputWithErrorStyle
            name="password"
            type="password"
            placeholder="Password"
          />
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-blue-500 text-white p-2 rounded"
          >
            Login
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default LoginForm;
