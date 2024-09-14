import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// Hàm định dạng ngày giờ
const formatDate = (dateString) => {
  const dateObject = new Date(dateString);

  // Lấy các phần của ngày
  const day = String(dateObject.getDate()).padStart(2, "0");
  const month = String(dateObject.getMonth() + 1).padStart(2, "0"); // Tháng bắt đầu từ 0
  const year = dateObject.getFullYear();
  const hours = String(dateObject.getHours()).padStart(2, "0");
  const minutes = String(dateObject.getMinutes()).padStart(2, "0");
  const seconds = String(dateObject.getSeconds()).padStart(2, "0");

  // Định dạng ngày theo "dd/MM/yyyy HH:mm:ss"
  return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
};

function RightContent() {
  const url = "https://cnpm-api-thanh-3cf82c42b226.herokuapp.com/api";
  const [lichSuTrain, setLichSuTrain] = useState([]);
  const currentMaKH = "KHthanh";
  const filteredLichSuTrain = lichSuTrain.filter(
    (item) => item.MaKH === currentMaKH
  ); // Lọc lịch sử đặt xe theo mã khách hàng hiện tại
  const navigate = useNavigate();

  //get ls xe
  useEffect(() => {
    const getLichSuDatXe = async () => {
      try {
        const res = await axios.get(`${url}/GetLichSuDatTau`, {
          params: { MaKH: currentMaKH },
        });
        console.log(res.data);
        setLichSuTrain(res.data.lichSuDatTau);
      } catch (error) {
        console.error(
          "Request failed with status code",
          error.response?.status
        );
      }
    };
    getLichSuDatXe();
  }, [currentMaKH]);

  const handleSubmitCar = (maDX, id) => {
    navigate(
      `/CancelTicketTau?MaDX=${encodeURIComponent(
        maDX
      )}&id=${encodeURIComponent(id)}`
    );
  };

  return (
    <div className="w-full mt-10 h-[600px] overflow-y-auto">
      <h2 className="font-bold text-2xl">
        Vé điện tử & Phiếu thanh toán hiện hành
      </h2>
      <div></div>
      {filteredLichSuTrain.map((item) => (
        <div key={item._id} className="w-full shadow bg-[#EDEDED] rounded-lg">
          <div className="items-center p-4 mt-4">
            <div className="flex my-1">
              <p>Mã đặt chỗ Xe của traveloki</p>
              <p className="ml-1 font-bold ">{item.MaDX}</p>
            </div>
            <hr className="my-4 border-t-2 border-slate-300 w-full" />
            <div className="flex my-1">
              <p>Ngày đặt:</p>
              <p className="ml-1 font-bold ">{formatDate(item.Date)}</p>
            </div>
            <div className="flex">
              <div className="bg-blue-900 text-white rounded-full my-1 py-1 px-4">
                Trạng thái thanh toán
              </div>
              <div
                className="ml-auto font-semibold text-blue-800 cursor-pointer hover:text-blue-800"
                onClick={() => handleSubmitCar(item.MaDX, item._id)}
              >
                Xem chi tiết
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default RightContent;
