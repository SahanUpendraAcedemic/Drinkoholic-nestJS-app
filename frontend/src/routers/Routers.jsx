import { Route, Routes } from "react-router-dom";
import Mainpage from "../pages/Mainpage";
import Catalog from "../pages/Catalog";
import DrinkPage from "../pages/DrinkPage";
import Cart from "../pages/Cart";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";

const Routers = () => {
  return (
    <Routes>
      <Route path="/" element={<Mainpage />} />
      <Route path="/catalog" element={<Catalog />} />
      <Route path="/drink" element={<DrinkPage />} />
      <Route path="/cart" element={<Cart />} />

      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
    </Routes>
  );
};

export default Routers;
