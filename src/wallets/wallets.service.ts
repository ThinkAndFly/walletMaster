import { Injectable, NotFoundException } from '@nestjs/common';
import { Wallet } from './wallet.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class WalletsService {
  private wallets: Wallet[] = [];

  constructor(
    @InjectModel('Wallet') private readonly walletModel: Model<Wallet>,
  ) {}

  async insertWallet(address: string, description: string) {
    const newWallet = new this.walletModel({
      address: address,
      description: description,
      favorite: false,
    });
    const result = await newWallet.save();
    console.log(result);
  }

  getAllWallets() {
    return [...this.wallets];
  }

  getWallet(walletAddress: string) {
    const wallet = this.findWallet(walletAddress);
    return { ...wallet };
  }

  updateFavorite(walletAddress: string, favorite: boolean) {
    const wallet = this.findWallet(walletAddress);
    wallet.favorite = favorite;
    return wallet;
  }

  removeWallet(walletAddress: string) {
    const index = this.wallets.indexOf(this.findWallet(walletAddress));
    this.wallets.splice(index, 1);
    return [...this.wallets];
  }

  private findWallet(walletAddress: string) {
    const wallet = this.wallets.find((w) => w.address === walletAddress);
    if (!wallet) {
      throw new NotFoundException('Wallet not found');
    }
    return wallet;
  }
}
