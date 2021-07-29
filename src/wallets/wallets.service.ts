import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { Wallet } from './wallet.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { HttpService } from '@nestjs/axios';
import {
  BasicResult,
  ExchangeDetail,
  ExchangeResult,
  WalletResult,
} from './walletResult.model';
import { AxiosResponse } from 'axios';

@Injectable()
export class WalletsService {
  private apiKEY: string = 'NSZCD6S4TKVWRS13PMQFMVTNP6H7NAGHUY';
  private weiToEth: number = Math.pow(10, 18);

  constructor(
    @InjectModel('Wallet') private readonly walletModel: Model<Wallet>,
    private httpService: HttpService,
  ) {}

  async insertWallet(address: string, description: string) : Promise<boolean> {

    if(await this.exist(address))
    {  throw new HttpException({
        status: HttpStatus.FORBIDDEN,
        error: 'This wallet already exists.',
      }, HttpStatus.FORBIDDEN);
    }

    const date = await this.getWalletFirstUseWithEtherscan(address);

    const newWallet = new this.walletModel({
      address: address,
      description: description,
      favorite: false,
      firstTransaction: date ?? null,
      usdEx: 0,
      eurEx: 0,
    });

    const result = await newWallet.save();

    return true;
  }

  async getAllWallets() {
    const wallets = await this.walletModel.find().exec();

    const mappedWallet = wallets.map((wallet) => this.internalMapping(wallet));

    for (const wallet of mappedWallet) {
      var result = await this.getWalletBalanceWithEtherscan(wallet.address);
      if (!isNaN(result)) wallet.balance = result;
    }

    return mappedWallet;
  }

  async getWallet(walletAddress: string) {
    const wallet = await this.findWallet(walletAddress);
    const mappedWallet = this.internalMapping(wallet);

    var result = await this.getWalletBalanceWithEtherscan(wallet.address);
    if (!isNaN(result)) mappedWallet.balance = result;

    return mappedWallet;
  }

  async updateFavorite(walletAddress: string, favorite: boolean) {
    const wallet = await this.findWallet(walletAddress);
    if (favorite !== undefined) wallet.favorite = favorite;
    await wallet.save();
    return wallet;
  }

  async updateUSDex(walletAddress: string, usdex: number) {
    const wallet = await this.findWallet(walletAddress);
    if (usdex !== undefined) wallet.usdEx = usdex;
    await wallet.save();
    return wallet;
  }

  async updateEURDex(walletAddress: string, eurex: number) {
    const wallet = await this.findWallet(walletAddress);
    if (eurex !== undefined) wallet.eurEx = eurex;
    await wallet.save();
    return wallet;
  }

  async removeWallet(walletAddress: string) : Promise<boolean>{
    const result = await this.walletModel
      .deleteOne({ address: walletAddress })
      .exec();
    if (result.n === 0) {
      throw new NotFoundException('Wallet not found');
    }
    return true;
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

  private async exist(walletAddress: string): Promise<boolean> {
    const wallet = await this.walletModel
      .findOne({ address: walletAddress })
      .exec();
    if (wallet) {
      return true;
    }
    return false;
  }

  async getFullBalance(address: string) {
    const wallet = await this.findWallet(address);

    const fullBalance = {
      eth: 0,
      usd: 0,
      eur: 0,
    };

    var result = await this.getWalletBalanceWithEtherscan(wallet.address);
    if (!isNaN(result)) {
      fullBalance.eth = result;
      fullBalance.usd = result * wallet.usdEx;
      fullBalance.eur = result * wallet.eurEx;
    }

    return fullBalance;
  }

  async getWalletBalanceWithEtherscan(address: string) {
    var balance: number;
    const url =
      'https://api.etherscan.io/api?module=account&action=balance&address=' +
      address +
      '&tag=latest&apikey=' +
      this.apiKEY +
      '';
    const wallet = await this.httpService.get<AxiosResponse<BasicResult>>(url);
    await wallet.forEach((w) => {
      const rawBalance = (w.data as unknown as BasicResult)?.result;
      balance = parseInt(rawBalance) / this.weiToEth;
    });

    return balance;
  }

  async getWalletFirstUseWithEtherscan(address: string): Promise<Date> {
    const url =
      'https://api.etherscan.io/api?module=account&action=txlist&address=' +
      address +
      '&startblock=0&endblock=99999999&sort=asc&apikey=' +
      this.apiKEY +
      '';

    var date: Date = null;
    const wallet = await this.httpService.get<AxiosResponse<WalletResult>>(url);
    await wallet.forEach((w) => {
      const walletData = w.data as unknown as WalletResult;
      if (walletData?.message === 'NOTOK')
        throw new NotFoundException('Wallet address format is wrong');

      const firstUse = walletData?.result[0]?.timeStamp;
      if (firstUse) date = new Date(parseInt(firstUse) * 1000);
    });
    return date;
  }

  async getETHtoUSDfromEtherscan(): Promise<number> {
    const url =
      'https://api.etherscan.io/api?module=stats&action=ethprice&apikey=' +
      this.apiKEY +
      '';

    var rate = 0;
    const exchange = await this.httpService.get<AxiosResponse<ExchangeResult>>(
      url,
    );
    await exchange.forEach((w) => {
      const result = (w.data as unknown as ExchangeResult)?.result.ethusd;
      rate = parseFloat(result);
    });

    return rate;
  }

  private internalMapping(wallet: Wallet) {
    return {
      address: wallet.address,
      description: wallet.description,
      favorite: wallet.favorite,
      firstTransaction: wallet.firstTransaction,
      balance: 0,
      usdEx: wallet.usdEx,
      eurEx: wallet.eurEx,
    };
  }
}
