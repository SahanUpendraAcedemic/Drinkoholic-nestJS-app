import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';

@Injectable()
export class DrinkService {
  constructor(private readonly configService: ConfigService) {}

  async getDrinkById(id: string) {
    console.log(id);
    const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
    console.log(url);
    const response = await axios.get(url);
    console.log(response.data);
    return response.data;
  }

  async getAllDrinks(index: string) {
    try {
      const url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${index}`;
      const response = await axios.get(url);

      if (!response.data.drinks) {
        console.log('No drinks found for this category.');
      }

      return response.data;
    } catch (error) {
      console.error(
        'Error fetching drinks:',
        error.response?.data || error.message,
      );
      throw new Error('Failed to fetch drinks.');
    }
  }

  async getRandomDrinks(count: number) {
    const url = 'https://www.thecocktaildb.com/api/json/v1/1/random.php';
    console.log(url);
    const response = await axios.get(url);
    console.log(response.data);
    return response.data;
  }

  async searchDrink(name: string) {
    const url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${name}`;
    console.log(url);
    const response = await axios.get(url);
    console.log(response.data);
    return response.data;
  }
}
