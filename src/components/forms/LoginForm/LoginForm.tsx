import { Formik, Form } from "formik";
import { useDispatch } from "react-redux";
import { setCredentials } from "../../../authSlice";
import { useLocation, useNavigate } from "react-router-dom";
import { authApi } from "../../../authApi";
import { validationSchema } from "./validationSchema";
import { isErrorResponse } from "./isErrorResponse";
import InputWithErrorStyle from "./InputWithErrorStyle";

export interface LoginErrorResponse {
  status: number;
  data: {
    password?: string[];
    email?: string[];
  };
}

type LoginMutation = ReturnType<typeof authApi.endpoints.login.useMutation>;
type LoginFunction = LoginMutation[0];

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

interface LoginFormProps {
  login: LoginFunction;
}

const LoginForm = ({ login }: LoginFormProps) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

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

          const params = new URLSearchParams(location.search);
          const redirectPath =
            params.get("redirect") || "/profile/personal_data";
          navigate(redirectPath);
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
