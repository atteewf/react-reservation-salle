import React from "react";

interface DateInputProps {
  value: string;
  onChange: (value: string) => void;
}

const DateInput = ({ value, onChange }: DateInputProps) => {
  return (
    <div>
      <label htmlFor="choix_date">Choix de la date de reservation:</label>
      <input
        type="date"
        id="choix_date"
        name="choix_date"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};

export default DateInput;
