import { createContext, useContext, useState } from "react";
import useLocalStorage from "../hooks/LocalStorage";

const DrinkContext = createContext();

export const DrinkProvider = ({ children }) => {
  const [favorites, setFavorites] = useLocalStorage("favorites", []);
  const [cart, setCart] = useLocalStorage("cart", []);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isFavoritesOpen, setIsFavoritesOpen] = useState(false);

  const addToFavorites = (drink) => {
    if (!favorites.some((d) => d.idDrink === drink.idDrink)) {
      setFavorites([...favorites, drink]);
    }
  };

  const removeFromFavorites = (id) => {
    setFavorites(favorites.filter((drink) => drink.idDrink !== id));
  };

  const addToCart = (drink) => {
    const existingDrink = cart.find((d) => d.idDrink === drink.idDrink);
    if (existingDrink) {
      setCart(
        cart.map((d) =>
          d.idDrink === drink.idDrink ? { ...d, quantity: d.quantity + 1 } : d,
        ),
      );
    } else {
      setCart([...cart, { ...drink, quantity: 1 }]);
    }
  };

  const removeFromCart = (id) => {
    const existingDrink = cart.find((d) => d.idDrink === id);
    if (existingDrink.quantity > 1) {
      setCart(
        cart.map((d) =>
          d.idDrink === id ? { ...d, quantity: d.quantity - 1 } : d,
        ),
      );
    } else {
      setCart(cart.filter((drink) => drink.idDrink !== id));
    }
  };

  return (
    <DrinkContext.Provider
      value={{
        favorites,
        cart,
        isCartOpen,
        setIsCartOpen,
        isFavoritesOpen,
        setIsFavoritesOpen,
        addToFavorites,
        removeFromFavorites,
        addToCart,
        removeFromCart,
      }}
    >
      {children}
    </DrinkContext.Provider>
  );
};

export const useDrinkContext = () => useContext(DrinkContext);
