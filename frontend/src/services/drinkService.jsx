import URL from "../config/config";
import HttpService from "./httpsService";

class DrinkService extends HttpService {
  getDrinkById = async (iid) => {
    const req = {
      method: "get",
      url: URL.DRINK_BY_ID.replace("{id}", iid),
      responseType: "json",
    };
    const res = await this.sendRequest(req);
    console.log(res);
    return res.data.drinks[0];
  };

  getAllDrinks = async (index) => {
    const req = {
      method: "get",
      url: URL.ALL_DRINKS.replace("index", index),
      responseType: "json",
    };
    const response = await this.sendRequest(req);
    console.log(response);
    return response.data;
  };

  getRandomDrink = async (noOfDrinks) => {
    const req = {
      method: "get",
      url: URL.RANDOM_DRINK,
      responseType: "json",
    };
    const promises = Array.from({ length: noOfDrinks }, () =>
      this.sendRequest(req),
    );
    const responses = await Promise.all(promises);
    const drinksMap = new Map();
    responses.forEach((response) => {
      response.data.drinks.forEach((drink) => {
        drinksMap.set(drink.idDrink, drink);
      });
    });
    const drinks = Array.from(drinksMap.values());
    return drinks;
  };

  searchDrink = async (search) => {
    const req = {
      method: "get",
      url: URL.SEARCH_DRINK_NAME.replace("{search}", search),
      responseType: "json",
    };
    const res = await this.sendRequest(req);
    console.log(res);
    return res.data.drinks;
  };
}

const drinkService = new DrinkService();
export default drinkService;
