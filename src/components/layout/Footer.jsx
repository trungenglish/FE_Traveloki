import bird from "../../assets/bird-removebg-preview.png";
import bannerTopFooter from "../../assets/topFooter.png";
import pay1 from "../../assets/Pay1.png";
import pay2 from "../../assets/Pay2.png";
import pay3 from "../../assets/Pay3.png";
import pay4 from "../../assets/Pay4.png";
import pay5 from "../../assets/Pay5.png";
import pay6 from "../../assets/Pay6.png";
import pay7 from "../../assets/Pay7.png";
import pay8 from "../../assets/Pay8.png";
import btnHopTac from "../../assets/btnHopTac.png";

const Footer = () => {
  return (
    <footer className="bg-white py-10">
      {/* <div>
        <img src={bannerTopFooter} alt="banner" className="w-full" />
      </div> */}
      <div className="flex justify-center w-full">
        <div className="container max-w-screen-xl gtid grid-cols-4 xl:grid-cols-3 sm:grid-cols-2 mx-auto px-4">
          <div className="p-8 flex">
            <span className="text-2xl font-bold mt-5">Traveloke</span>
            <img src={bird} alt="Traveloki Logo" className="h-16 w-16" />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-gray-800 font-semibold mb-4">Về Traveloki</h3>
              <ul className="text-gray-600">
                <li className="py-1">
                  <a href="#" className="hover:text-gray-800">
                    Cách đặt chỗ
                  </a>
                </li>
                <li className="py-1">
                  <a href="#" className="hover:text-gray-800">
                    Liên hệ với chúng tôi
                  </a>
                </li>
                <li className="py-1">
                  <a href="#" className="hover:text-gray-800">
                    Trợ giúp
                  </a>
                </li>
                <li className="py-1">
                  <a href="#" className="hover:text-gray-800">
                    Tuyển dụng
                  </a>
                </li>
                <li className="py-1">
                  <a href="#" className="hover:text-gray-800">
                    Về chúng tôi
                  </a>
                </li>
                <li className="py-1">
                  <a href="#" className="hover:text-gray-800">
                    Tính năng mới ra mắt
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-gray-800 font-semibold mb-4">Sản phẩm</h3>
              <ul className="text-gray-600">
                <li className="py-1">
                  <a href="#" className="hover:text-gray-800">
                    Khách sạn
                  </a>
                </li>
                <li className="py-1">
                  <a href="#" className="hover:text-gray-800">
                    Vé máy bay
                  </a>
                </li>
                <li className="py-1">
                  <a href="#" className="hover:text-gray-800">
                    Vé xe khách
                  </a>
                </li>
                <li className="py-1">
                  <a href="#" className="hover:text-gray-800">
                    Đưa đón sân bay
                  </a>
                </li>
                <li className="py-1">
                  <a href="#" className="hover:text-gray-800">
                    Cho thuê xe
                  </a>
                </li>
                <li className="py-1">
                  <a href="#" className="hover:text-gray-800">
                    Hoạt động & Vui chơi
                  </a>
                </li>
                <li className="py-1">
                  <a href="#" className="hover:text-gray-800">
                    Du thuyền
                  </a>
                </li>
                <li className="py-1">
                  <a href="#" className="hover:text-gray-800">
                    Biệt thự
                  </a>
                </li>
                <li className="py-1">
                  <a href="#" className="hover:text-gray-800">
                    Căn hộ
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-gray-800 font-semibold mb-4">Khác</h3>
              <ul className="text-gray-600">
                <li className="py-1">
                  <a href="#" className="hover:text-gray-800">
                    Traveloki Affiliate
                  </a>
                </li>
                <li className="py-1">
                  <a href="#" className="hover:text-gray-800">
                    Traveloki Blog
                  </a>
                </li>
                <li className="py-1">
                  <a href="#" className="hover:text-gray-800">
                    Chính Sách Quyền Riêng
                  </a>
                </li>
                <li className="py-1">
                  <a href="#" className="hover:text-gray-800">
                    Điều khoản & Điều kiện
                  </a>
                </li>
                <li className="py-1">
                  <a href="#" className="hover:text-gray-800">
                    Quy chế hoạt động
                  </a>
                </li>
                <li className="py-1">
                  <a href="#" className="hover:text-gray-800">
                    Đăng ký nơi nghỉ của bạn
                  </a>
                </li>
                <li className="py-1">
                  <a href="#" className="hover:text-gray-800">
                    Đăng ký doanh nghiệp hoạt động du lịch của bạn
                  </a>
                </li>
                <li className="py-1">
                  <a href="#" className="hover:text-gray-800">
                    Khu vực báo chí
                  </a>
                </li>
                <li className="py-1">
                  <a href="#" className="hover:text-gray-800">
                    Vulnerability Disclosure Program
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-gray-800 font-semibold mb-4">
                Đối tác thanh toán
              </h3>
              <ul className="text-gray-600 w-1/2">
                <li>
                  <div className="flex p-2 w-full">
                    <img src={pay1} alt="Pay1" className="h-8 w-3/4" />
                    <img src={pay2} alt="Pay2" className="h-8 w-3/4" />
                    <img src={pay3} alt="Pay3" className="h-8 w-3/4" />
                  </div>
                </li>
                <li>
                  <div className="flex p-2 w-full">
                    <img src={pay5} alt="Pay1" className="h-8 w-3/4" />
                    <img src={pay6} alt="Pay2" className="h-8 w-3/4" />
                    <img src={pay7} alt="Pay3" className="h-8 w-3/4" />
                  </div>
                </li>
                <li>
                  <div className="flex p-2 w-full">
                    <img src={pay5} alt="Pay1" className="h-8 w-3/4" />
                    <img src={pay6} alt="Pay2" className="h-8 w-3/4" />
                    <img src={pay7} alt="Pay3" className="h-8 w-3/4" />
                  </div>
                </li>
                <li>
                  <div className="flex p-2 w-full">
                    <img src={pay5} alt="Pay1" className="h-8 w-3/4" />
                    <img src={pay6} alt="Pay2" className="h-8 w-3/4" />
                    <img src={pay7} alt="Pay3" className="h-8 w-3/4" />
                  </div>
                </li>
                <li>
                  <div className="flex p-2 w-full">
                    <img src={pay5} alt="Pay1" className="h-8 w-3/4" />
                    <img src={pay6} alt="Pay2" className="h-8 w-3/4" />
                    <img src={pay7} alt="Pay3" className="h-8 w-3/4" />
                  </div>
                </li>
                <li>
                  <div className="flex p-2 w-full">
                    <img src={pay5} alt="Pay1" className="h-8 w-3/4" />
                    <img src={pay6} alt="Pay2" className="h-8 w-3/4" />
                    <img src={pay7} alt="Pay3" className="h-8 w-3/4" />
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <div className="flex items-center justify-between border-b border-gray-200 py-8">
            <div className="flex-1"></div>
            <img src={btnHopTac} alt="btnHopTac" className="h-8" />
          </div>

          <div className="mt-10 flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-600 text-sm">
              <p>© 2024 Traveloke. All rights reserved.</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
