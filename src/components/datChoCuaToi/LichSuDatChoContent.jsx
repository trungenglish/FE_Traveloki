import { useEffect, useState } from "react";
import listIcon from "../../assets/user-booking-ic.svg";
import axios from "axios";
import PickRangeTimeToFilter from "./PickRangeTimeToFilter";
import ModalFilter from "./ModalFilter";
const API_BASE_URL = "https://cnpm-api-thanh-3cf82c42b226.herokuapp.com";

function LichSuDatChoContent() {
  // Mặc định hiển thị cả 3
  const [checkedItems, setCheckedItems] = useState({
    car: true,
    bus: true,
    train: true,
  });

  const [allData, setAllData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  // Lấy hết từ cả 3 route => Gộp chung
  useEffect(() => {
    const fetchVehicle = async () => {
      try {
        // let results = [];
        const [carResponse, busResponse, trainResponse] = await Promise.all([
          axios.get(`${API_BASE_URL}/api/GetLichSuDatXeOto`),
          axios.get(`${API_BASE_URL}/api/GetHistoryBus`),
          axios.get(`${API_BASE_URL}/api/GetLichSuDatTau`),
        ]);

        // Logic filter

        //---------------------------------------------------
        const combinedData = [
          ...carResponse.data.lichSuDatXeOto.map(item => ({ ...item, type: 'car'})),
          ...busResponse.data.lichSuDatXeBus.map(item => ({ ...item, type: 'bus'})),
          ...trainResponse.data.lichSuDatTau.map(item => ({ ...item, type: 'train'})),
        ];
        console.log(combinedData);
        setAllData(combinedData);
        setFilteredData(combinedData);
      } catch (error) {
        console.error(
          "Request failed with status code",
          error.response?.status
        );
      }
    };
    fetchVehicle();
  }, []);

  // Lọc từ modal checkbox
  useEffect(() => {
    const filterVehicle = () => {
      let filtered = allData;

      if (checkedItems.car || checkedItems.bus || checkedItems.train) {
        filtered = allData.filter((item) => {
          if (checkedItems.car && item.type === "car") return true;
          if (checkedItems.bus && item.type === "bus") return true;
          if (checkedItems.train && item.type === "train") return true;
          return false;
        });
      }
      setFilteredData(filtered);
    };
    filterVehicle();
  }, [checkedItems, allData]);

  // useEffect(() => {
  //   const filtered = allData.filter(item => checkedItems[item.type]);
  //   setFilteredData(filtered);
  // }, [checkedItems, allData]);

  const handleChange = (event) => {
    const { name, checked } = event.target;
    setCheckedItems({
      ...checkedItems,
      [name]: checked,
    });
  };
  return (
    <div className="w-[70%] mt-10 overflow-y-auto">
      <div className="w-full shadow bg-[#EDEDED] rounded-lg mb-6">
        <div className="inline-flex items-center p-4">
          <div className="mr-4">
            <img
              src={listIcon}
              alt="Avatar"
              className="w-[32px] h-[32px] rounded-full"
            />
          </div>
          <div className="font-semibold text-lg">
            Xem tất cả vé máy bay và phiếu thanh toán trong{" "}
            <a path="#" className="text-[#1D4886]">
              Đặt chỗ của tôi
            </a>
          </div>
        </div>
      </div>
      <div className="inline-flex justify-end  w-full">
        <PickRangeTimeToFilter />
        <div className="w-[1px] bg-gray-300 mx-4"></div>
        <ModalFilter 
            checkedItems={checkedItems} 
            handleChange={handleChange} 
        />
      </div>
      {filteredData.map((vehicle, index) => (
        <div
          key={index._id}
          className="hover:border-[#00266B] hover:border-2 mt-5 w-full shadow bg-[#EDEDED] rounded-lg mb-6 text-lg"
        >
          <div className="p-4">
            <div className="font-bold">Tuyến: </div>
            <hr className="my-4 border-t-2 border-slate-300 w-full" />
            <div className="inline-flex w-full">
              <div className="w-[80%]">
                {/* <div className="">{vehicle.type}</div> */}
                <div className="">{vehicle.MaDX}</div>
                <div className="">{vehicle.Date}</div>
              </div>
            </div>
          </div>
        </div>
      ))}
      {/* {filteredData.map((vehicle, index) => (
        <div
          key={index._id}
          className="hover:border-[#00266B] hover:border-2 mt-5 w-full shadow bg-[#EDEDED] rounded-lg mb-6 text-lg"
        >
          <div className="p-4">
            <div className="font-bold">Tuyến: </div>
            <hr className="my-4 border-t-2 border-slate-300 w-full" />
            <div className="inline-flex w-full">
              <div className="w-[70%]">
                <div className="">{vehicle.MaVeBus}</div>
                <div className="">Xe bus</div>
              </div>
            </div>
          </div>
        </div>
      ))}
      {filteredData.map((vehicle, index) => (
        <div
          key={index._id}
          className="hover:border-[#00266B] hover:border-2 mt-5 w-full shadow bg-[#EDEDED] rounded-lg mb-6 text-lg"
        >
          <div className="p-4">
            <div className="font-bold">Tuyến: </div>
            <hr className="my-4 border-t-2 border-slate-300 w-full" />
            <div className="inline-flex w-full">
              <div className="w-[70%]">
                <div className="">{vehicle.MaVeTau}</div>
                <div className="">Xe tàu</div>
              </div>
            </div>
          </div>
        </div>
      ))} */}
    </div>
  );
}

export default LichSuDatChoContent;
