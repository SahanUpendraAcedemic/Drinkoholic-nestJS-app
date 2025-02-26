import React, { useEffect, useState, useRef } from "react";
import Hero from "../components/Hero";
import drinkService from "../services/drinkService";
import DrinkCard from "../components/DrinkCard";
import SearchBar from "../components/SearchBar";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Loader from "../components/Loader";

export default function Mainpage() {
  const [drinks, setDrinks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchResults, setSearchResults] = useState([]);
  const searchResultsRef = useRef(null);

  const fetchDrinks = async () => {
    setLoading(true);
    setError(null); // Clear any previous errors
    try {
      const response = await drinkService.getRandomDrink(5);
      if (Array.isArray(response)) {
        setDrinks(response);
      } else {
        setError("Invalid data received from API.");
      }
    } catch (err) {
      console.error("Error fetching drinks:", err);
      setError("Failed to fetch drinks. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const drinkSearch = async (search) => {
    setError(null);
    try {
      const response = await drinkService.searchDrink(search);
      console.log(response);
      setSearchResults(response);
      if (searchResultsRef.current) {
        searchResultsRef.current.scrollIntoView({
          behavior: "smooth",
          block: "center",
          inline: "center",
        });
      }
    } catch (err) {
      console.error("Error fetching drinks:", err);
      setError("Failed to fetch drinks. Please try again later.");
    }
  };

  useEffect(() => {
    fetchDrinks();
  }, []);
  //setting for react slick
  const sliderSettings = {
    pauseOnHover: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    swipeToSlide: false,
    autoplay: true,
    className: "",
    arrows: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="bg-gray-100 dark:bg-gray-800 overflow-y-scroll scrollbar-hide h-screen snap-y snap-mandatory scroll-m-10 smooth-snap">
      {/* Hero Section */}
      <div className="snap-start w-full h-screen">
        <Hero />
      </div>

      {/* Drink Slider Section */}
      <div className="mt-5 h-screen snap-start" data-taos-offset="200">
        <Slider {...sliderSettings}>
          {drinks.map((drink) => (
            <div key={drink.idDrink} className="h-full p-20 gap-5 scale-90">
              <DrinkCard drink={drink} className="" />
            </div>
          ))}
        </Slider>
      </div>

      {/* Search Section */}
      <div className="flex flex-col p-5 m-5 w-full h-fit min-h-screen items-center snap-start space-y-6">
        <SearchBar onSearch={drinkSearch} />
        <div
          ref={searchResultsRef}
          className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 "
        >
          {searchResults.length > 0 ? (
            searchResults.map((drink) => (
              <div className="flex justify-center items-center">
                <DrinkCard key={drink.idDrink} drink={drink} />
              </div>
            ))
          ) : (
            <></>
          )}
        </div>
      </div>

      {/* Stats Section */}
      <section
        className="bg-white dark:bg-gray-900 h-screen flex items-center justify-center snap-start"
        data-taos-offset="200"
      >
        <div className="max-w-screen-xl px-6 py-8 text-center">
          <dl className="grid gap-8 mx-auto text-gray-900 sm:grid-cols-3 dark:text-white">
            {[
              { count: "500+", label: "Drinks" },
              { count: "400+", label: "Ingredients" },
              { count: "600+", label: "Images" },
            ].map((item, index) => (
              <div
                key={index}
                className="flex flex-col items-center space-y-2 transition-transform duration-300 hover:scale-105"
              >
                <dt className="text-4xl font-extrabold">{item.count}</dt>
                <dd className="text-gray-500 dark:text-gray-400 text-lg font-medium">
                  {item.label}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>
    </div>
  );
}
