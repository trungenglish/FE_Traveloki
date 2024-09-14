import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { differenceInMinutes, isSameDay } from "date-fns";
import {
  faUser,
  faBagShopping,
  faPlaneArrival,
  faCalendarDays,
} from "@fortawesome/free-solid-svg-icons";

const CancelTicketTrain = () => {
  const url = "https://cnpm-api-thanh-3cf82c42b226.herokuapp.com/api";
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const MaDX = searchParams.get("MaDX");
  const today = new Date().toISOString().slice(0, 16);
  const [detailBookingTrain, setDetailBookingTrain] = useState(null);
  const [detailTrain, setDetailTrain] = useState({});
  const [show, setShow] = useState(false);
  const [phuongtien, setPhuongTien] = useState(null);
  const [tram, setTram] = useState(null);
  const [bookingId, setBookingId] = useState(null);
  const [newNgayGioDat, setNewNgayGioDat] = useState("");

  useEffect(() => {
    const getDatXeMaDX = async () => {
      try {
        const res = await axios.get(`${url}/FindBuyTicketTrainMaDX/${MaDX}`);
        const buyTicketTrain = res.data.buyTicketTrain;
        setDetailBookingTrain(buyTicketTrain);

        const id = buyTicketTrain._id;
        setBookingId(id);
        const MaDetailCar = buyTicketTrain.MaPT;
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

    const getDetailCar = async (MaDetailCar) => {
      try {
        const res = await axios.get(`${url}/GetPhuongTienID/${MaDetailCar}`);
        setDetailTrain(res.data);
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

  const fetchPhuongTien = async () => {
    try {
      const res = await fetch(
        `${url}/GetPhuongTienID/${detailBookingTrain?.MaPT}`
      );
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      const result = await res.json();
      setPhuongTien(result.phuongTien);
    } catch (error) {
      console.error("Không thể lấy dữ liệu từ máy chủ phuongtien: ", error);
    }
  };

  const fetchTram = async () => {
    try {
      const res = await fetch(
        `${url}/GetTramDungID/${detailBookingTrain?.MaTram}`
      );
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      const result = await res.json();
      setTram(result);
    } catch (error) {
      console.error("Không thể lấy dữ liệu từ máy chủ tram: ", error);
    }
  };

  useEffect(() => {
    if (detailBookingTrain?.MaPT) {
      fetchPhuongTien();
    }
  }, [detailBookingTrain?.MaPT]);

  useEffect(() => {
    if (detailBookingTrain?.MaTram) {
      fetchTram();
    }
  }, [detailBookingTrain?.MaTram]);

  const handleClick = () => {
    setShow((prevShow) => !prevShow);
  };

  const canCancelTicket = () => {
    const currentTime = new Date();
    const bookingTime = new Date(detailBookingTrain?.NgayGioDat);
    const minutesDifference = differenceInMinutes(currentTime, bookingTime);
    if (isSameDay(currentTime, bookingTime) && minutesDifference < 60) {
      return false;
    }
    return true;
  };

  const canChangeBooking = () => {
    const currentTime = new Date();
    const bookingTime = new Date(detailBookingTrain?.NgayGioDat);
    const minutesDifference = differenceInMinutes(currentTime, bookingTime);
    if (isSameDay(currentTime, bookingTime) && minutesDifference < 120) {
      return false;
    }
    return true;
  };

  const formatDate = (dateString) => {
    const dateObject = new Date(dateString);
    const day = String(dateObject.getDate()).padStart(2, "0");
    const month = String(dateObject.getMonth() + 1).padStart(2, "0");
    const year = dateObject.getFullYear();
    const hours = String(dateObject.getHours()).padStart(2, "0");
    const minutes = String(dateObject.getMinutes()).padStart(2, "0");
    const seconds = String(dateObject.getSeconds()).padStart(2, "0");
    return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
  };

  const handleCancel = async () => {
    if (!canCancelTicket()) {
      alert("Không thể hủy vé vì thời gian chuẩn bị đi còn ít hơn 1 tiếng.");
    } else {
      try {
        const refundResponse = await axios.post(
          "https://api.htilssu.com/api/v1/refund",
          {
            orderId: detailBookingTrain?._id,
          },
          {
            headers: {
              "X-Api":
                "ffce137ec01c33b8dc4884b036acbdbaa7b5e951ab6ba5f29f3876815ac265da",
            },
          }
        );

        if (refundResponse.status === 200) {
          const cancelResponse = await axios.delete(
            `${url}/CancelTicketTrain/${MaDX}`
          );

          if (cancelResponse.status === 200 || cancelResponse.status === 201) {
            alert("Hủy vé thành công.");
            navigate("/my-booking");
          } else {
            alert("Có lỗi xảy ra khi hủy vé đặt xe.");
          }
        } else {
          alert("Có lỗi xảy ra khi xử lý hoàn tiền.");
        }
      } catch (error) {
        console.error("Error processing refund or cancelling ticket: ", error);
        alert("Có lỗi xảy ra khi xử lý hoàn tiền.");
      }
    }
  };

  const handleChangeBooking = async () => {
    if (!newNgayGioDat) {
      alert("Vui lòng chọn ngày giờ muốn đổi.");
    } else {
      if (!canChangeBooking()) {
        alert(
          "Không thể đổi lịch vì thời gian chuẩn bị đi còn ít hơn 2 tiếng."
        );
      } else {
        try {
          const response = await axios.put(
            `${url}"BuyTicketTrain/SchedularChange/${bookingId}`,
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
      <div className="w-full h-full pb-28 overflow-y-auto">
        <div className="bg-white rounded-md py-4 w-full top-0 absolute font-bold text-xl">
          <span className="font-extrabold text-green-500 px-4">
            {detailBookingTrain?.DiemDon}
          </span>
          -
          <span className="font-extrabold text-green-500 px-4">
            {detailBookingTrain?.DiemTra}
          </span>
          <p className="pl-4 text-xl">Công ty: {phuongtien?.TenCty}</p>
        </div>
        <div className="mt-14 bg-slate-100 p-4">
          <label className="font-bold">
            <span className="text-blue-500">○</span> Điểm sân bay
          </label>
          <div className="grid grid-cols-2 pl-4 ml-[5.3px] border-l-4">
            <div className="p-2">
              <label className="font-bold">Sân bay</label>
              <p className="border mt-2 mb-4 text-slate-500 border-gray-500 bg-slate-50 rounded-md p-2">
                <FontAwesomeIcon icon={faPlaneArrival} />
                <span className="ml-2">{detailBookingTrain?.DiemDon}</span>
              </p>
              <label className="font-bold">Lịch đi</label>
              <p className="border mt-2 mb-4 text-slate-500 border-gray-500 bg-slate-50 rounded-md p-2">
                <FontAwesomeIcon icon={faCalendarDays} />
                <span className="ml-2">
                  {formatDate(detailBookingTrain?.NgayGioKhoiHanh)}
                </span>
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
              <label className="font-bold">Tên xe </label>
              <p className="border mt-2 text-slate-500 border-gray-500 bg-slate-50 rounded-md p-2">
                <FontAwesomeIcon icon={faCalendarDays} />
                <span className="ml-2">{phuongtien?.TenPhuongTien}</span>
              </p>
              <div className=" mt-4 ">
                <label className="font-bold">Số lượng vé người lớn </label>
                <div className="grid border border-slate-300 bg-white rounded-md mt-2 ">
                  <span className="text-slate-500 p-2 h-full ">
                    {detailBookingTrain?.SLVeNguoiLon} vé
                  </span>{" "}
                </div>
              </div>
              <div className=" mt-4 ">
                <label className="font-bold">Số lượng vé người lớn </label>
                <div className="grid border border-slate-300 bg-white rounded-md mt-2 ">
                  <span className="text-slate-500 p-2 h-full ">
                    {detailBookingTrain?.SLVeTreEm} vé
                  </span>{" "}
                </div>
              </div>
            </div>
          </div>
          <label className="font-bold">
            <span className="text-blue-500">●</span> Điểm đón-trả
          </label>
          <div className="p-2 pl-8">
            <p className="border mt-2 mb-4 text-slate-500 border-gray-500 bg-slate-50 rounded-md p-2">
              <FontAwesomeIcon icon={faPlaneArrival} />
              <span className="ml-2">{detailBookingTrain?.DiemTra}</span>
            </p>
          </div>
        </div>
        <div className="absolute bottom-0 bg-white p-4 w-full rounded-md">
          <div className="flex justify-between float-left">
            <div className="text-center flex items-center">
              <span
                className={`${
                  detailBookingTrain?.TrangThai
                    ? "text-gray-300 font-bold"
                    : "text-red-600 font-bold"
                },px-4`}
              >
                Chưa thanh toán
              </span>
              <span
                style={{ marginLeft: "10px" }}
                className={
                  detailBookingTrain?.TrangThai
                    ? "text-gray-300"
                    : "text-red-600"
                }
              >
                ●
              </span>
              <span
                className={`inline-block border-t-4 ${
                  detailBookingTrain?.TrangThai
                    ? "border-gray-400"
                    : "border-red-600"
                } w-20 ml-1`}
              ></span>
              <span
                className={
                  detailBookingTrain?.TrangThai
                    ? "text-blue-500"
                    : "text-red-500"
                }
              >
                ●
              </span>
              <span
                className={`inline-block border-t-4 ${
                  detailBookingTrain?.TrangThai
                    ? "border-blue-500"
                    : "border-gray-400"
                } w-20 mr-1`}
              ></span>
              <span
                className={`${
                  detailBookingTrain?.TrangThai
                    ? "text-blue-500 "
                    : "text-gray-300"
                }`}
              >
                ●
              </span>
              <span
                style={{ marginLeft: "10px" }}
                className={
                  detailBookingTrain?.TrangThai
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
                {formatPrice(detailBookingTrain?.ThanhTien)} VND
              </span>
            </div>
            <button
              onClick={handleCancel}
              className={`bg-orange-500 ml-4 w-fit text-white font-bold rounded-lg p-2 ${
                detailBookingTrain?.TrangThai ? "block" : "hidden"
              }`}
            >
              Hủy vé
            </button>
            <button
              onClick={handleChangeBooking}
              className={`bg-orange-500 ml-4 w-fit text-white font-bold rounded-lg p-2 ${
                detailBookingTrain?.TrangThai ? "block" : "hidden"
              }`}
            >
              Đổi lịch
            </button>
            <button
              onClick={() => navigate("/RatingCar")}
              className={`bg-orange-500 ml-4 w-fit text-white font-bold rounded-lg p-2 ${
                detailBookingTrain?.TrangThai ? "block" : "hidden"
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

export default CancelTicketTrain;
