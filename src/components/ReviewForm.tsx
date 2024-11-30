import { Formik, Form, useField } from "formik";
import * as Yup from "yup";
import { useEffect } from "react";
import { useGetUserDetailsQuery } from "../authApi";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import {
  useAddReviewMutation,
  useGetRestaurantsByCityQuery,
} from "../apiSlice";
import SelectError from "./SelectError";

interface ReviewErrorResponse {
  status: number;
  data: {
    email?: string[];
    phone_number?: string[];
  };
}

interface ReviewFormProps {
  closeReviewForm: () => void;
  openModal: () => void;
}

const ReviewForm = ({ closeReviewForm, openModal }: ReviewFormProps) => {
  const [reviewDetail] = useAddReviewMutation();
  const token = useSelector((state: RootState) => state.auth.accessToken);
  const citySlug = useSelector((state: RootState) => state.city.citySlug);
  const { data: restaurants = [] } = useGetRestaurantsByCityQuery(citySlug);
  const { data: userDetails, refetch: refetchUserDetails } =
    useGetUserDetailsQuery(undefined, {
      skip: !token,
    });

  useEffect(() => {
    if (token) {
      if (refetchUserDetails) {
        refetchUserDetails();
      }
    }
  }, [token, refetchUserDetails]);

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

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    first_name: Yup.string().required("Ім'я обов'язково"),
    phone_number: Yup.string().required("Номер телефону обов'язково"),
    review: Yup.string().required("Текст відгуку обов'язково"),
    restaurant: Yup.string().required("Ресторан обов'язково"),
  });

  const isErrorResponse = (error: unknown): error is ReviewErrorResponse => {
    return (
      typeof error === "object" &&
      error !== null &&
      "data" in error &&
      typeof (error as ReviewErrorResponse).data === "object"
    );
  };

  const InputWithErrorStyle = ({ name, type, placeholder }: any) => {
    const [field, meta] = useField(name);
    return (
      <div className="form-field">
        <label className="block text-black text-sm mb-[5px] min-h-[20px]">
          {placeholder}
        </label>
        <input
          {...field}
          type={type}
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

  const TextareaWithErrorStyle = ({ name, placeholder }: any) => {
    const [field, meta] = useField(name);
    return (
      <div className="form-field">
        <label className="block text-black text-sm mb-[5px] min-h-[20px]">
          {placeholder}
        </label>
        <textarea
          {...field}
          className={`border p-2 rounded w-full resize-none h-32 ${
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
            closeReviewForm()
            openModal()
          }
        }}
      >
        {({ isSubmitting, values, setFieldValue }) => (
          <Form className="review-form">
            <div className="radio-btns">
              <div
                onClick={() => setFieldValue("rating", "Подяка")}
                style={{
                  background:
                    "url('https://raw.githubusercontent.com/Kerchiano/storage-photos/refs/heads/main/pizza_photos/blagodarno.png') no-repeat 10px center",
                  backgroundColor:
                    values.rating === "Подяка" ? "#f2f2f2" : "#fff",
                }}
                className="feedback-type"
              >
                Подяка
              </div>
              <div
                onClick={() => setFieldValue("rating", "Скарга")}
                style={{
                  background:
                    "url('https://raw.githubusercontent.com/Kerchiano/storage-photos/refs/heads/main/pizza_photos/zhaloba.png') no-repeat 10px center",
                  backgroundColor:
                    values.rating === "Скарга" ? "#f2f2f2" : "#fff",
                }}
                className="feedback-type"
              >
                Скарга
              </div>
              <div
                onClick={() => setFieldValue("rating", "Побажання")}
                style={{
                  background:
                    "url('https://raw.githubusercontent.com/Kerchiano/storage-photos/refs/heads/main/pizza_photos/pozhelanie.png') no-repeat 10px center",
                  backgroundColor:
                    values.rating === "Побажання" ? "#f2f2f2" : "#fff",
                }}
                className="feedback-type"
              >
                Побажання
              </div>
            </div>
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
