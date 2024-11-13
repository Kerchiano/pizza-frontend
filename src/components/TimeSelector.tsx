import { useEffect, useState } from "react";
import { format, addMinutes, setHours, setMinutes } from "date-fns";
import SelectError from "./SelectError";

interface TimeSelectorProps {
  selectedDate: string;
  handleChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

const TimeSelector = ({ selectedDate, handleChange }: TimeSelectorProps) => {
  const [availableTimes, setAvailableTimes] = useState<string[]>([]);

  const generateAvailableTimes = () => {
    const now = new Date();
    const startTime = setMinutes(setHours(new Date(), 12), 0);
    const endTime = setMinutes(setHours(new Date(), 22), 0);
    const times: string[] = [];
    let currentTime = startTime;

    while (currentTime <= endTime) {
      if (
        (selectedDate === "Сьогодні" && currentTime > now) ||
        selectedDate !== "Сьогодні"
      ) {
        times.push(format(currentTime, "HH:mm"));
      }
      currentTime = addMinutes(currentTime, 15);
    }

    setAvailableTimes(times);
  };

  useEffect(() => {
    generateAvailableTimes();

    const intervalId = setInterval(generateAvailableTimes, 15 * 60 * 1000);

    return () => clearInterval(intervalId);
  }, [selectedDate]);

  return (
    <SelectError
      name="delivery_time"
      placeholder="Час"
      options={availableTimes.map((time) => ({ value: time, label: time }))}
    />
  );
};

export default TimeSelector;
