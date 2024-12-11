import { RegisterErrorResponse } from "./RegistrationForm";

export const isErrorResponse = (
  error: unknown
): error is RegisterErrorResponse => {
  return (
    typeof error === "object" &&
    error !== null &&
    "data" in error &&
    typeof (error as RegisterErrorResponse).data === "object"
  );
};
