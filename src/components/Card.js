import React, { useState } from "react";
import Select from "react-select";

const Card = () => {
  const options = [
    { value: "Available", label: "Available" },
    { value: "In a Meeting", label: "In a Meeting" },
    { value: "Lunch", label: "Lunch" },
    { value: "Offline", label: "Offline" },
  ];

  const [selectedOption, setSelectedOption] = useState(null);

  return (
    <div className="card">
      <Select
        defaultValue={selectedOption}
        onChange={setSelectedOption}
        options={options}
      />
    </div>
  );
};

export default Card;
