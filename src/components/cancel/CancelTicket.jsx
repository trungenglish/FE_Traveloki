import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { parse, format, differenceInMilliseconds, isSameDay } from "date-fns";

import {
  faUser,
  faBagShopping,
  faCaretDown,
  faCaretUp,
  faPlaneArrival,
  faCalendarDays,
} from "@fortawesome/free-solid-svg-icons";

const CancelTicket = () => {
  const url = "https://cnpm-api-thanh-3cf82c42b226.herokuapp.com/api";
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const MaDX = searchParams.get("MaDX");
  const today = new Date().toISOString().slice(0, 16);
  const [detailBookingCar, setDetailBookingCar] = useState([]);
  const [detailCar, setDetailCar] = useState([]);
  const [show, setShow] = useState(false);
  const [bookingId, setBookingId] = useState(null); // state để lưu id
  const [newNgayGioDat, setNewNgayGioDat] = useState("");

  // getDetailTicket && getDetailCar
  useEffect(() => {
    //get detail ticket
    const getDatXeMaDX = async () => {
      try {
        const res = await axios.get(`${url}/FindBookingCarMaDX?MaDX=${MaDX}`);
        console.log(res.data);
        setDetailBookingCar(res.data.datXes);

        // Giả sử chỉ có một đối tượng trong mảng datXes
        const MaDetailCar = res.data.datXes[0]?.MaDetailCar;
        const id = res.data.datXes[0]?._id; // Lấy id từ response
        setBookingId(id); // Lưu id vào state
        if (MaDetailCar) {
          await getDetailCar(MaDetailCar);
        }
      } catch (error) {
        console.error(
          "Request failed with status code",
          error.response?.status
        );
        console.log("Error: ", error);
      }
    };

    //get detail ticket
    const getDetailCar = async (MaDetailCar) => {
      try {
        const res = await axios.get(`${url}/GetDetailCarID/${MaDetailCar}`);
        console.log("Detail Car:", res.data);
        setDetailCar(res.data);
      } catch (error) {
        console.error(
          "Request failed with status code",
          error.response?.status
        );
        console.log("Error: ", error);
      }
    };

    if (MaDX) {
      getDatXeMaDX();
    }
  }, [MaDX]);

  const handleClick = () => {
    setShow((prevShow) => !prevShow);
  };

  // kiểm tra giờ hợp lệ để hủy vé
  const canCancelTicket = () => {
    const currentTime = new Date();
    const bookingTime = new Date(detailBookingCar[0]?.NgayGioDat);
    // Kiểm tra nếu thời gian chuẩn bị đi còn ít hơn 1 tiếng và cùng ngày
    const differenceInMinutes = differenceInMilliseconds / (1000 * 60);
    if (isSameDay(currentTime, bookingTime) && differenceInMinutes < 60) {
      return false;
    }
    return true;
  };

  // Hàm kiểm tra thời gian đổi lịch
  const canChangeBooking = () => {
    const currentTime = new Date();
    const bookingTime = new Date(detailBookingCar[0]?.NgayGioDat);
    // Kiểm tra nếu thời gian chuẩn bị đi còn ít hơn 2 tiếng mà cùng ngày thì không cho đổi
    const differenceInMinutes = differenceInMilliseconds / (1000 * 60);
    if (isSameDay(currentTime, bookingTime) && differenceInMinutes < 120) {
      return false;
    }

    return true;
  };

  // const formatDate = (dateString) => {
  //   const dateObject = new Date(dateString);

  //   const day = String(dateObject.getDate()).padStart(2, "0");
  //   const month = String(dateObject.getMonth() + 1).padStart(2, "0");
  //   const year = dateObject.getFullYear();
  //   const hours = String(dateObject.getHours()).padStart(2, "0");
  //   const minutes = String(dateObject.getMinutes()).padStart(2, "0");
  //   const seconds = String(dateObject.getSeconds()).padStart(2, "0");

  //   return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
  // };

  // Hàm hủy vé
  const handleCancel = async () => {
    if (!canCancelTicket()) {
      alert("Không thể hủy vé vì thời gian chuẩn bị đi còn ít hơn 1 tiếng.");
    } else {
      try {
        const refundResponse = await axios.post(
          "https://api.htilssu.com/api/v1/refund",
          {
            orderId: detailBookingCar[0]?._id,
          },
          {
            headers: {
              "X-Api":
                "ffce137ec01c33b8dc4884b036acbdbaa7b5e951ab6ba5f29f3876815ac265da",
            },
          }
        );

        if (refundResponse.status === 200) {
          alert("Hoàn tiền thành công.");

          try {
            const cancelResponse = await axios.delete(
              `${url}/CancelBooking/${MaDX}`
            );
            if (cancelResponse.status === 200) {
              alert("Hủy vé thành công.");
              navigate("/my-booking");
            } else {
              alert("Có lỗi xảy ra khi hủy vé đặt xe.");
            }
          } catch (cancelError) {
            console.error("Error cancelling ticket: ", cancelError);
            alert("Có lỗi xảy ra khi hủy vé.");
          }
        } else {
          alert("Có lỗi xảy ra khi xử lý hoàn tiền.");
        }
      } catch (refundError) {
        console.error("Error processing refund: ", refundError);
        alert("Có lỗi xảy ra khi xử lý hoàn tiền.");
      }
    }
  };

  // Hàm đổi lịch
  const handleChangeBooking = async () => {
    if (!newNgayGioDat) {
      alert("Vui lòng chọn ngày giờ muốn đổi.");
    } else {
      if (!canChangeBooking()) {
        alert(
          "Không thể đổi lịch vì thời gian chuẩn bị đi còn ít hơn 4 tiếng."
        );
      } else {
        try {
          console.log("id:", bookingId);
          const response = await axios.put(
            `${url}/BookingCar/SchedularChange/${bookingId}`,
            {
              NgayGioDat: newNgayGioDat.toString(),
            }
          );
          const { message } = response.data;
          if (response.status === 200) {
            alert(message);
            navigate("/my-booking");
          } else {
            alert(message || "Có lỗi xảy ra khi đổi lịch.");
          }
        } catch (error) {
          console.error("Error changing schedule: ", error);
          alert("Có lỗi xảy ra khi đổi lịch.");
        }
      }
    }
  };
  const formatPrice = (price) => {
    return new Intl.NumberFormat().format(price);
  };

  return (
    <div className="w-[85%] py-10 b-10 my-20 border border-slate-400 rounded-md top-10 flex justify-center mx-auto relative">
      <div className=" w-full h-full pb-28 overflow-y-auto">
        <div className="bg-white rounded-md py-4 w-full top-0 absolute font-bold text-xl">
          <span className="font-extrabold text-green-500 px-4">
            {detailBookingCar[0]?.DiemSanBay}
          </span>
          -
          <span className="font-extrabold text-green-500 px-4">
            {detailBookingCar[0]?.DiemDon_Tra}
          </span>
        </div>
        <div className="w-full mt-8 px-4">
          <div className="flex text-gray-500">
            <span>
              <FontAwesomeIcon icon={faUser} />
              <span className="ml-2">{detailCar?.SoGheToiDa} passenger(s)</span>
            </span>
            <span className="ml-3">
              <FontAwesomeIcon icon={faBagShopping} />
              <span className="ml-2">
                {detailCar?.SoHanhLyToiDa} baggage(s)
              </span>
            </span>
          </div>
          <div className="w-full text-right font-bold cursor-pointer">
            <span onClick={handleClick} className="ml-3 text-blue-500">
              <FontAwesomeIcon icon={show ? faCaretUp : faCaretDown} />
              <span className="ml-1"> Car Detail</span>
            </span>
          </div>
          {show && (
            <div className="mt-2">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-green-400">
                    <th className="border px-4 py-2">Tên hãng xe</th>
                    <th className="border px-4 py-2">Tên chủ sở hữu</th>
                    <th className="border px-4 py-2">Biển số xe</th>
                    <th className="border px-4 py-2">Số hành lý tối đa</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="text-black">
                    <td className="border px-4 py-2">{detailCar?.TenHangXe}</td>
                    <td className="border px-4 py-2">
                      {detailCar?.TenChuSoHuu}
                    </td>
                    <td className="border px-4 py-2">{detailCar?.BienSoXe}</td>
                    <td className="border px-4 py-2">
                      {detailCar?.SoHanhLyToiDa}
                    </td>
                  </tr>
                </tbody>
                <thead>
                  <tr className="bg-green-400">
                    <th className="border px-4 py-2">Công ty</th>
                    <th className="border px-4 py-2">Số ghế tối đa</th>
                    <th className="border px-4 py-2">Số tiền/km</th>
                    <th className="border px-4 py-2">Mã Sân Bay</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="text-black">
                    <td className="border px-4 py-2">{detailCar?.CongTy}</td>
                    <td className="border px-4 py-2">
                      {detailCar?.SoGheToiDa}
                    </td>
                    <td className="border px-4 py-2">
                      {detailCar?.SoTien_1km}
                    </td>
                    <td className="border px-4 py-2">{detailCar?.MaSB}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}
        </div>
        <div className="mt-2 bg-slate-100 p-4">
          <label className="font-bold">
            <span className="text-blue-500">○</span> Điểm sân bay
          </label>
          <div className="grid grid-cols-2 pl-4 ml-[5.3px] border-l-4">
            <div className="p-2">
              <label className="font-bold">Sân bay</label>
              <p className="border mt-2 mb-4 text-slate-500 border-gray-500 bg-slate-50 rounded-md p-2">
                <FontAwesomeIcon icon={faPlaneArrival} />
                <span className="ml-2">{detailBookingCar[0]?.DiemSanBay}</span>
              </p>
              <label className="font-bold">Lịch đi</label>
              <p className="border mt-2 mb-4 text-slate-500 border-gray-500 bg-slate-50 rounded-md p-2">
                <FontAwesomeIcon icon={faCalendarDays} />
                <span className="ml-2">{detailBookingCar[0]?.NgayGioDat}</span>
              </p>
              <label className="font-bold">Nhập lịch muốn đổi</label>
              <input
                type="datetime-local"
                min={today}
                className="border mt-2 text-slate-500 border-gray-500 bg-slate-50 rounded-md p-2 w-full"
                value={newNgayGioDat}
                onChange={(e) => setNewNgayGioDat(e.target.value)}
              />
            </div>

            <div className="p-2">
              <label className="font-bold">Mô tả cho tài xế</label>
              <input
                className="border mt-2 mb-4 outline-none text-slate-500 border-gray-500 bg-slate-50 rounded-md p-2 w-full"
                type="text"
                placeholder="Nhập mô tả"
                name="Description"
                value={detailBookingCar[0]?.Description}
                disabled
              />
              <label className="font-bold">Số điện thoại</label>
              <input
                className="border mt-2 mb-4 outline-none text-slate-500 border-gray-500 bg-slate-50 rounded-md p-2 w-full"
                type="text"
                placeholder="Nhập số điện thoại liên hệ"
                value={detailBookingCar[0]?.Sdt}
                name="Sdt"
                disabled
              />
            </div>
          </div>
          <label className="font-bold">
            <span className="text-blue-500">●</span> Điểm đón-trả
          </label>
          <div className="p-2 pl-8">
            <p className="border mt-2 mb-4 text-slate-500 border-gray-500 bg-slate-50 rounded-md p-2">
              <FontAwesomeIcon icon={faPlaneArrival} />
              <span className="ml-2">{detailBookingCar[0]?.DiemDon_Tra}</span>
            </p>
          </div>
        </div>

        <div className="absolute bottom-0 bg-white p-4 w-full rounded-md">
          <div className="flex justify-between float-left">
            <div className="text-center flex items-center">
              <span
                className={`${
                  detailBookingCar[0]?.Trangthai
                    ? "text-gray-300 font-bold"
                    : "text-red-600 font-bold"
                },px-4`}
              >
                Chưa thanh toán
              </span>
              <span
                style={{ marginLeft: "10px" }}
                className={
                  detailBookingCar[0]?.Trangthai
                    ? "text-gray-300"
                    : "text-red-600"
                }
              >
                ●
              </span>
              <span
                className={`inline-block border-t-4 ${
                  detailBookingCar[0]?.Trangthai
                    ? "border-gray-400"
                    : "border-red-600"
                } w-20 ml-1`}
              ></span>
              <span
                className={
                  detailBookingCar[0]?.Trangthai
                    ? "text-blue-500"
                    : "text-red-500"
                }
              >
                ●
              </span>
              <span
                className={`inline-block border-t-4 ${
                  detailBookingCar[0]?.Trangthai
                    ? "border-blue-500"
                    : "border-gray-400"
                } w-20 mr-1`}
              ></span>
              <span
                className={`${
                  detailBookingCar[0]?.Trangthai
                    ? "text-blue-500 "
                    : "text-gray-300"
                }`}
              >
                ●
              </span>
              <span
                style={{ marginLeft: "10px" }}
                className={
                  detailBookingCar[0]?.Trangthai
                    ? "text-blue-500 font-bold"
                    : "text-gray-300 font-bold"
                }
              >
                Đã thanh toán
              </span>
            </div>
          </div>
          <div className="flex float-right">
            <div className="w-fit">
              <p className="text-gray-500 text-sm text-right">Tổng tiền xe</p>
              <span className="text-lg text-orange-400">
                {formatPrice(detailBookingCar[0]?.ThanhTien)} VND
              </span>
            </div>
            <button
              onClick={handleCancel}
              className={`bg-orange-500 ml-4 w-fit text-white font-bold rounded-lg p-2 ${
                detailCar[0]?.TrangThai ? "hidden" : "block"
              }`}
            >
              Hủy vé
            </button>

            <button
              onClick={handleChangeBooking}
              className={`bg-orange-500 ml-4 w-fit text-white font-bold rounded-lg p-2 ${
                detailCar[0]?.TrangThai ? "hidden" : "block"
              }`}
            >
              Đổi lịch
            </button>
            <button
              onClick={() => navigate("/RatingCar")}
              className={`bg-orange-500 ml-4 w-fit text-white font-bold rounded-lg p-2 ${
                detailCar[0]?.TrangThai ? "hidden" : "block"
              }`}
            >
              Đánh giá
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CancelTicket;
