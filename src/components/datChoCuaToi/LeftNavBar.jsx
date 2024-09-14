import React, { useContext } from "react";
import Avatar from "../../assets/NiceService.png";
import listIcon from "../../assets/user-booking-ic.svg";
import OnButtonIcon from "../../assets/On_button.svg";
import HistoryBookingIcon from "../../assets/history-booking-ic.svg";
import { UserContext } from "../../Router/UserContext";
import { useNavigate } from "react-router-dom";

function LeftNavBar() {
  const { user, logout } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = (event) => {
    event.preventDefault();
    logout();
    navigate("/login");
  };

  return (
    <div className="w-[40%] mt-10 mr-[24px]">
      <div className="bg-[#EDEDED] border-2 rounded-lg shadow border-slate-400">
        <div className="p-4">
          <div className="">
            <div className="flex items-center px-4 py-2">
              <div className="mr-4">
                <img
                  src={Avatar}
                  alt="Avatar"
                  className="w-[64px] h-[64px] rounded-full"
                />
              </div>
              <div className="w-[60%] text-2xl font-bold">
                <h1>
                  {user ? `${user.firstName} ${user.lastName}` : "Nguyễn Quân"}
                </h1>
              </div>
            </div>
          </div>
          <hr className="my-4 border-t-2 border-slate-400 w-full" />
          <div className="w-full hover:bg-slate-100">
            <div className="inline-flex items-center px-4 py-2">
              <div className="mr-2">
                <img
                  src={listIcon}
                  alt="User Booking"
                  className="w-[32px] h-[32px] rounded-full"
                />
              </div>
              <div
                onClick={() => navigate("/my-booking")}
                className="text-lg font-semibold cursor-pointer"
              >
                Đặt chỗ của tôi
              </div>
            </div>
          </div>
          <a
            href="/my-booking/history-booking"
            onClick={(event) =>
              event.preventDefault() || navigate("/my-booking/history-booking")
            }
          >
            <div className="w-full hover:bg-slate-100">
              <div className="inline-flex items-center px-4 py-2">
                <div className="mr-2">
                  <img
                    src={HistoryBookingIcon}
                    alt="History Booking"
                    className="w-[32px] h-[32px] rounded-full"
                  />
                </div>
                <div className="text-lg font-semibold">Lịch sử đặt chỗ</div>
              </div>
            </div>
          </a>
          <hr className="my-4 border-t-2 border-slate-400 w-full" />
          <div className="w-full hover:bg-slate-100">
            <div className="inline-flex items-center px-4 py-2">
              <div className="mr-2">
                <img
                  src={OnButtonIcon}
                  alt="On"
                  className="w-[32px] h-[32px] rounded-full"
                />
              </div>
              <button className="text-lg font-semibold" onClick={handleLogout}>
                Đăng xuất
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LeftNavBar;
