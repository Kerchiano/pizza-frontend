import { useField } from "formik";

interface InputWithErrorStyleProps {
  name: string;
  type: string;
  placeholder: string;
  disabled?: boolean;
}

const InputWithErrorStyle = ({
  name,
  type,
  placeholder,
}: InputWithErrorStyleProps) => {
  const [field, meta] = useField(name);

  const errorText = meta.touched && meta.error && meta.error;

  return (
    <div>
      <input
        {...field}
        type={type}
        placeholder={placeholder}
        className={`border p-2 rounded w-full ${
          errorText ? "border-red-500 mb-0" : "mb-4"
        }`}
      />
      {errorText ? (
        <div className="text-red-500 text-sm">{errorText}</div>
      ) : null}
    </div>
  );
};

export default InputWithErrorStyle;
