import { Suspense } from "react";
import { RouterProvider } from "react-router-dom";
import router from "./Router/router";
const App = () => {
  return (
    // <Router />
    <Suspense fallback={<div>Loading...</div>}>
      <RouterProvider router={router} />
    </Suspense>
  );
};

export default App;
