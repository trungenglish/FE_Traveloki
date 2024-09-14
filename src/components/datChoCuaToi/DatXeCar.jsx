import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function RightContent() {
  const url = "https://cnpm-api-thanh-3cf82c42b226.herokuapp.com/api";
  const [lichSuCar, setLichSuCar] = useState([]);
  const currentMaKH = "KHthanh"; //TODO thay thế mã bằng giá trị động từ khách hàng đăng nhập
  const filteredLichSuCar = lichSuCar.filter(
    (item) => item.MaKH === currentMaKH
  ); // Lọc lịch sử đặt xe theo mã khách hàng hiện tại
  const navigate = useNavigate();

  // Hàm định dạng ngày giờ
  //get ls xe
  useEffect(() => {
    const getLichSuDatXe = async () => {
      try {
        const res = await axios.get(
          `${url}/GetLichSuDatXeOto`,
          { params: { MaKH: currentMaKH } } //TODO Nếu Controller API không hỗ trợ thì xóa dòng này
        );
        console.log(res.data);
        setLichSuCar(res.data.lichSuDatXeOto);
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
      `/CancelTicket?MaDX=${encodeURIComponent(maDX)}&id=${encodeURIComponent(
        id
      )}`
    );
  };
  return (
    <div className="w-full mt-10 h-[600px] overflow-y-auto">
      <h2 className="font-bold text-2xl">
        Vé điện tử & Phiếu thanh toán hiện hành
      </h2>
      <div></div>
      {filteredLichSuCar.map((item) => (
        <div key={item._id} className="w-full shadow bg-[#EDEDED] rounded-lg">
          <div className="items-center p-4 mt-4">
            <div className="flex my-1">
              <p>Mã đặt chỗ Xe của traveloki</p>
              <p className="ml-1 font-bold ">{item.MaDX}</p>
            </div>
            <hr className="my-4 border-t-2 border-slate-300 w-full" />
            <div className="flex my-1">
              <p>Ngày đặt:</p>
              <p className="ml-1 font-bold ">{item.Date}</p>
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
