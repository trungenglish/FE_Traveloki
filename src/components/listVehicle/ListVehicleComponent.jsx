import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCar, faBus, faTrain } from "@fortawesome/free-solid-svg-icons";
import ListBookingCar from "./ListCar";
import ListBookingBus from "./ListBus";
import ListBookingTrain from "./ListTrain";
import { useSearchParams, useNavigate } from "react-router-dom";

const ListMain = () => {
  const url = "https://cnpm-api-thanh-3cf82c42b226.herokuapp.com/api";
  const [selected, setSelected] = useState("Car");
  const [searchParams] = useSearchParams();

  const SanBay = searchParams.get("SanBay") || "Default San Bay";
  const Date = searchParams.get("Date") || "Default Date";
  const Time = searchParams.get("Time") || "Default Time";
  const IDTram = searchParams.get("IDTram") || "Default IDTram";
  const MaSB = searchParams.get("MaSB") || "";

  const handleClick = (option) => {
    setSelected(option);
  };

  return (
    <div className="w-[85%] h-full mx-auto container">
      <div className="relative">
        <div className="absolute p-16">
          <p className="text-white font-extrabold text-2xl">
            Đến sân bay không còn mệt mỏi
          </p>
          <p className="w-1/2 text-white">
            Biến chuyến đi đến và từ sân bay đi trở nên tiện lợi nhất có thể!
            Với nhiều lựa chọn phương tiện phù hợp với nhu cầu của bạn, hãy đặt
            ngay xe đưa đón sân bay hôm nay để bớt đi một nỗi lo nhé.
          </p>
        </div>
        <img
          src="https://ik.imagekit.io/tvlk/image/imageResource/2018/10/08/1538999958318-bb50c036ab44378f08d0d3b8020366c1.png?tr=dpr-2,q-75,w-960"
          alt="Background"
        />
      </div>

      <div className="w-full mx-auto flex border-b-2 pb-4">
        <div className="pt-9 w-3/4">
          <p className="font-extrabold text-3xl">From {SanBay} (CGK)</p>
          <span className="text-xl">
            {Date} | {Time}
          </span>
        </div>
        <div className="flex w-1/4 justify-end">
          <button className="font-bold bg-[#0094F3] w-fit h-fit p-2 text-white rounded-md mt-8">
            Change Search
          </button>
        </div>
      </div>

      <div className="flex w-full h-fit border mt-6 font-bold p-4 rounded-lg bg-white">
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
      {selected === "Car" && <ListBookingCar />}
      {selected === "Bus" && <ListBookingBus />}
      {selected === "Train" && <ListBookingTrain />}
    </div>
  );
};

export default ListMain;
