import { Outlet, useLocation } from "react-router-dom";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
const MainLayout = () => {
  const location = useLocation();
  const isBookingCar = location.pathname === "/BookingCar";
  const isBookingBus = location.pathname === "/BookingBus";
  const isBookingTrain = location.pathname === "/BookingTrain";
  const isBookingPage = isBookingCar || isBookingBus || isBookingTrain;

  return (
    <div className="bg-[#F2F3F3]">
      {isBookingPage ? (
        <div className="w-full">
          <Header />
          <div className="w-full h-screen bg-opacity-20 flex justify-center bg-slate-400">
            <div className="w-3/4 h-[65%]  min-h-fit relative translate-y-1/4 bg-white rounded-md">
              <Outlet />
            </div>
          </div>
          <Footer />
        </div>
      ) : (
        <>
          <Header />
          <Outlet />
          <Footer />
        </>
      )}
    </div>
  );
};

export default MainLayout;
