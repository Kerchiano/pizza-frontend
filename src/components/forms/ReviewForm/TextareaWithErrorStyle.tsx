import { useField } from "formik";

interface TextareaWithErrorStyleProps {
  name: string;
  placeholder: string;
}

export const TextareaWithErrorStyle = ({
  name,
  placeholder,
}: TextareaWithErrorStyleProps) => {
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
