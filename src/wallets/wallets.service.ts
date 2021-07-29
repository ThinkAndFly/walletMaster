import { Injectable, NotFoundException } from '@nestjs/common';
import { Wallet } from './wallet.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { HttpService } from '@nestjs/axios';
import { BasicResult, WalletResult } from './walletResult.model';
import { AxiosResponse } from 'axios';

@Injectable()
export class WalletsService {
  private apiKEY: string = 'NSZCD6S4TKVWRS13PMQFMVTNP6H7NAGHUY';
  private balanceToEth: number = 1000000000000000000;
  constructor(
    @InjectModel('Wallet') private readonly walletModel: Model<Wallet>,
    private httpService: HttpService,
  ) {}

  async getWalletBalanceWithEtherscan(address: string) {
    var balance : number;
    const url =
      'https://api.etherscan.io/api?module=account&action=balance&address=' +
      address +
      '&tag=latest&apikey=' +
      this.apiKEY +
      '';
    const wallet = await this.httpService.get<AxiosResponse<BasicResult>>(url);
    await wallet.forEach((w) => {
        const rawBalance = (w.data as unknown as BasicResult).result;
        balance = parseInt(rawBalance) / this.balanceToEth;
    });
    return balance; 
  }

  async getWalletFirstUseWithEtherscan(address: string) : Promise<Date> {
    const url =
      'https://api.etherscan.io/api?module=account&action=txlist&address=' +
      address +
      '&startblock=0&endblock=99999999&sort=asc&apikey=' +
      this.apiKEY +
      '';
      
    var date : Date;
    const wallet = await this.httpService.get<AxiosResponse<WalletResult>>(url);
    await wallet.forEach((w) => {
        const firstUse = (w.data as unknown as WalletResult).result[0].timeStamp;
        date = new Date(parseInt(firstUse)*1000);
    });
    return (date); 
  }

  async insertWallet(address: string, description: string) {
    const newWallet = new this.walletModel({
      address: address,
      description: description,
      favorite: false,
    });
    const result = await newWallet.save();
  }

  async getAllWallets() {
    const wallets = await this.walletModel.find().exec();
    return wallets.map((wallet) => ({
      address: wallet.address,
      description: wallet.description,
      favorite: wallet.favorite,
    }));
  }

  async getWallet(walletAddress: string) {
    const wallet = await this.findWallet(walletAddress);
    return {
      address: wallet.address,
      description: wallet.description,
      favorite: wallet.favorite,
    };
  }

  async updateFavorite(walletAddress: string, favorite: boolean) {
    const wallet = await this.findWallet(walletAddress);
    if (favorite !== undefined) wallet.favorite = favorite;
    await wallet.save();
    return wallet;
  }

  async removeWallet(walletAddress: string) {
    const result = await this.walletModel
      .deleteOne({ address: walletAddress })
      .exec();
    if (result.n === 0) {
      throw new NotFoundException('Wallet not found');
    }
  }

  private async findWallet(walletAddress: string): Promise<Wallet> {
    const wallet = await this.walletModel
      .findOne({ address: walletAddress })
      .exec();
    if (!wallet) {
      throw new NotFoundException('Wallet not found');
    }
    return wallet;
  }
}
