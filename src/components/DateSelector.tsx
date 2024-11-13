import { useEffect, useState } from "react";
import { format, addDays } from "date-fns";
import { uk } from "date-fns/locale";
import { Field } from "formik";

interface DateSelectorProps {
  setSelectedDate: (date: string) => void;
  handleChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

const DateSelector = ({ setSelectedDate, handleChange }: DateSelectorProps) => {
  const [availableDates, setAvailableDates] = useState<
    { display: string; value: string }[]
  >([]);
  const [currentDate, setCurrentDate] = useState(new Date());

  const generateAvailableDates = () => {
    const dates = [
      { display: "Сьогодні", value: format(currentDate, "yyyy-MM-dd") },
      {
        display: "Завтра",
        value: format(addDays(currentDate, 1), "yyyy-MM-dd"),
      },
    ];

    for (let i = 2; i < 7; i++) {
      const nextDate = addDays(currentDate, i);
      dates.push({
        display: format(nextDate, "d MMMM", { locale: uk }), // отобразим как "9 листопада"
        value: format(nextDate, "yyyy-MM-dd"), // значение как "2024-11-07"
      });
    }

    setAvailableDates(dates);
  };

  useEffect(() => {
    generateAvailableDates();

    const intervalId = setInterval(() => {
      const newDate = new Date();
      if (newDate.getDate() !== currentDate.getDate()) {
        setCurrentDate(newDate);
        generateAvailableDates();
      }
    }, 60000);

    return () => clearInterval(intervalId);
  }, [currentDate]);

  return (
    <div className="form-field">
      <label>Дата:</label>
      <Field
        style={{ border: "1px solid #eee9e3" }}
        as="select"
        name="delivery_date"
        className="choice-data"
        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
          handleChange(e);
          setSelectedDate(e.target.value);
        }}
      >
        {availableDates.map((date, index) => (
          <option key={index} value={date.value}>
            {date.display}
          </option>
        ))}
      </Field>
    </div>
  );
};

export default DateSelector;
