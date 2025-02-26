import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function DrinkCard(props) {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const drinkTags = () => {
    const tags = [];
    for (let i = 1; i <= 15; i++) {
      if (props.drink[`strIngredient${i}`]) {
        tags.push(props.drink[`strIngredient${i}`]);
      }
    }
    return tags;
  };

  const instructions = props.drink.strInstructions;
  const shouldShowMore = instructions.length > 100;

  const tags = drinkTags();

  return (
    <div className="bg-gray-900 text-neutral-50 rounded-2xl size-80 justify-start p-4 flex flex-col gap-4 overflow-y-scroll scrollbar-hide hover:scale-110 hover:shadow-lg hover:shadow-amber-50 transition-transform duration-300">
      <Link to={`/drink/${props.drink.idDrink}`}>
        <div className="w-full h-30 content-center ">
          <img
            className="size-full content-around rounded-2xl object-cover"
            src={props.drink.strDrinkThumb}
            alt={props.drink.strDrink}
          />
        </div>
      </Link>
      <div className="">
        {tags.map((tag) => (
          <span
            key={tag}
            className="text-xs bg-gray-800 text-neutral-50 rounded-full px-2 py-1 m-1"
          >
            {tag}
          </span>
        ))}
      </div>
      <div className="">
        <h1 className="text-lg font-semibold">{props.drink.strDrink}</h1>
        <p className="">{instructions}</p>
      </div>
    </div>
  );
}
