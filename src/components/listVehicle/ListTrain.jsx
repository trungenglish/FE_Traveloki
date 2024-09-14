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
  const [trains, setTrains] = useState([]);
  const [tramTrain, setTramTrain] = useState({});
  const [tuyenSB, setTuyenSB] = useState([]);
  const SanBay = searchParams.get("SanBay");
  const Date = searchParams.get("Date");
  const Time = searchParams.get("Time");
  const IDTram = searchParams.get("IDTram");
  const MaSB = searchParams.get("MaSB");

  const fetchTrains = async () => {
    setFetchError(null);
    try {
      const res = await fetch(`${url}/SearchFindPhuongTien/false`);
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      const result = await res.json();
      console.log("Fetched trains:", result);
      setTrains(result.buses || []);
    } catch (e) {
      console.error("Error fetching trains:", e);
    }
  };

  const fetchTramTrain = async () => {
    if (!IDTram) return;
    try {
      const res = await fetch(`${url}/GetTramDungID/${IDTram}`);
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      const result = await res.json();
      console.log("Fetched tramTrain:", result);
      setTramTrain(result || {});
    } catch (e) {
      console.error("Error fetching tramTrain:", e);
    }
  };

  const fetchTuyenSB = async (MaSB) => {
    if (!MaSB) return;
    try {
      const res = await fetch(`${url}/TuyenDiemSanBay?diemSanBay=${MaSB}`);
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      const result = await res.json();
      console.log("Fetched tuyenSB:", result);
      setTuyenSB(result.tuyens || []);
    } catch (e) {
      console.error("Error fetching tuyenSB:", e);
    }
  };

  useEffect(() => {
    fetchTrains();
  }, []);

  useEffect(() => {
    if (MaSB) {
      fetchTuyenSB(MaSB);
    }
  }, [MaSB]);

  useEffect(() => {
    fetchTramTrain();
  }, [IDTram]);

  const formatPrice = (price) => {
    return new Intl.NumberFormat().format(price);
  };

  const handleSubmit = (TrainID) => {
    navigate(
      `/BookingTrain?SanBay=${encodeURIComponent(
        SanBay
      )}&Date=${encodeURIComponent(Date)}&Time=${encodeURIComponent(
        Time
      )}&IDTram=${IDTram}&PhuongTienID=${TrainID}`
    );
  };

  const filteredTrains = trains.filter((train) =>
    tuyenSB.some((tuyen) => tuyen.MaTuyen === train.MaTuyen)
  );

  console.log("Train data:", trains);
  console.log("TuyenSB data:", tuyenSB);
  console.log("Filtered trains:", filteredTrains);

  return (
    <div className="w-full h-full mx-auto container">
      <img src={imagelist} alt="Train List" />
      {fetchError && <div className="">{fetchError}</div>}
      {filteredTrains.length === 0 ? (
        <div className="w-full">
          <div className="flex justify-center mt-8 mx-auto">
            <img
              className="w-1/3 h-1/3"
              src="https://ik.imagekit.io/tvlk/image/imageResource/2022/11/29/1669703331120-6c5d2bb47e511f5b9b7e143f55f513d7.png?tr=dpr-2,h-200,q-75"
              alt="Không có tàu khả dụng"
            />
          </div>
          <p className="text-xl mt-4 text-center font-extrabold">
            Không có tàu nào khả dụng
          </p>
          <p className="text-center my-4">
            Không có tàu nào hoạt động giữa các địa điểm của bạn. Vui lòng kiểm
            tra lại vào thời gian khác.
          </p>
        </div>
      ) : (
        filteredTrains.map((item) => (
          <div
            className="bg-white my-4 rounded-lg hover:border-green-500 border-2 transition-all duration-300"
            key={item._id}
          >
            <div className="flex">
              <img
                src={item.image}
                className="w-1/3 h-44 rounded-s-lg"
                alt="Train"
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
                  <p className="text-xl">Lịch trình linh hoạt</p>
                </div>
                <div className="col-span-5 p-4 mt-3 flex justify-end">
                  <div>
                    <div className="w-fit">
                      <span className="text-lg text-orange-400">
                        {formatPrice(tramTrain.GiaTienVeTau || 0)} VND /1 người
                      </span>
                    </div>
                    <button
                      onClick={() => handleSubmit(item._id)}
                      className="bg-orange-500 w-full text-white font-bold rounded-lg p-2"
                    >
                      Chọn
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
