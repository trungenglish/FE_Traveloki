import { useState} from 'react';
// import axios from 'axios';
import FilterIcon from '../../assets/Bo-loc.svg'
import CarIcon from '../../assets/car-7056617.svg'
import BusIcon from '../../assets/bus-7190.svg'
import TrainIcon from '../../assets/train-7037789.svg'

// const API_BASE_URL = "https://cnpm-api-thanh-3cf82c42b226.herokuapp.com";
function ModalFilter(checkedItems, handleChange) {
    const [showModal, setShowModal] = useState(false);
    // Mặc định hiển thị cả 3
    // const [checkedItems, setCheckedItems] = useState({
    //     car: true,
    //     bus: true,
    //     train: true,
    //   });
    // const [data, setData] = useState([]);

    // const handleChange = (event) => {
    //     const { name, checked } = event.target;
    //     setCheckedItems({
    //       ...checkedItems,
    //       [name]: checked,
    //     });
    // };

    // // Tương tự ListBooking
    // useEffect(() => {
    //     const fetchVehicle = async () => {
    //         try {
    //             let results = [];
    //             if (checkedItems.car) {
    //                 const carResponse = await axios.get(`${API_BASE_URL}/api/GetLichSuDatXeOto`);
    //                 results = results.concat(carResponse.data);
    //             }
    //             if (checkedItems.bus) {
    //                 const busResponse = await axios.get(`${API_BASE_URL}/api/GetHistoryBus`);
    //                 results = results.concat(busResponse.data);
    //             }
    //             if (checkedItems.train) {
    //                 const trainResponse = await axios.get(`${API_BASE_URL}/api/GetLichSuDatTau`);
    //                 results = results.concat(trainResponse.data);
    //             }
    //             setData(results.data.lichSuDatXe);
    //         } catch (error) {
    //             console.error(
    //                 "Request failed with status code",
    //                 error.response?.status
    //             );
    //         }
    //     };
    //     fetchVehicle();
    // }, [checkedItems]);
    return ( 
        <>
            <a onClick={() => setShowModal(true)}>  
                <div className="w-[140px] shadow bg-[#EDEDED] rounded-lg">
                    <div className="inline-flex justify-center items-center pl-4 pt-2">
                        <div className="mr-4">
                            <img src={FilterIcon} alt="Avatar" className='w-[32px] h-[32px] rounded-full' />
                        </div>
                        <div className="font-semibold text-lg">Bộ lọc</div>
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
                            <div className="text-slate-500 text-lg font-semibold p-5">Loại sản phẩm</div>
                            <div className="relative px-6 py-2 inline-flex">
                                <div className="w-[50%] grid">
                                    <div className="inline-flex justify-between">
                                        <div className="inline-flex">
                                            <div className="">
                                                <input 
                                                type="checkbox"
                                                name="car" 
                                                checked={checkedItems.car}
                                                onChange={handleChange}
                                                className="form-checkbox h-5 w-5 text-blue-600"/>
                                            </div>
                                            <div className="ml-2">Xe hơi</div>
                                        </div>
                                        <div className="">
                                            <img src={CarIcon} alt="Avatar" className='w-[32px] h-[32px]' />
                                        </div>
                                    </div>

                                    <div className="inline-flex justify-between">
                                        <div className="inline-flex">
                                            <div className="">
                                                <input 
                                                type="checkbox"
                                                name="train" 
                                                checked={checkedItems.train}
                                                onChange={handleChange}
                                                className="form-checkbox h-5 w-5 text-blue-600"/>
                                            </div>
                                            <div className="ml-2">Tàu</div>
                                        </div>
                                        <div className="">
                                            <img src={TrainIcon} alt="Avatar" className='w-[32px] h-[32px]' />
                                        </div>
                                    </div>
                                </div>
                                <div className="w-[50%] grid">
                                    <div className="inline-flex justify-between">
                                        <div className="inline-flex">
                                            <div className="">
                                                <input 
                                                type="checkbox" 
                                                name="bus" 
                                                checked={checkedItems.bus}
                                                onChange={handleChange}
                                                className="form-checkbox h-5 w-5 text-blue-600" />
                                            </div>
                                            <div className="ml-2">Xe buýt</div>
                                        </div>
                                        <div className="">
                                            <img src={BusIcon} alt="Avatar" className='w-[32px] h-[32px]' />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            ) : null}
        </>
     );
}

export default ModalFilter;