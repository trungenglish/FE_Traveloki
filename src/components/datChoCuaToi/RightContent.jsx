import React, { useState } from "react";
import Ads from "./ads";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCar, faBus, faTrain } from "@fortawesome/free-solid-svg-icons";
import DatXeCar from "./DatXeCar";
import DatXeBus from "./DatXeBus";
import DatXeTrain from "./DatXeTau";

const RightContent = () => {
  const [selected, setSelected] = useState("Car");
  const handleClick = (option) => {
    setSelected(option);
  };

  return (
    <div className="w-[70%] mt-10 h-[600px] overflow-y-auto">
      <Ads />
      <div className="flex w-full h-fit border mt-6 font-bold justify-center p-4 rounded-lg bg-white">
        <span
          onClick={() => handleClick("Car")}
          className={`cursor-pointer text-2xl px-2 ${
            selected === "Car"
              ? "border-b-2 border-[#0094F3] text-[#0094F3]"
              : "text-gray-500"
          }`}
        >
          <FontAwesomeIcon icon={faCar} /> Car
        </span>
        <span
          onClick={() => handleClick("Bus")}
          className={`mx-9 px-2 text-2xl cursor-pointer ${
            selected === "Bus"
              ? "border-b-2 border-[#0094F3] text-[#0094F3]"
              : "text-gray-500"
          }`}
        >
          <FontAwesomeIcon icon={faBus} /> Shuttle Bus
        </span>
        <span
          onClick={() => handleClick("Train")}
          className={`cursor-pointer text-2xl px-2 ${
            selected === "Train"
              ? "border-b-2 border-[#0094F3] text-[#0094F3]"
              : "text-gray-500"
          }`}
        >
          <FontAwesomeIcon icon={faTrain} /> Airport Train
        </span>
      </div>
      {selected === "Car" && <DatXeCar />}
      {selected === "Bus" && <DatXeBus />}
      {selected === "Train" && <DatXeTrain />}
    </div>
  );
};

export default RightContent;
