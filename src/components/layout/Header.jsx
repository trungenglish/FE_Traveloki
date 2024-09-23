import bird from "../../assets/bird-removebg-preview.png";
import icVN from "../../assets/iconVN.png";
import icPercent from "../../assets/iconPercent.png";
import backgroundImage from "../../assets/introPic.png";
import { Link } from "react-router-dom";
import {useContext, useState} from "react";
import LoginModal from "../../pages/Auth/login.modal.jsx";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faUser} from "@fortawesome/free-solid-svg-icons";
import {AuthContext} from "../context/auth.context.jsx";

const Header = () => {
  const [isOpenLogin, setIsOpenLogin] = useState(false)
    const {auth, setAuth} = useContext(AuthContext);

  return (
      <>
        <div className="flex justify-center container w-full mb-20">
          <header
              className="fixed top-0 flex left-0 z-50 w-full text-white py-2 border-b border-gray-200"
              style={{
                backgroundImage: `url(${backgroundImage})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
          >
            <div className="container max-w-screen-xl translate-x-1/4 flex  items-center">
              <Link to="/HomePage" className="flex">
                <span className="text-2xl font-bold mt-5">Traveloke</span>
                <img src={bird} alt="Traveloki Logo" className="h-16 w-16"/>
              </Link>
              <div className="flex items-center">
                <nav className="hidden md:flex space-x-8">
                  <a
                      href="#"
                      className="hover:text-gray-300 flex items-center space-x-2"
                  >
                    <img src={icVN} alt="Vietnam Flag"/>
                    <span>VI | VND</span>
                  </a>
                  <a
                      href="#"
                      className="hover:text-gray-300  flex items-center mr-10"
                  >
                    Hỗ trợ
                  </a>
                  <a href="#" className="hover:text-gray-300  flex items-center">
                    Hợp tác với chúng tôi
                  </a>
                  <a
                      href="/my-booking"
                      className="hover:text-gray-300  flex items-center"
                  >
                    Đặt chỗ của tôi
                  </a>
                  <a
                      href="#"
                      className="hover:text-gray-300 flex items-center space-x-2"
                  >
                    <img src={icPercent} alt="icon Percent"/>
                    <span>Khuyến mãi</span>
                  </a>
                  <div
                      onClick={() => {
                        setIsOpenLogin(true)
                      }}
                      className="hover:text-gray-300 flex items-center space-x-2 border border-white rounded-md p-1 cursor-pointer"
                  >
                    <FontAwesomeIcon icon={faUser}/>
                    <span>Đăng nhập</span>
                  </div>
                </nav>
              </div>
            </div>
          </header>
        </div>
        <LoginModal
            isOpenLogin={isOpenLogin}
            setIsOpenLogin={setIsOpenLogin}
        />
      </>
  )
      ;
};

export default Header;
