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
  const [reviewDetail, { isLoading }] = useAddReviewMutation();
  const token = useSelector((state: RootState) => state.auth.accessToken);
  const citySlug = useSelector((state: RootState) => state.city.citySlug);
  const { data: restaurants = [] } = useGetRestaurantsByCityQuery(citySlug);
  const { data: userDetails, isLoading: userDetailIsLoading } =
    useGetUserDetailsQuery(undefined, {
      skip: !token,
    });

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
        onSubmit={async (values, { setSubmitting }) => {
          try {
            const { first_name, phone_number, email, ...userIsExist } = values;
            await reviewDetail(userIsExist).unwrap();
          } catch (err: unknown) {
            console.error("Failed to add review: ", err);
          } finally {
            setSubmitting(false);
            closeReviewForm();
            openModal();
          }
        }}
      >
        {({ isSubmitting, values, setFieldValue }) => (
          <Form className="review-form">
            <FeedbackTypeSelector
              setFieldValue={setFieldValue}
              values={values}
            />
            <TextareaWithErrorStyle name="review" placeholder="Відгук" />
            <InputWithErrorStyle
              name="first_name"
              type="text"
              placeholder="Ім'я"
              disabled={true}
            />
            <InputWithErrorStyle
              name="phone_number"
              type="text"
              placeholder="Номер телефону"
              disabled={true}
            />
            <InputWithErrorStyle
              name="email"
              type="text"
              placeholder="Електронна пошта"
              disabled={true}
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
      {(isLoading || userDetailIsLoading) && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 bg-opacity-70 z-10">
          <div
            className="w-[150px] h-[150px] border-[16px] border-t-transparent border-green-500 rounded-full animate-spin"
            role="status"
          ></div>
        </div>
      )}
    </>
  );
};

export default ReviewForm;
