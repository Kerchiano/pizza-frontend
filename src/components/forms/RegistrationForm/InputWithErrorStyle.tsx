import { useField } from "formik";

interface InputWithErrorStyleProps {
  name: string;
  type: string;
  placeholder: string;
  disabled?: boolean;
  maxLength: number;
}

export const InputWithErrorStyle = ({
  name,
  type,
  placeholder,
  maxLength,
}: InputWithErrorStyleProps) => {
  const [field, meta] = useField(name);
  return (
    <div>
      <input
        {...field}
        type={type}
        maxLength={maxLength}
        placeholder={placeholder}
        className={`border p-2 rounded w-full ${
          meta.touched && meta.error ? "border-red-500 mb-0" : "mb-4"
        }`}
      />
      {meta.touched && meta.error ? (
        <div className="text-red-500 text-sm mb-2 mt-1">{meta.error}</div>
      ) : null}
    </div>
  );
};
