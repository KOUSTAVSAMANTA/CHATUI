import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";
import "./styles.scss";

import {BrowserRouter,Routes,Route} from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>
      </Routes>
    </BrowserRouter>
    // <div>
    //   {/* <Register /> */}
    //   {/* 
    //     <Home />
    //    <TRANSACTION>
    //    <TRANSFER AMOUNT>
    //    <CHANGE OF ADDRESS>
    //    <CHANGES in USER FORM>
    //    <MUTUAL FUNDS> 
    //    <REGISTERATION FORM or Snap shot by form>
    //   */}
    // </div>
  );
}

export default App;
