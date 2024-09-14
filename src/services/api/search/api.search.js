import axios from '../../axios.customize';

const suggestsAirportAPI = (query) => {
    const URL_BACKEND = `/SuggestsAirpost?query=${query}`;
    return axios.get(URL_BACKEND)
}

const suggestsTramDungAPI = (query) => {
    const URL_BACKEND = `/SuggestsTramDung?query=${query}`;
    return axios.get(URL_BACKEND)
}

const tramDungByDiaChi = (diemKetThuc) => {
    const URL_BACKEND = `/TramDungByDiaChi?diaChi=${encodeURIComponent(diemKetThuc)}`;
    return axios.get(URL_BACKEND)
}

const getSanBaybyTenSanBay = (diemSanBay) => {
    const URL_BACKEND = `/getSanBaybyTenSanBay?TenSanBay=${encodeURIComponent(diemSanBay)}`
    return axios.get(URL_BACKEND)
}

const getTuyenDiemSanBay = (maSanBay) => {
    const URL_BACKEND = `/TuyenDiemSanBay?diemSanBay=${encodeURIComponent(maSanBay)}`
    return axios.get(URL_BACKEND)
}

export{
    suggestsAirportAPI, suggestsTramDungAPI, tramDungByDiaChi,
    getSanBaybyTenSanBay, getTuyenDiemSanBay
}