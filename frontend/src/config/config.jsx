export const baseURL = "http://localhost:3000";
const URL = {
  DRINK_BY_ID: `${baseURL}/drink/{id}`,
  ALL_DRINKS: (index) => `${baseURL}/drink/all/${index}`,
  RANDOM_DRINK: `${baseURL}/drink/random?count=5`,
  SEARCH_DRINK_NAME: `${baseURL}/drink/search?name=Margarita`,

  //user functions
  LOGIN: `${baseURL}/user/signin`,
  SIGNUP: `${baseURL}/user/signup`,
};

export default URL;
