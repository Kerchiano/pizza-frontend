import { ReviewErrorResponse } from "./ReviewForm";

export const isErrorResponse = (
  error: unknown
): error is ReviewErrorResponse => {
  return (
    typeof error === "object" &&
    error !== null &&
    "data" in error &&
    typeof (error as ReviewErrorResponse).data === "object"
  );
};
