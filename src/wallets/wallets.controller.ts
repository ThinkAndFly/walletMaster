import { Controller, Post, Body, Get, Param, Patch, Delete } from '@nestjs/common';
import { WalletsService } from './wallets.service';

@Controller('wallets')
export class WalletsController {
  constructor(private readonly walletsService: WalletsService) {}

  @Post()
  async addWallet(
    @Body('address') walletAddress: string,
    @Body('description') description: string) {
    await this.walletsService.insertWallet(walletAddress, description);
     return "wallet added successfully."
   }

   @Get()
   async getAllWallets(){
       return await this.walletsService.getAllWallets();
   }

   @Get(':walletAddress')
   async getWallet(@Param('walletAddress') walletAddress : string){
       return await this.walletsService.getWallet(walletAddress); 
   }

   @Patch(':walletAddress')
   async updateFavorite(
       @Param('walletAddress') walletAddress : string,
       @Body('favorite') favorite : boolean)
    {
        return await this.walletsService.updateFavorite(walletAddress, favorite);
    }

    @Delete(':walletAddress')
    async removeWallet(@Param('walletAddress') walletAddress : string)
    {
        return await this.walletsService.removeWallet(walletAddress);
    }
}
