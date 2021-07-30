import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { WalletsService } from './wallets.service';

@Controller('wallets')
export class WalletsController {
  constructor(private readonly walletsService: WalletsService) {}

  @Post()
  async addWallet(
    @Body('address') walletAddress: string,
    @Body('description') description: string,
  ) {
    return await this.walletsService.insertWallet(walletAddress, description);
  }

  @Get()
  async getAllWallets() {
    return await this.walletsService.getAllWallets();
  }

  @Get('walletdate/:walletAddress')
  async getWalletDate(@Param('walletAddress') walletAddress: string) {
    return await this.walletsService.getWalletFirstUseWithEtherscan(
      walletAddress,
    );
  }

  @Get('walletbalance/:walletAddress')
  async getWalletBalance(@Param('walletAddress') walletAddress: string) {
    return await this.walletsService.getFullBalance(walletAddress);
  }

  @Get('singlewallet/:walletAddress')
  async getWallet(@Param('walletAddress') walletAddress: string) {
    return await this.walletsService.getWallet(walletAddress);
  }

  @Patch('favorite/:walletAddress')
  async updateFavorite(
    @Param('walletAddress') walletAddress: string,
    @Body('favorite') favorite: boolean,
  ) {
    return await this.walletsService.updateFavorite(walletAddress, favorite);
  }

  @Patch('usdex/:walletAddress')
  async updateUSD(
    @Param('walletAddress') walletAddress: string,
    @Body('usdex') usdex: string,
  ) {
    return await this.walletsService.updateUSDex(walletAddress, usdex);
  }

  @Patch('eurex/:walletAddress')
  async updateEUR(
    @Param('walletAddress') walletAddress: string,
    @Body('eurex') eurex: string,
  ) {
    return await this.walletsService.updateEURDex(walletAddress, eurex);
  }

  @Delete(':walletAddress')
  async removeWallet(@Param('walletAddress') walletAddress: string) {
    return await this.walletsService.removeWallet(walletAddress);
  }

  @Get('etherscanprice')
  async etherScanEthPrice(){
      return await this.walletsService.getETHtoUSDfromEtherscan();
  }

}
