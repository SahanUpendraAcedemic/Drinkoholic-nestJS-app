import { Controller, Get, Param, Query } from '@nestjs/common';
import { DrinkService } from '../service/drink.service';

@Controller('drink')
export class DrinkController {
  constructor(private readonly drinkService: DrinkService) {}

  @Get('/:id')
  async getDrinkById(@Param('id') id: string) {
    return this.drinkService.getDrinkById(id);
  };

  @Get('/all')
  async getAllDrinks(@Query('index') index: string) {
    return this.drinkService.getAllDrinks(index);
  };

  @Get('/random')
  async getRandomDrinks(@Query('count') count: number) {
    return this.drinkService.getRandomDrinks(count);
  };

  @Get('/search')
  async searchDrink(@Query('name') name: string) {
    return this.drinkService.searchDrink(name);
  };
}
