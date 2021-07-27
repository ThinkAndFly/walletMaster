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
  }

  async getAllWallets() {
    const wallets = await this.walletModel.find().exec();
    return wallets.map((wallet) => ({
      address: wallet.address,
      description: wallet.description,
      favorite: wallet.favorite,
    }));
  }

  async  getWallet(walletAddress: string) {
    const wallet = await this.findWallet(walletAddress);
    return wallet;
  }

  async updateFavorite(walletAddress: string, favorite: boolean) {
    const wallet = await this.findWallet(walletAddress);
    wallet.favorite = favorite;
    return wallet;
  }

  async removeWallet(walletAddress: string) {
    // const index = await this.wallets.indexOf(this.findWallet(walletAddress));
    // this.wallets.splice(index, 1);
    // return [...this.wallets];
  }

  private async findWallet(walletAddress: string): Promise<Wallet> {
    const wallet = await this.walletModel.findById(walletAddress);
    if (!wallet) {
      throw new NotFoundException('Wallet not found');
    }
    return {
      address: wallet.address,
      description: wallet.description,
      favorite: wallet.favorite,
    };
  }
}
