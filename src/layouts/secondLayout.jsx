import { Outlet } from "react-router-dom";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
const MainLayout = () => {
  return (
    <div className="bg-[#F2F3F3]">
      <div className="w-full">
        <Header />
        <div className="w-full h-screen bg-opacity-20 flex justify-center bg-slate-400">
          <div className="w-3/4 h-[65%]  min-h-fit relative translate-y-1/4 bg-white rounded-md">
            <Outlet />
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default MainLayout;
