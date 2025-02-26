import React, { useState, useEffect, useRef } from "react";
import drinkService from "../services/drinkService";
import { Link } from "react-router-dom";
import { useDrinkContext } from "../context/DrinkContext";
import { FaHeart, FaShoppingCart } from "react-icons/fa";

export default function SearchBar({ onSearch }) {
  const [search, setSearch] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const { addToCart, addToFavorites } = useDrinkContext();
  const searchRef = useRef(null);

  useEffect(() => {
    if (search.length > 2) {
      setLoading(true);
      drinkService
        .searchDrink(search)
        .then((results) => {
          setSuggestions(results);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Error fetching suggestions:", err);
          setSuggestions([]);
          setLoading(false);
        });
    } else {
      setSuggestions([]);
    }
  }, [search]);

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(search);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setSuggestions([]); // Hide suggestions
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={searchRef} className="relative max-w-lg mx-auto mt-6 w-full">
      <form onSubmit={handleSearch}>
        <div className="flex">
          <div className="relative w-full">
            <input
              type="search"
              className="block p-2.5 w-full z-20 text-sm rounded-xl text-gray-900 bg-gray-50 border border-gray-300 focus:ring-amber-200 focus:border-amber-400 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
              placeholder="Search Drinks..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button
              type="submit"
              className="absolute top-0 end-0 p-2.5 text-sm font-medium h-full text-white bg-amber-300 rounded-e-lg hover:bg-amber-800 focus:ring-4 focus:outline-none focus:ring-amber-300 dark:bg-amber-600 dark:hover:bg-amber-700 dark:focus:ring-amber-800"
            >
              <svg
                className="w-4 h-4"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </button>
          </div>
        </div>
      </form>

      {/* Suggestions Dropdown */}
      {suggestions.length > 0 && (
        <div className="absolute mt-2 w-full bg-white border border-gray-300 shadow-lg rounded-md p-2 z-50 max-h-60 overflow-auto dark:bg-gray-800 dark:border-gray-600">
          {loading ? (
            <p className="text-center text-gray-500">Loading...</p>
          ) : (
            suggestions.map((drink) => (
              <div
                key={drink.idDrink}
                className="p-2 border-b last:border-none hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <div className="text-neutral-50 flex flex-row justify-between items-start p-3">
                  <Link to={`/drink/${drink.idDrink}`}>
                    <img
                      src={drink.strDrinkThumb}
                      alt={drink.strDrink}
                      className="size-20 rounded-2xl"
                    />
                  </Link>
                  <h1 className="text-start">{drink.strDrink}</h1>
                  <div className="space-x-4">
                    <button
                      className="text-red-500 hover:text-red-700"
                      onClick={() => addToFavorites(drink)}
                    >
                      <FaHeart size={20} />
                    </button>
                    <button
                      className="text-amber-100 hover:text-amber-300"
                      onClick={() => addToCart(drink)}
                    >
                      <FaShoppingCart size={20} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
