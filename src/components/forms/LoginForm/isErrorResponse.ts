import { LoginErrorResponse } from "./LoginForm";

export const isErrorResponse = (
  error: unknown
): error is LoginErrorResponse => {
  return (
    typeof error === "object" &&
    error !== null &&
    "data" in error &&
    typeof (error as LoginErrorResponse).data === "object"
  );
};
