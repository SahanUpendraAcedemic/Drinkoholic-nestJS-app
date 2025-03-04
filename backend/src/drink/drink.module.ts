import { Module } from '@nestjs/common';
import { DrinkController } from './controller/drink.controller';
import { DrinkService } from './service/drink.service';

@Module({
  controllers: [DrinkController],
  providers: [DrinkService],
  exports: [DrinkService],
})
export class DrinkModule {}
