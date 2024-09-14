import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlaneDeparture,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import debounce from "lodash/debounce";
import "react-datepicker/dist/react-datepicker.css";
import backgroundImage from "../../assets/introPic.png";
import { getSanBaybyTenSanBay, getTuyenDiemSanBay, suggestsAirportAPI, suggestsTramDungAPI, tramDungByDiaChi } from "../../services/api/search/api.search";

const SearchBar = () => {
  const url = "https://cnpm-api-thanh-3cf82c42b226.herokuapp.com/api";
  const [diemSanBay, setDiemKhoiHanh] = useState("");
  const [diemKetThuc, setDiemKetThuc] = useState("");
  const [selectedHour, setSelectedHour] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [suggestions, setSuggestions] = useState({
    sanBays: [],
    tramDungs: [],
  });
  const [showAirportSuggestions, setShowAirportSuggestions] = useState(false);
  const [showTramDungSuggestions, setShowTramDungSuggestions] = useState(false);
  const [error, setError] = useState(null);
  const today = new Date().toISOString().split('T')[0];
  const navigate = useNavigate();

  const fetchAirportSuggestions = async (query) => {
    try {
      const response = await suggestsAirportAPI(query);
      setSuggestions((prevSuggestions) => ({
        ...prevSuggestions,
        sanBays: response.data.sanBays,
      }));
    } catch (err) {
      setError("Lỗi khi lấy gợi ý sân bay: " + err.message);
    }
  };

  //click vào hiển thị dropdown
  const handleInputClick = () => {
    setShowAirportSuggestions(true);
    debouncedFetchAirportSuggestions(diemSanBay); // Hiển thị toàn bộ danh sách sân bay khi nhấp vào ô chọn
  };

  const fetchTramDungSuggestions = async (query) => {
    try {
      const response = await suggestsTramDungAPI(query);
      setSuggestions((prevSuggestions) => ({
        ...prevSuggestions,
        tramDungs: response.data.tramDungs,
      }));
    } catch (err) {
      setError("Lỗi khi lấy gợi ý trạm dừng: " + err.message);
    }
  };

  const debouncedFetchAirportSuggestions = debounce(
    fetchAirportSuggestions,
    300
  );
  const debouncedFetchTramDungSuggestions = debounce(
    fetchTramDungSuggestions,
    300
  );

  const handleAirportSuggestionClick = (suggestion) => {
    setDiemKhoiHanh(suggestion);
    setShowAirportSuggestions(false);
  };

  const handleTramDungSuggestionClick = (suggestion) => {
    setDiemKetThuc(suggestion);
    setShowTramDungSuggestions(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        !event.target.closest(".suggestion-container-airport") &&
        !event.target.closest(".suggestion-container-tram")
      ) {
        setShowAirportSuggestions(false);
        setShowTramDungSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleAirportInputFocus = () => {
    setShowAirportSuggestions(true);
  };

  const handleTramDungInputFocus = () => {
    setShowTramDungSuggestions(true);
  };

  const handleSubmit = async () => {
    if (!diemSanBay || !diemKetThuc || !selectedDate || !selectedHour) {
      alert("Vui lòng nhập đầy đủ thông tin");
      return;
    }

    const currentDate = new Date().toISOString().split("T")[0];
    const currentTime = new Date().toISOString().split("T")[1].split(".")[0];

    if (
      selectedDate < currentDate ||
      (selectedDate === currentDate && selectedHour <= currentTime)
    ) {
      alert("Vui lòng chọn ngày và giờ lớn hơn hiện tại");
      return;
    }

    try {
      const tramDungResponse = await tramDungByDiaChi(diemKetThuc);
      const tramDungs = tramDungResponse.data.tramDungs || [];

      if (tramDungs.length === 0) {
        alert("Không tìm thấy trạm dừng phù hợp");
        return;
      }

      const sanBayResponse = await getSanBaybyTenSanBay(diemSanBay);
      const sanBay = sanBayResponse.data.sanbays[0];

      if (!sanBay) {
        alert("Không tìm thấy sân bay phù hợp");
        return;
      }

      const maSanBay = sanBay.MaSB;

      const tuyenResponse = await getTuyenDiemSanBay(maSanBay);
      const tuyens = tuyenResponse.data.tuyens || [];
      if (!tuyens.length) {
        alert("Không tìm thấy tuyến xe từ sân bay này");
        return;
      }

      const tuyen = tuyens[0];
      if (tuyen.DiemSanBay !== maSanBay) {
        alert("Chưa có tuyến từ sân bay này đến trạm dừng");
        return;
      }

      const maTuyen = tuyen.MaTuyen;
      const tramDung = tramDungs.find((tram) => tram.MaTuyen === maTuyen);

      if (!tramDung) {
        alert("Chưa có tuyến xe từ sân bay này đến trạm dừng");
        return;
      } else {
        const IDTramS = tramDung._id;
        navigate(
          `/ListMain?SanBay=${encodeURIComponent(
            diemSanBay
          )}&Date=${encodeURIComponent(selectedDate)}&Time=${encodeURIComponent(
            selectedHour
          )}&IDTram=${IDTramS}&MaSB=${maSanBay}`
        );
      }
    } catch (err) {
      console.error(
        "Error fetching tram data:",
        err.response ? err.response.data : err.message
      );
      setError(
        "Lỗi khi lấy trạm dừng: " +
          (err.response ? err.response.data.message : err.message)
      );
    }
  };

  return (
    <div
      className="h-auto bg-cover w-full flex justify-center"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="mx-auto pt-12 flex justify-center w-full container pb-24">
        <div className="h-fit bg-white rounded-xl p-4 justify-center grid xl:grid-cols-12 sm:grid-cols-6 grid-cols-2 w-full">
          <div className="h-fit sm:col-span-2 col-span-1 p-5 w-full">
            <div className="suggestion-container-airport">
              <label className="text-black font-bold flex mb-2 items-center space-x-2">
                Từ sân bay
              </label>
              <div className="flex relative">
                <span className="pl-1 absolute top-2">
                  <FontAwesomeIcon icon={faPlaneDeparture} />
                </span>
                <input
                  type="text"
                  value={diemSanBay}
                  onChange={(e) => {
                    setDiemKhoiHanh(e.target.value);
                    debouncedFetchAirportSuggestions(e.target.value);
                    setShowAirportSuggestions(true);
                  }}
                  onClick={handleInputClick}
                  className="w-full bg-slate-100 outline-none pl-8 border-black rounded-lg p-2"
                  placeholder="Sân bay khởi hành"
                  onFocus={handleAirportInputFocus}
                />
              </div>
              {showAirportSuggestions && (
                <ul className="w-1/4 p-2 top-56 bg-gray-100 z-0 h-fit min:h-1/4 absolute overflow-auto mt-6 rounded-lg">
                  {suggestions.sanBays.map((sanBay, index) => (
                    <li
                      className=" hover:bg-blue-100 p-2 rounded-md border-b-gray-400 border-0 border-b-2 "
                      key={index}
                      onClick={() => handleAirportSuggestionClick(sanBay)}
                    >
                      {sanBay}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
          <span className="w-full col-span-1 text-center pb-6 mt-11 text-3xl pr-9 translate-y-2">
            ⇌
          </span>
          <div className="h-fit pt-5 col-span-1 sm:col-span-3 pr-5 w-full">
            <div className="suggestion-container-tram">
              <label className="text-black font-bold flex mb-2 items-center space-x-2">
                Đến khu vực địa chỉ{" "}
              </label>
              <div className="flex relative">
                <span className="pl-1 absolute z-50 top-2">
                  <FontAwesomeIcon icon={faLocationDot} />
                </span>
                <input
                  type="text"
                  value={diemKetThuc}
                  onChange={(e) => {
                    setDiemKetThuc(e.target.value);
                    debouncedFetchTramDungSuggestions(e.target.value);
                    setShowTramDungSuggestions(true);
                  }}
                  className="w-full bg-slate-100 outline-none pl-8 z-30 border-black rounded-lg p-2"
                  placeholder="Đến khu vực địa chỉ tòa nhà"
                  onFocus={handleTramDungInputFocus}
                />
              </div>
              {showTramDungSuggestions && (
                <ul className="w-1/4 p-2 top-56 bg-gray-100 z-0 h-fit min:h-1/4 absolute overflow-auto mt-6 rounded-lg">
                  {suggestions.tramDungs.map((suggestion, index) => (
                    <li
                      className=" hover:bg-blue-100 p-2 rounded-md border-b-gray-400 border-0 border-b-2 "
                      key={index}
                      onClick={() => handleTramDungSuggestionClick(suggestion)}
                    >
                      {suggestion}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
          <div className="mt-5 col-span-1 sm:col-span-2">
            <label className="text-black pl-2 font-bold flex mb-2 items-center space-x-2">
              Ngày khởi hành
            </label>
            <div className="items-center h-fit w-3/4 px-2 py-[6px] mx-2 bg-gray-200 shadow rounded-lg">
              <input
                type="date"
                min={today}
                className="bg-transparent w-full h-fit outline-none text-center"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
              />
            </div>
          </div>
          <div className="mt-5 col-span-1 sm:col-span-2">
            <label className="text-black pl-2 font-bold flex mb-2 items-center space-x-2">
              Giờ khởi hành
            </label>
            <div className="items-center flex justify-center h-fit w-3/4 px-2 py-[6px] mx-2 bg-gray-200 shadow rounded-lg">
              <input
                type="time"
                className="bg-transparent w-full h-fit outline-none text-center"
                value={selectedHour}
                onChange={(e) => setSelectedHour(e.target.value)}
              />
            </div>
          </div>
          <div className="flex justify-center col-span-1 sm:col-span-1 h-fit mt-[50px]">
            <button
              onClick={handleSubmit}
              className="bg-blue-500 text-white font-bold py-2 px-4 rounded"
            >
              Tìm kiếm
            </button>
          </div>
        </div>
        {error && <div className="text-red-500 mt-4">{error}</div>}
      </div>
    </div>
  );
};

export default SearchBar;
