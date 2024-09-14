import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faSuitcase } from "@fortawesome/free-solid-svg-icons";
import imagelist from "../../assets/listbooking.png";
import { useSearchParams, useNavigate } from "react-router-dom";

const ListBookingCar = () => {
  const url = "https://cnpm-api-thanh-3cf82c42b226.herokuapp.com/api";
  const navigate = useNavigate();
  const [detailCar, setDetailCar] = useState([]);
  const [fetchError, setFetchError] = useState(null);
  const [searchParams] = useSearchParams();

  const SanBay = searchParams.get("SanBay") || "Default San Bay";
  const Date = searchParams.get("Date") || "Default Date";
  const Time = searchParams.get("Time") || "Default Time";
  const IDTram = searchParams.get("IDTram") || "Default IDTram";
  const MaSB = searchParams.get("MaSB") || "";

  const formatPrice = (price) => {
    return new Intl.NumberFormat().format(price);
  };

  const fetchDetailCar = async () => {
    try {
      const res = await fetch(`${url}/FindDetailCarID?MaSB=${MaSB}`);
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      const result = await res.json();
      setDetailCar(result.detailCars || []);
    } catch (e) {
      console.error("Error fetching detail car:", e);
      setFetchError("Failed to load details. Please try again later.");
    }
  };

  const handleSubmit = (detailCarID) => {
    navigate(
      `/BookingCar?SanBay=${encodeURIComponent(
        SanBay
      )}&Date=${encodeURIComponent(Date)}&Time=${encodeURIComponent(
        Time
      )}&IDTram=${IDTram}&DetailCarID=${detailCarID}`
    );
  };

  useEffect(() => {
    if (MaSB) {
      fetchDetailCar();
    }
  }, [MaSB]);

  return (
    <div className="w-full h-full mx-auto container">
      <img src={imagelist} alt="List Booking" />
      {fetchError && <div className="text-red-500">{fetchError}</div>}
      {detailCar.map((item) => (
        <div
          className="bg-white my-4 rounded-lg hover:border-green-500 border-2 transition-all duration-300"
          key={item._id}
        >
          <div className="flex">
            <img
              src={item.Image}
              className="w-1/3 h-44 rounded-s-lg"
              alt={item.TenHangXe}
            />

            <div className="grid w-full grid-cols-12 gap-4">
              <div className="p-4 col-span-7">
                <p className="text-4xl">
                  {item.TenHangXe}
                  <span className="text-2xl text-gray-500">(Standard)</span>
                </p>
                <p className="text-gray-500">{item.CongTy}</p>
                <span className="text-gray-300 mr-4">
                  <FontAwesomeIcon icon={faUser} /> {item.SoGheToiDa}
                </span>
                <span className="text-gray-300 mr-4">
                  <FontAwesomeIcon icon={faSuitcase} /> {item.SoHanhLyToiDa}
                </span>
              </div>
              <div className="col-span-5 p-4 mt-3 flex justify-end">
                <div>
                  <div className="w-fit">
                    <span className="text-lg text-orange-400">
                      {formatPrice(item.SoTien_1km)} VND/Km
                    </span>
                  </div>
                  <button
                    onClick={() => handleSubmit(item._id)}
                    className="bg-orange-500 w-full text-white font-bold rounded-lg p-2"
                  >
                    Choose
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ListBookingCar;
