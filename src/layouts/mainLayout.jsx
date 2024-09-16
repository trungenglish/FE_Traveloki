import { Outlet } from "react-router-dom";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
const MainLayout = () => {
  return (
    <div className="bg-[#F2F3F3]">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};

export default MainLayout;
