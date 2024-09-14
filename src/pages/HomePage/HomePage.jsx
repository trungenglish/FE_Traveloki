import guide1 from "../../assets/guide1.png";
import guide2 from "../../assets/guide2.png";
import guide3 from "../../assets/guide3.png";
import guide4 from "../../assets/guide4.png";
import guide5 from "../../assets/guide5.png";
import guide6 from "../../assets/guide6.png";
import guard from "../../assets/Guard.png";
import vali from "../../assets/Vali.png";
import task from "../../assets/Task.png";
import bgMain from "../../assets/bgMain.png";
import buoc1 from "../../assets/Buoc1.png";
import buoc2 from "../../assets/Buoc2.png";
import buoc3 from "../../assets/Buoc3.png";
import buoc4 from "../../assets/Buoc4.png";
import buoc5 from "../../assets/Buoc5.png";
import buoc6 from "../../assets/Buoc6.png";
import SearchBar from "../../components/search/Search";

const HomePage = () => {
  const reasons = [
    {
      icon: <img className="h-20 w-52" src={vali} alt="Vali"></img>, // Thay thế bằng icon thích hợp
      title: "Đáp ứng mọi nhu cầu của bạn",
      description:
        "Từ chuyến bay, lưu trú, đến điểm tham quan, bạn có thể tìm chọn sản phẩm hoàn chỉnh và Hướng Dẫn Du Lịch của chúng tôi.",
    },
    {
      icon: <img className="h-20 w-52" src={task} alt="Task"></img>, // Thay thế bằng icon thích hợp
      title: "Đáp ứng mọi nhu cầu của bạn",
      description:
        "Từ chuyến bay, lưu trú, đến điểm tham quan, bạn có thể tìm chọn sản phẩm hoàn chỉnh và Hướng Dẫn Du Lịch của chúng tôi.",
    },
    {
      icon: <img className="h-20 w-52" src={guard} alt="Guard"></img>, // Thay thế bằng icon thích hợp
      title: "Đáp ứng mọi nhu cầu của bạn",
      description:
        "Từ chuyến bay, lưu trú, đến điểm tham quan, bạn có thể tìm chọn sản phẩm hoàn chỉnh và Hướng Dẫn Du Lịch của chúng tôi.",
    },
  ];

  return (
    <div>
      <SearchBar />
      <section
        className=" py-12 bg-white -mt-14 rounded-tl-3xl rounded-tr-3xl"
        style={{ backgroundImage: `url(${bgMain})`, backgroundSize: "cover" }}
      >
        <div className="container max-w-screen-xl mx-auto text-center">
          <h2 className="text-2xl font-semibold mb-8">
            Lý do nên đặt chỗ với Traveloki - Dịch vụ đưa đón sân bay
          </h2>
          <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-4">
            {reasons.map((reason, index) => (
              <div
                key={index}
                className="flex items-start bg-white shadow-lg rounded-lg p-6 max-w-xl"
              >
                <div className="h-auto pt-8 pr-4  ">{reason.icon}</div>

                <div className="text-left">
                  <h3 className="text-lg font-medium mb-2">{reason.title}</h3>
                  <p className="text-sm text-gray-600">{reason.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="container m-auto max-w-4xl mt-20">
          <h1 className="text-3xl font-bold text-center my-8">Cách đặt chỗ</h1>
        </div>
        {/* Bước 1 */}
        <div className=" grid grid-cols-2 container m-auto max-w-4xl mt-20">
          <div className="flex justify-center items-center">
            <div className="">
              <img className="w-3/4" src={guide1} alt="Guide1"></img>
            </div>
          </div>
          <div className="flex items-center text-left">
            <img className="ml-10" src={buoc1} alt="Buoc1"></img>
            <div className="ml-10">
              <h3 className="text-xl font-semibold mb-2">Tìm xe</h3>
              <p>
                Bắt đầu tìm kiếm bằng cách chọn điểm xuất phát và điểm đến (một
                trong hai phải là sân bay), điền thông tin ngày giờ đón cũng như
                số hành khách.
              </p>
            </div>
          </div>
        </div>
        {/* line */}
        <div className="container  m-auto max-w-xl">
          <div className="border-l h-10 border-dashed border-gray-400 "></div>
          <div className="border-t border-dashed border-gray-400"></div>
          <div className="border-r h-10 border-dashed border-gray-400 "></div>
        </div>
        {/* Bước 2 */}
        <div className=" grid grid-cols-2 container m-auto max-w-4xl">
          <div className="flex items-center text-left">
            <img className="ml-10" src={buoc2} alt="Buoc2"></img>
            <div className="ml-10">
              <h3 className="text-xl font-semibold mb-2">Chọn xe</h3>
              <p>
                Chọn xe phù hợp nhất với nhu cầu của bạn từ trang kết quả tìm
                kiếm, bao gồm xe thuê riêng và phương tiện công cộng.
              </p>
            </div>
          </div>
          <div className="flex justify-center items-center">
            <div className="pl-32">
              <img className="w-3/4" src={guide2} alt="Guide1"></img>
            </div>
          </div>
        </div>
        {/* line */}
        <div className="container m-auto max-w-xl">
          <div className="border-r h-10 border-dashed border-gray-400 "></div>
          <div className="border-t border-dashed border-gray-400"></div>
          <div className="border-l h-10 border-dashed border-gray-400 "></div>
        </div>
        {/* Bước 3 */}
        <div className=" grid grid-cols-2 container m-auto max-w-4xl">
          <div className="flex justify-center items-center">
            <div className="">
              <img className="w-3/4" src={guide3} alt="Guide1"></img>
            </div>
          </div>
          <div className="flex items-center text-left">
            <img className="ml-10" src={buoc3} alt="Buoc1"></img>
            <div className="ml-10">
              <h3 className="text-xl font-semibold mb-2">Xem thông tin xe</h3>
              <p>
                Kiểm tra thông tin xe, địa điểm đón và xuống xe. Lưu ý cung cấp
                thông tin chuyến bay nếu được yêu cầu.
              </p>
            </div>
          </div>
        </div>
        {/* line */}
        <div className="container m-auto max-w-xl">
          <div className="border-l h-10 border-dashed border-gray-400 "></div>
          <div className="border-t border-dashed border-gray-400"></div>
          <div className="border-r h-10 border-dashed border-gray-400 "></div>
        </div>
        {/* Bước 4 */}
        <div className=" grid grid-cols-2 container m-auto max-w-4xl">
          <div className="flex items-center text-left">
            <img className="ml-10" src={buoc4} alt="Buoc4"></img>
            <div className="ml-10">
              <h3 className="text-xl font-semibold mb-2">
                Điền biểu mẫu đặt chỗ
              </h3>
              <p>
                Điền thông tin liên hệ và thông tin hành khách. Đảm bảo thông
                tin chính xác để tránh rắc rối về sau trên hành trình của bạn.
              </p>
            </div>
          </div>
          <div className="flex justify-center items-center">
            <div className="">
              <img className="w-3/4" src={guide4} alt="Guide4"></img>
            </div>
          </div>
        </div>
        {/* line */}
        <div className="container m-auto max-w-xl">
          <div className="border-r h-10 border-dashed border-gray-400 "></div>
          <div className="border-t border-dashed border-gray-400"></div>
          <div className="border-l h-10 border-dashed border-gray-400 "></div>
        </div>
        {/* Bước 5 */}
        <div className=" grid grid-cols-2 container m-auto max-w-4xl">
          <div className="flex justify-center items-center">
            <div className="">
              <img className="w-3/4" src={guide5} alt="Guide5"></img>
            </div>
          </div>
          <div className="flex items-center text-left">
            <img className="ml-10" src={buoc5} alt="Buoc5"></img>
            <div className="ml-10">
              <h3 className="text-xl font-semibold mb-2">
                Hoàn tất thanh toán
              </h3>
              <p>
                Kiểm tra lại thông tin đặt chỗ trước khi tiếp tục thanh toán.
                Chọn phương thức thanh toán yêu thích và hoàn tất đặt chỗ.
              </p>
            </div>
          </div>
        </div>
        {/* line */}
        <div className="container m-auto max-w-xl">
          <div className="border-l h-10 border-dashed border-gray-400 "></div>
          <div className="border-t border-dashed border-gray-400"></div>
          <div className="border-r h-10 border-dashed border-gray-400 "></div>
        </div>
        {/* Bước 6 */}
        <div className=" grid grid-cols-2 container m-auto max-w-4xl">
          <div className="flex items-center text-left">
            <img className="ml-10" src={buoc6} alt="Buoc6"></img>
            <div className="ml-10">
              <h3 className="text-xl font-semibold mb-2">
                Nhận phiếu thanh toán
              </h3>
              <p>
                Khi thanh toán đã được xác thực, phiếu thanh toán đưa đón sân
                bay của bạn sẽ được gửi đến ứng dụng Traveloka hoặc email.
              </p>
            </div>
          </div>
          <div className="flex justify-center items-center">
            <div className="">
              <img className="w-3/4" src={guide6} alt="Guide6"></img>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
export default HomePage;
