import React from "react";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import Home from "../pages/Home.js/Home";
import SignIn from "../pages/Registration/SignIn";
import Error from "../pages/Error/Error";
import SignUp from "../pages/Registration/SignUp";
function App() {
  return (
    <div className="font-montserrat">
      <Routes>
        <Route path="/">
          <Route index element={<Home />} />
          <Route path="signin" element={<SignIn />} />
          <Route path="signup" element={<SignUp />} />
          <Route path="*" element={<Error />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
