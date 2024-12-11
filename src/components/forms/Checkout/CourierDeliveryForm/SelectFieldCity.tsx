
import { FormikHandlers } from "formik";

interface SelectFieldCityProps {
    city: string;
    handleChange: FormikHandlers["handleChange"];
}

const SelectFieldCity = ({city, handleChange}: SelectFieldCityProps) => {
  return (
    <div className="form-field city-field">
      <label className="block text-black text-sm mb-[5px]">Місто</label>
      <select
        name="city"
        value={city}
        onChange={handleChange}
        className="input-with-error-style border cursor-pointer"
      >
        <option value="К">Київ</option>
        <option value="Kh">Харків</option>
        <option value="D">Дніпро</option>
        <option value="M">Миколаїв</option>
      </select>
    </div>
  );
};

export default SelectFieldCity;
