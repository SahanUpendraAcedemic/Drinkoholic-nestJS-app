export const baseURL = "http://localhost:3000";
const URL = {
  DRINK_BY_ID: `${baseURL}/drink/{id}`,
  ALL_DRINKS: (index) => `${baseURL}/drink/all?index=${index}`,
  RANDOM_DRINK: `${baseURL}/drink/random?count=5`,
  SEARCH_DRINK_NAME: (search) => `${baseURL}/drink/search?name=${search}`,

  //user functions
  LOGIN: `${baseURL}/user/signin`,
  SIGNUP: `${baseURL}/user/signup`,
};

export default URL;
