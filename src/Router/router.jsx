// router.js
import { createBrowserRouter } from "react-router-dom";
import App from "../App.jsx";
import BookingCar from "../components/booking/BookingCar.jsx";
import ListMain from "../components/listVehicle/ListVehicleComponent.jsx";
import SignUp from "../pages/Auth/Register.jsx";
import BookingBus from "../components/booking/BookingBus.jsx";
import BookingTrain from "../components/booking/BookingTrain.jsx";
import DatChoCuaToi from "../components/datChoCuaToi/DatChoCuaToi.jsx";
import LichSuDatCho from "../components/datChoCuaToi/LichSuDatCho.jsx";
import CancelTicketBus from "../components/cancel/CancelTicketBus.jsx";
import CancelTicketTrain from "../components/cancel/CancelTicketTau.jsx";
import CancelTicket from "../components/cancel/CancelTicket.jsx";
import { RatingCar } from "../components/rating/RatingCar.jsx";
import { RatingBus } from "../components/rating/RatingBus.jsx";
import { RatingTau } from "../components/rating/RatingTau.jsx";
import { ErrorPage } from "../pages/SystemPage/ErrorPage.jsx";
import HomePage from "../pages/HomePage/HomePage.jsx";
import Login from "../pages/Auth/LogIn.jsx";

// import { TextEditorReact } from "../Customer/Rating/TextEditorReact.jsx"; 

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Login/>,
      },
      {
        path: "SignUp",
        element: <SignUp />,
      },
      {
        path: "HomePage",
        element: <HomePage />,
      },
      {
        path: "BookingCar",
        element: <BookingCar />,
      },
      {
        path: "ListMain",
        element: <ListMain/>,
      },
      {
        path: "BookingBus",
        element: <BookingBus />,
      },
      {
        path: "BookingTrain",
        element: <BookingTrain />,
      },
      {
        path: "/my-booking",
        element: <DatChoCuaToi />,
      },
      {
        path: "/my-booking/history-booking",
        element: <LichSuDatCho/>,
      },
      {
        path: "CancelTicketBus",
        element: <CancelTicketBus />,
      },
      {
        path: "CancelTicketTau",
        element: <CancelTicketTrain />,
      },
      {
        path: "CancelTicket",
        element: <CancelTicket />,
      },
      {
        path: "RatingCar",
        element: <RatingCar />,
      },
      {
        path: "RatingTau",
        element: <RatingTau />,
      },
      {
        path: "RatingBus",
        element: <RatingBus />,
      },
    ],
  },
]);

export default router;
