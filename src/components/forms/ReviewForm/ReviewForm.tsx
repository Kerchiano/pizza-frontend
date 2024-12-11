import { Formik, Form } from "formik";
import { useSelector } from "react-redux";
import { useGetUserDetailsQuery } from "../../../authApi";
import { RootState } from "../../../store";
import {
  useGetRestaurantsByCityQuery,
  useAddReviewMutation,
} from "../../../apiSlice";
import SelectError from "../../common/SelectError";
import { validationSchema } from "./validationSchema";
import { isErrorResponse } from "./isErrorResponse";
import { TextareaWithErrorStyle } from "./TextareaWithErrorStyle";
import { InputWithErrorStyle } from "./InputWithErrorStyle";
import FeedbackTypeSelector from "./FeedbackTypeSelector";

export interface ReviewErrorResponse {
  status: number;
  data: {
    email?: string[];
    phone_number?: string[];
  };
}

export interface ReviewFormProps {
  closeReviewForm: () => void;
  openModal: () => void;
}

const ReviewForm = ({ closeReviewForm, openModal }: ReviewFormProps) => {
  const [reviewDetail] = useAddReviewMutation();
  const token = useSelector((state: RootState) => state.auth.accessToken);
  const citySlug = useSelector((state: RootState) => state.city.citySlug);
  const { data: restaurants = [] } = useGetRestaurantsByCityQuery(citySlug);
  const { data: userDetails } = useGetUserDetailsQuery(undefined, {
    skip: !token,
  });

  const transformErrors = (err: ReviewErrorResponse) => {
    const formikErrors: { [key: string]: string } = {};
    if (err.data.email) {
      formikErrors.email = err.data.email[0];
    }
    if (err.data.phone_number) {
      formikErrors.phone_number = err.data.phone_number[0];
    }
    return formikErrors;
  };

  return (
    <>
      <Formik
        initialValues={{
          user: userDetails?.id,
          first_name: userDetails?.first_name || "",
          phone_number: userDetails?.phone_number || "",
          email: userDetails?.email || "",
          restaurant: undefined,
          review: "",
          rating: "Побажання",
        }}
        enableReinitialize
        validationSchema={validationSchema}
        validateOnChange={true}
        validateOnBlur={false}
        onSubmit={async (values, { setSubmitting, setErrors }) => {
          try {
            if (values.user) {
              const { first_name, phone_number, email, ...userIsExist } =
                values;
              await reviewDetail(userIsExist).unwrap();
            } else {
              await reviewDetail(values).unwrap();
            }
          } catch (err: unknown) {
            console.error("Failed to add review: ", err);
            if (isErrorResponse(err)) {
              setErrors(transformErrors(err));
            }
          } finally {
            setSubmitting(false);
            closeReviewForm();
            openModal();
          }
        }}
      >
        {({ isSubmitting, values, setFieldValue }) => (
          <Form className="review-form">
            <FeedbackTypeSelector setFieldValue={setFieldValue} values={values} />
            <TextareaWithErrorStyle name="review" placeholder="Відгук" />
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
              type="text"
              placeholder="Електронна пошта"
            />
            <SelectError
              name="restaurant"
              placeholder="Ресторан"
              options={restaurants.map((restaurant) => ({
                value: restaurant.id,
                label: restaurant.address,
              }))}
            />
            <button type="submit" disabled={isSubmitting}>
              Відправити
            </button>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default ReviewForm;
