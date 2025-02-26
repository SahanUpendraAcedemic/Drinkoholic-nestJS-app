import { Route, Routes } from "react-router-dom";
import Mainpage from "../pages/Mainpage";
import Catalog from "../pages/Catalog";
import DrinkPage from "../pages/DrinkPage";
import Cart from "../pages/Cart";

const Routers = () => {
  return (
    <Routes>
      <Route path="/" element={<Mainpage />} />
      <Route path="/catalog" element={<Catalog />} />
      <Route path="/drink/:id" element={<DrinkPage />} />
      <Route path="/cart" element={<Cart />} />
    </Routes>
  );
};

export default Routers;
