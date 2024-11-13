import { Field, useField } from "formik";

const SelectError = ({
  name,
  placeholder,
  options,
  disabled,
  ...props
}: any) => {
  const [field, meta] = useField(name);
  const isDisabled = disabled || false;

  return (
    <div className={`form-field ${field.name}-field`}>
      <label className="block text-black text-sm mb-[5px] min-h-[20px]">
        {placeholder}:
      </label>

      <Field
        as="select"
        {...field}
        disabled={isDisabled}
        className={`border p-2 rounded w-full ${
          meta.touched && meta.error ? "border-red-500 mb-0" : "mb-4"
        }`}
        {...props}
      >
        <option value="">Виберіть {placeholder}</option>
        {options?.map((option: any, index: number) => (
          <option key={index} value={option.value}>
            {option.label || option}
          </option>
        ))}
      </Field>

      {meta.touched && meta.error ? (
        <div className="text-red-500 text-sm">{meta.error}</div>
      ) : null}
    </div>
  );
};

export default SelectError;
