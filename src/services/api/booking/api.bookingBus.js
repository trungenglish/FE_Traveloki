import axios from '../../axios.customize';

const bookingBusAPI = (data) => {
    const URL_BACKEND = `/BookingBus`;
    return axios.post(URL_BACKEND, data)
}

export {
    bookingBusAPI
}