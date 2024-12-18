import { useEffect, useState } from "react";
import { format, addMinutes, setHours, setMinutes } from "date-fns";
import SelectError from "../../../components/common/SelectError";

interface TimeSelectorProps {
  selectedDate: string;
  handleChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

const TimeSelector = ({ selectedDate }: TimeSelectorProps) => {
  const [availableTimes, setAvailableTimes] = useState<string[]>([]);

  const roundTimeToNextInterval = (date: Date): Date => {
    const minutes = date.getMinutes();
    const roundedMinutes = Math.ceil(minutes / 15) * 15;
    return setMinutes(setHours(date, date.getHours()), roundedMinutes);
  };

  const generateAvailableTimes = () => {
    const now = new Date();
    const startTime = setMinutes(setHours(new Date(), 12), 0);
    const endTime = setMinutes(setHours(new Date(), 22), 0);
    const times: string[] = [];
    let currentTime =
      (selectedDate === "Сьогодні" ||
        selectedDate === format(now, "yyyy-MM-dd")) &&
      now < endTime &&
      now > startTime
        ? now
        : startTime;

    currentTime = roundTimeToNextInterval(currentTime);

    const intervals = ["00", "15", "30", "45"];

    while (currentTime <= endTime) {
      const hour = format(currentTime, "HH");
      const minute = format(currentTime, "mm");
      const timeString = `${hour}:${minute}`;

      if (intervals.includes(minute)) {
        if (
          (selectedDate === "Сьогодні" && currentTime > now) ||
          selectedDate !== "Сьогодні"
        ) {
          times.push(timeString);
        }
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
