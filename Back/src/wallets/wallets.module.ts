import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { WalletsController } from './wallets.controller';
import { WalletSchema } from './wallet.model';
import { WalletsService } from './wallets.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Wallet', schema: WalletSchema }]),
    HttpModule
  ],
  controllers: [WalletsController],
  providers: [WalletsService],
})
export class WalletsModule {}
