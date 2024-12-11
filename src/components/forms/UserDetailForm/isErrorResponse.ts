import { PersonalDataErrorResponse } from "./ChangeUserDataForm";

export const isErrorResponse = (
  error: unknown
): error is PersonalDataErrorResponse => {
  return (
    typeof error === "object" &&
    error !== null &&
    "data" in error &&
    typeof (error as PersonalDataErrorResponse).data === "object"
  );
};
