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
   getAllWallets(){
       return this.walletsService.getAllWallets();
   }

   @Get(':walletAddress')
   getWallet(@Param('walletAddress') walletAddress : string){
       return this.walletsService.getWallet(walletAddress); 
   }

   @Patch(':walletAddress')
   updateFavorite(
       @Param('walletAddress') walletAddress : string,
       @Body('favorite') favorite : boolean)
    {
        return this.walletsService.updateFavorite(walletAddress, favorite);
    }

    @Delete(':walletAddress')
    removeWallet(@Param('walletAddress') walletAddress : string)
    {
        return this.walletsService.removeWallet(walletAddress);
    }
}
