import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WalletsModule } from './wallets/wallets.module';

@Module({
  imports: [
    WalletsModule,
    MongooseModule.forRoot(
      'mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass&ssl=false'
    ),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
