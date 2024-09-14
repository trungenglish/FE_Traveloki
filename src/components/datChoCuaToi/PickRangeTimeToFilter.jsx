import { useState, useEffect } from 'react';
import DatePicker from "react-datepicker";
import icCalender from "../../assets/iconCalender.png";
import "react-datepicker/dist/react-datepicker.css";
function PickRangeTimeToFilter() {
    const [showModal, setShowModal] = useState(false);

    const [selectedDate, setSelectedDate] = useState(null);
    return ( 
        <>
            <a onClick={() => setShowModal(true)}>
                <div className="w-[172px] shadow bg-[#EDEDED] rounded-lg">
                    <div className="flex justify-center items-center px-4 py-2">
                        <div className="font-semibold text-lg">
                            Ngày tùy chọn
                        </div>
                    </div>
                </div>
            </a>
            {showModal ? (
                <>
                    <div className="absolute w-[480px] my-6 mx-auto max-w-3xl">
                        <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                            <div className="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t ">
                                <h3 className="text-black text-lg font-semibold">Hiển thị những loại giao dịch này...</h3>
                                <button
                                    className="bg-transparent border-0 text-black float-right"
                                    onClick={() => setShowModal(false)}
                                >
                                    <span className="text-black opacity-7 h-6 w-6 text-xl block bg-gray-400 py-0 rounded-full">
                                        x
                                    </span>
                                </button>
                            </div>
                            <div className="text-slate-500 text-lg font-semibold p-5">Chọn ngày đã đặt</div>
                            {/* <div className="px-6 py-2 inline-flex">
                                
                            </div> */}
                            <div className="flex flex-col items-start py-2 relative">
                                <label className="text-white flex items-center space-x-2">
                                    <span>Ngày đón</span>
                                </label>
                                <div
                                    className="flex items-center bg-white shadow  mt-3"
                                >
                                    <img src={icCalender} alt="icon-flight" className="h-6 w-6 m-3" />
                                    <input type="text" className="bg-transparent outline-none mx-2 w-52" />
                                    <DatePicker
                                        className=""
                                        selected={selectedDate}
                                        onChange={(date) => setSelectedDate(date)}
                                        dateFormat="dd/MM/yyyy"
                                        minDate={new Date()}
                                        showYearDropdown
                                    />
                                </div>
                            </div> 
                        </div>
                    </div>
                </>
            ) : null}
        </>
     );
}

export default PickRangeTimeToFilter;

