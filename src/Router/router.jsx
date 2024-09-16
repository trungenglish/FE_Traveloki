// router.js
import { createBrowserRouter, Navigate } from "react-router-dom";

import { lazy } from "react";

// import BookingCar from "../components/booking/BookingCar.jsx";
// import ListMain from "../components/listVehicle/ListVehicleComponent.jsx";
// import SignUp from "../pages/Auth/Register.jsx";
// import BookingBus from "../components/booking/BookingBus.jsx";
// import BookingTrain from "../components/booking/BookingTrain.jsx";
// import DatChoCuaToi from "../components/datChoCuaToi/DatChoCuaToi.jsx";
// import LichSuDatCho from "../components/datChoCuaToi/LichSuDatCho.jsx";
// import CancelTicketBus from "../components/cancel/CancelTicketBus.jsx";
// import CancelTicketTrain from "../components/cancel/CancelTicketTau.jsx";
// import CancelTicket from "../components/cancel/CancelTicket.jsx";
// import { RatingCar } from "../components/rating/RatingCar.jsx";
// import { RatingBus } from "../components/rating/RatingBus.jsx";
// import { RatingTau } from "../components/rating/RatingTau.jsx";
// import { ErrorPage } from "../pages/SystemPage/ErrorPage.jsx";
// import HomePage from "../pages/HomePage/HomePage.jsx";
// import Login from "../pages/Auth/LogIn.jsx";

const BookingCar = lazy(() => import('../components/booking/BookingCar.jsx'))
// const ListMain = lazy(() => import('../components/listVehicle/ListVehicleComponent.jsx'))  
const SignUp = lazy(() => import('../pages/Auth/Register.jsx')) 
const BookingBus = lazy(() => import('../components/booking/BookingBus.jsx'))
const BookingTrain = lazy(() => import('../components/booking/BookingTrain.jsx'))
const DatChoCuaToi = lazy(() => import('../components/datChoCuaToi/DatChoCuaToi.jsx'))
const LichSuDatCho = lazy(() => import('../components/datChoCuaToi/LichSuDatCho.jsx'))
const CancelTicketBus = lazy(() => import('../components/cancel/CancelTicketBus.jsx'))
const CancelTicketTrain = lazy(() => import('../components/cancel/CancelTicketTau.jsx'))
const CancelTicket = lazy(() => import('../components/cancel/CancelTicket.jsx'))
const RatingCar = lazy(() => import('../components/rating/RatingCar.jsx'))
const RatingBus = lazy(() => import('../components/rating/RatingBus.jsx'))
const RatingTau = lazy(() => import('../components/rating/RatingTau.jsx'))
const ErrorPage = lazy(() => import('../pages/SystemPage/ErrorPage.jsx'))
const HomePage = lazy(() => import('../pages/HomePage/HomePage.jsx'))
const Login = lazy(() => import('../pages/Auth/LogIn.jsx'))

// import { TextEditorReact } from "../Customer/Rating/TextEditorReact.jsx"; 

// layouts
import MainLayout from '../layouts/index.jsx'
const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      { path: '', element: <Navigate to="/auth/login" replace /> },
      { path: '/auth/login', element: <Login /> },
      {
        path: "HomePage",
        element: <HomePage />,
        children: [
          {
            path: 'auth',
            children: [
              { path: 'login', element: <Login /> },
              { path: 'register', element: <SignUp /> }
            ]
          },
          {
            path: 'user',
            children: [
              { path: "history-booking", element: <LichSuDatCho /> },
              {
                path: "my-booking",
                element: <DatChoCuaToi />,
                children: [
                  {
                    path: "cancel",
                    children: [
                      { path: "ticket", element: <CancelTicket />, },
                      { path: "ticket-train", element: <CancelTicketTrain />, },
                      { path: "ticket-bus", element: <CancelTicketBus />, },
                    ]
                  }
                ]
              },
              {
                path: "rate",
                children: [
                    { path: "rate", element:  <Navigate to="HomePage/user/rate/trips-car" replace /> },
                    { path: "trips-car", element: <RatingCar /> },
                    { path: "trips-bus", element: <RatingBus /> },
                    { path: "trips-train", element: <RatingTau /> }
                ]
              }
            ]
          },
          {
            path: 'booking',
            children: [
              {
                path: 'search',
                children: [
                    { path: "search", element: <Navigate to="HomePage/booking/search/cars" replace />, },
                    { path: "cars", element: <BookingCar />, },
                    { path: "bus", element: <BookingBus />, },
                    { path: "trains", element: <BookingTrain />, },
                ]
              }
            ],
          },
        ]
      },
    ],
  },
]);

export default router;
