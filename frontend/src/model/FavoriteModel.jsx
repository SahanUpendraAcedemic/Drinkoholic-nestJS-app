import { useDrinkContext } from "../context/DrinkContext";
import { FaTimes, FaTrash } from "react-icons/fa";

const FavoritesModal = () => {
  const {
    favorites,
    isFavoritesOpen,
    setIsFavoritesOpen,
    removeFromFavorites,
  } = useDrinkContext();

  return (
    <div
      className={`absolute inset-0 bg-black bg-opacity-50 flex justify-center items-center transition-opacity z-50 
        ${isFavoritesOpen ? "opacity-100 visible" : "opacity-0 invisible"}`}
    >
      <div className="bg-gray-800 p-6 rounded-lg w-96">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-bold text-neutral-100">Favorites</h2>
          <button onClick={() => setIsFavoritesOpen(false)}>
            <FaTimes />
          </button>
        </div>
        <div className="mt-4 max-h-60 overflow-auto scrollbar-hide">
          {favorites.length === 0 ? (
            <p className="text-neutral-100 text-center">
              No favorite drinks yet.
            </p>
          ) : (
            favorites.map((drink) => (
              <div
                key={drink.idDrink}
                className="flex justify-between items-center p-2 border-b"
              >
                <div className="flex items-center gap-2 text-neutral-100">
                  <img
                    src={drink.strDrinkThumb}
                    alt={drink.strDrink}
                    className="w-12 h-12 rounded-md"
                  />
                  <p className="text-sm">{drink.strDrink}</p>
                </div>
                <button
                  onClick={() => removeFromFavorites(drink.idDrink)}
                  className="text-red-500"
                >
                  <FaTrash />
                </button>
              </div>
            ))
          )}
        </div>
        <button
          className="mt-4 w-full bg-amber-300 text-white py-2 rounded-md"
          onClick={() => setIsFavoritesOpen(false)}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default FavoritesModal;
