import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MiddlewareConsumer, Module, Req, RequestMethod } from '@nestjs/common';
import { ConfigService, ConfigModule } from '@nestjs/config';

//auth module imports
import { AuthModule } from './auth/auth.module';
import { PreauthMiddleware } from './auth/preauth.middelware';

//mongoose module imports
import { MongooseModule } from '@nestjs/mongoose';

//entity module imports
import { DrinkModule } from './drink/drink.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        return {
          uri: configService.get('MONGO_URI'),
        };
      },
    }),
    AuthModule,
    UserModule,
    DrinkModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(PreauthMiddleware).forRoutes({
      path: '*',
      method: RequestMethod.ALL,
    });
  }
}
