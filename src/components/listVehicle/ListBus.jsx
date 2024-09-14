import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import imagelist from "../../assets/busimage.png";
import { useSearchParams, useNavigate } from "react-router-dom";

const ListBookingBus = () => {
  const url = "https://cnpm-api-thanh-3cf82c42b226.herokuapp.com/api";
  const navigate = useNavigate();
  const [fetchError, setFetchError] = useState(null);
  const [searchParams] = useSearchParams();
  const [bus, setBus] = useState([]);
  const [tramBus, setTramBus] = useState({});
  const [tuyenSB, setTuyenSB] = useState([]);
  const SanBay = searchParams.get("SanBay");
  const Date = searchParams.get("Date");
  const Time = searchParams.get("Time");
  const IDTram = searchParams.get("IDTram");
  const MaSB = searchParams.get("MaSB");

  const fetchBus = async () => {
    setFetchError(null);
    try {
      const res = await fetch(`${url}/SearchFindPhuongTien/true`);
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      const result = await res.json();
      console.log("Fetched buses:", result);

      setBus(result.buses || []);
    } catch (e) {
      console.error("Error fetching bus:", e);
      setFetchError(
        <div className="w-full">
          <div className="flex justify-center mt-8 mx-auto">
            <img
              className="w-1/3 h-1/3"
              src="https://ik.imagekit.io/tvlk/image/imageResource/2022/11/29/1669703331120-6c5d2bb47e511f5b9b7e143f55f513d7.png?tr=dpr-2,h-200,q-75"
              alt="No buses available"
            />
          </div>
          <p className="text-xl mt-4 text-center font-extrabold">
            No Buses Available
          </p>
          <p className="text-center my-4">
            There are no buses operating between your locations. Please check
            again at another time.
          </p>
        </div>
      );
    }
  };

  const fetchTramBus = async () => {
    if (!IDTram) return;
    try {
      const res = await fetch(`${url}/GetTramDungID/${IDTram}`);
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      const result = await res.json();
      console.log("Fetched tramBus:", result);
      setTramBus(result || {});
    } catch (e) {
      console.error("Error fetching tramBus:", e);
      setFetchError("Failed to load tramBus details. Please try again later.");
    }
  };

  const fetchgetTuyenSB = async (MaSB) => {
    if (!MaSB) return;
    try {
      const res = await fetch(`${url}/TuyenDiemSanBay?diemSanBay=${MaSB}`);
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      const result = await res.json();
      setTuyenSB(result.tuyens || []);
    } catch (e) {
      console.error("Error fetching tuyenSB:", e);
      setFetchError("Failed to load TuyenSB details. Please try again later.");
    }
  };

  useEffect(() => {
    fetchBus();
  }, []);

  useEffect(() => {
    if (MaSB) {
      fetchgetTuyenSB(MaSB);
    }
  }, [MaSB]);

  useEffect(() => {
    fetchTramBus();
  }, [IDTram]);

  const formatPrice = (price) => {
    return new Intl.NumberFormat().format(price);
  };

  const handleSubmit = (busID) => {
    navigate(
      `/BookingBus?SanBay=${encodeURIComponent(
        SanBay
      )}&Date=${encodeURIComponent(Date)}&Time=${encodeURIComponent(
        Time
      )}&IDTram=${IDTram}&PhuongTienID=${busID}`
    );
  };

  const filteredBuses = (Array.isArray(bus) ? bus : []).filter((item) =>
    tuyenSB.some((tuyen) => tuyen.MaTuyen === item.MaTuyen)
  );

  return (
    <div className="w-full h-full mx-auto container">
      <img src={imagelist} alt="Bus List" />
      {fetchError && <div className="">{fetchError}</div>}
      {filteredBuses.length === 0 ? (
        <div className="w-full">
          <div className="flex justify-center mt-8 mx-auto">
            <img
              className="w-1/3 h-1/3"
              src="https://ik.imagekit.io/tvlk/image/imageResource/2022/11/29/1669703331120-6c5d2bb47e511f5b9b7e143f55f513d7.png?tr=dpr-2,h-200,q-75"
              alt="No buses available"
            />
          </div>
          <p className="text-xl mt-4 text-center font-extrabold">
            No Buses Available
          </p>
          <p className="text-center my-4">
            There are no buses operating between your locations. Please check
            again at another time.
          </p>
        </div>
      ) : (
        filteredBuses.map((item) => (
          <div
            className="bg-white my-4 rounded-lg hover:border-green-500 border-2 transition-all duration-300"
            key={item._id}
          >
            <div className="flex">
              <img
                src={item.image}
                className="w-auto h-44 rounded-s-lg"
                alt="Bus"
              />
              <div className="grid w-full grid-cols-12 gap-4">
                <div className="p-4 col-span-7">
                  <p className="text-4xl">
                    {item.TenPhuongTien}
                    <span className="text-2xl text-gray-500">(Standard)</span>
                  </p>
                  <span className="text-gray-300 mr-4">
                    <FontAwesomeIcon icon={faUser} /> {item.SoGheToiDa}
                  </span>
                  <p className="text-xl">Flexible Schedule</p>
                </div>
                <div className="col-span-5 p-4 mt-3 flex justify-end">
                  <div>
                    <div className="w-fit">
                      <span className="text-lg text-orange-400">
                        {formatPrice(tramBus.GiaTienVe || 0)} VND / 1 ticket
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
        ))
      )}
    </div>
  );
};

export default ListBookingBus;
