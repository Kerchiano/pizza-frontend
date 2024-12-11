interface CitySelectProps {
  name: string;
  value: string;
  handleChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

export const CitySelect = ({ name, value, handleChange }: CitySelectProps) => {
  return (
    <div className="form-group city-field">
      <label className="block text-black text-sm mb-[5px]">Місто</label>
      <select
        name={name}
        value={value}
        onChange={handleChange}
        className="input-with-error-style border cursor-pointer"
      >
        <option value="K">Київ</option>
        <option value="Kh">Харків</option>
        <option value="D">Дніпро</option>
        <option value="M">Миколаїв</option>
      </select>
    </div>
  );
};
