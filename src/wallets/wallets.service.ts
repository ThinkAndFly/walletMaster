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
    return {
        address: wallet.address,
        description: wallet.description,
        favorite: wallet.favorite,
      };
  }

  async updateFavorite(walletAddress: string, favorite: boolean) {
    const wallet = await this.findWallet(walletAddress);
    if(favorite !== undefined)
        wallet.favorite = favorite;
    await wallet.save();
    return wallet;
  }

  async removeWallet(walletAddress: string) {
    const result = await this.walletModel.deleteOne({address: walletAddress}).exec();
    if(result.n === 0){
        throw new NotFoundException('Wallet not found');
    }
}

  private async findWallet(walletAddress: string): Promise<Wallet> {
    const wallet = await this.walletModel.findOne({address: walletAddress}).exec();
    if (!wallet) {
      throw new NotFoundException('Wallet not found');
    }
    return wallet;
  }
}
