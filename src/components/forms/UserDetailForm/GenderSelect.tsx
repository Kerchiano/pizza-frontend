import React from "react";

interface GenderSelectProps {
  values: { gender: string };
  handleChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  isSubmitting: boolean;
}

const GenderSelect = ({
  values,
  handleChange,
  isSubmitting,
}: GenderSelectProps) => {
  return (
    <div className="form-group">
      <label className="block text-black text-sm mb-[5px] min-h-[20px]">
        Стать
      </label>
      <select
        id="gender"
        name="gender"
        value={values.gender}
        onChange={handleChange}
        className="input-with-error-style border cursor-pointer mb-[10px]"
      >
        <option value="M">Чоловіча</option>
        <option value="F">Жіноча</option>
      </select>
      <button type="submit" disabled={isSubmitting}>
        Зберегти зміни
      </button>
    </div>
  );
};

export default GenderSelect;
