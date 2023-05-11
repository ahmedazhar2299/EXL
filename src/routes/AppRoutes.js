import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home.js/Home";
import Error from "../pages/Error/Error";
function App() {
  return (
    <div className="font-montserrat">
      <Routes>
        <Route path="/">
          <Route index element={<Home />} />
          <Route path="*" element={<Error />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
