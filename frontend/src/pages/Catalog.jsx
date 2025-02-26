import React, { useState, useEffect } from "react";
import drinkService from "../services/drinkService";
import Loader from "../components/Loader";
import DrinkCard from "../components/DrinkCard";
import { Button } from "@mui/material";

export default function Catalog() {
  const [allDrinks, setAllDrinks] = useState([]);
  const [filteredDrinks, setFilteredDrinks] = useState([]);
  const [index, setIndex] = useState("a"); // initially has value 'a'
  const [loading, setLoading] = useState(false);

  const fetchAllDrinks = async (letter) => {
    try {
      setLoading(true);
      const response = await drinkService.getAllDrinks(letter);
      console.log(response);
      setAllDrinks(response.drinks || []); // Assuming response.drinks contains the array of drinks
      setFilteredDrinks(response.drinks);
    } catch (err) {
      console.error("Error fetching drinks:", err);
    } finally {
      setLoading(false);
    }
  };

  const indexValues = Array.from({ length: 26 }, (_, i) =>
    String.fromCharCode(97 + i),
  ).map((letter) => letter.toUpperCase());

  const returnBtnPress = (index) => {
    console.log(index);
    fetchAllDrinks(index);
  };

  useEffect(() => {
    fetchAllDrinks(index);
  }, [index]);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="min-h-full bg-gray-100 dark:bg-gray-800 flex flex-row items-start p-4">
      <div className="w-1/4 min-h-full bg-gray-900 rounded-2xl flex flex-row items-start justify-between p-4 sticky top-2">
        <form className="flex flex-col w-full gap-3 text-neutral-100 ">
          <p>Sort by:</p>
          <select
            id="sort"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-amber-500 focus:border-amber-500 block w-full p-2.5
               dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-amber-500 dark:focus:border-amber-500"
            onChange={(e) => {
              const sortedDrinks = filteredDrinks.sort((a, b) => {
                if (e.target.value === "name") {
                  return a.strDrink.localeCompare(b.strDrink);
                } else if (e.target.value === "category") {
                  return a.strCategory.localeCompare(b.strCategory);
                }
                return 0;
              });
              setAllDrinks(sortedDrinks);
            }}
          >
            <option value="name">Name</option>
            <option value="category">Category</option>
          </select>
          <p>Filter by category:</p>
          <select
            id="filter"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-amber-500 focus:border-amber-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600
               dark:placeholder-gray-400 dark:text-white dark:focus:ring-amber-500 dark:focus:border-amber-500"
            onChange={(e) => {
              const filter = [...allDrinks].filter((drink) =>
                drink.strCategory.includes(e.target.value),
              );
              setFilteredDrinks(filter);
            }}
          >
            <option value="">All</option>
            <option value="Cocktail">Cocktail</option>
            <option value="Shot">Shot</option>
            <option value="Beer">Beer</option>
            {/* Add more categories as needed */}
          </select>
        </form>
      </div>
      <div className="w-3/4 min-h-full bg-gray-100 dark:bg-gray-800 rounded-2xl p-4">
        <div className="flex flex-row p-4 justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold mb-4 text-neutral-100">
              Catalog
            </h1>
            <p className="mb-2 -translate-y-5 text-neutral-100">
              Showing {filteredDrinks.length} drinks
            </p>
            <nav className="flex object-center">
              <ul className="text-sm flex flex-wrap space-x-2 space-y-1">
                {indexValues.map((index) => (
                  <li>
                    <Button
                      onClick={() => returnBtnPress(index)}
                      className="flex items-center justify-center px-3 h-8 leading-tight "
                    >
                      {index || setIndex(index)}
                    </Button>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
        <div className="m-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredDrinks.length === 0 && filteredDrinks !== allDrinks ? (
            <div>
              <p>No Drinks</p>
            </div>
          ) : (
            filteredDrinks.map((drink) => (
              <div
                key={drink.idDrink}
                className="h-full flex flex-col items-center justify-center"
              >
                <DrinkCard
                  drink={drink}
                  className="h-full flex flex-col min-h-250px overflow-x-auto overflow-y-auto"
                />
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
