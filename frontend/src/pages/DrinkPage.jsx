import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import drinkService from "../services/drinkService";
import Loader from "../components/Loader";
import { FaGlassMartini } from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa";
import { FaHeart, FaShoppingCart } from "react-icons/fa";
import { useDrinkContext } from "../context/DrinkContext";

export default function DrinkPage() {
  const [drink, setDrink] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [tags, setTags] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const { addToCart, addToFavorites } = useDrinkContext();
  const { id: drinkId } = useParams();

  const fetchDrink = async () => {
    try {
      setLoading(true);
      const fetchedDrink = await drinkService.getDrinkById(drinkId);
      setDrink(fetchedDrink);
      console.log("Drink fetched:", fetchedDrink);
    } catch (error) {
      console.error("Error fetching drink:", error);
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const drinkTags = async () => {
    const tags = [];
    if (drink.strAlcoholic === "Alcoholic") {
      tags.push("Alcoholic");
    }
    if (drink.strCategory) {
      tags.push(drink.strCategory);
    }
    if (drink.strIBA) {
      tags.push(drink.strIBA);
    }

    setTags(tags);
  };

  const drinkIngredients = () => {
    const ingredients = [];
    for (let i = 1; i <= 15; i++) {
      if (drink[`strIngredient${i}`]) {
        ingredients.push(drink[`strIngredient${i}`]);
      }
    }
    setIngredients(ingredients);
    console.log("Ingredients:", ingredients);
  };

  useEffect(() => {
    fetchDrink();
  }, [drinkId]);

  useEffect(() => {
    if (drink) {
      drinkTags();
      drinkIngredients();
    }
  }, [drink]);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!drink) {
    return <div>Drink not found</div>;
  }

  return (
    <div className="bg-gray-100 dark:bg-gray-800 flex items-center justify-center h-screen p-5">
      <div className="flex flex-col gap-3 m-5 size-full justify-center ">
        <button
          className=" text-neutral-100 bg-amber-700 flex flex-row items-center justify-center rounded-2xl w-sm h-10 gap-2 "
          onClick={() => window.history.back()}
        >
          <FaArrowLeft className="text-gray-100" />
          Back to drinks
        </button>
        <div className="flex flex-row gap-3 p-5 bg-white dark:bg-gray-900 rounded-lg mb-5">
          <div className="flex flex-col gap-3">
            <img
              src={drink.strDrinkThumb}
              alt={drink.strDrink}
              className="size-60 rounded-2xl"
            />
            <div className="space-x-2 items-center flex flex-row w-full justify-center">
              <button
                className="text-red-500 hover:text-red-700"
                onClick={() => addToFavorites(drink)}
              >
                <FaHeart size={20} />
              </button>
              <button
                className="text-amber-500 hover:text-amber-700"
                onClick={() => addToCart(drink)}
              >
                <FaShoppingCart size={20} />
              </button>
            </div>
            {tags.length >= 0 ? (
              <div className="flex flex-col justify-center">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs bg-gray-800 text-neutral-50 rounded-full px-2 py-1 m-1 text-center"
                  >
                    {tag}
                  </span>
                ))}
                <div className="flex flex-row gap-2 my-3 items-center justify-center text-gray-100 ">
                  <FaGlassMartini className="text-gray-100" /> {drink.strGlass}
                </div>
              </div>
            ) : null}
          </div>
          <div className="flex flex-col gap-2 size-full p-2 justify-center items-start">
            <h1 className="text-2xl font-semibold text-gray-100">
              {drink.strDrink}
            </h1>
            <div className="flex flex-col gap-0">
              <h3 className="font-semibold text-gray-100">Instructions:</h3>
              <p className="text-gray-700 dark:text-gray-300 text-justify p-5">
                {drink.strInstructions}
              </p>
            </div>
            <h3 className="font-semibold text-gray-100">Ingredients:</h3>
            <div className="grid grid-cols-2 grid-rows-1 gap-2 text-gray-700 dark:text-gray-300 ">
              {ingredients.map((ingredient, index) => (
                <span key={ingredient} className="flex flex-row gap-2">
                  {
                    <img
                      src={`https://www.thecocktaildb.com/images/ingredients/${ingredient}-Small.png`}
                      alt={ingredient}
                      className="size-20 rounded-full"
                    />
                  }
                  {ingredient}
                  {(drink[`strMeasure${index + 1}`] &&
                    ` - ${drink[`strMeasure${index + 1}`]}`) ||
                    ""}
                </span>
              ))}
            </div>

            {drink.strVideo ? (
              <button
                className="text-amber-500 hover:text-amber-700"
                onClick={() => window.open(drink.strVideo)}
              >
                Watch Instruction
              </button>
            ) : (
              <p className="text-gray-300">No video available</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
