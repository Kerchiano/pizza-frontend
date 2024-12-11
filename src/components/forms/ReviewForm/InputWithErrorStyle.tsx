import { useField } from "formik";

interface InputWithErrorStyleProps {
  name: string;
  type: string;
  placeholder: string;
  disabled?: boolean;
}

export const InputWithErrorStyle = ({ name, type, placeholder }: InputWithErrorStyleProps) => {
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
