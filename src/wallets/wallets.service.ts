import { Injectable, NotFoundException } from "@nestjs/common";
import { Wallet } from './wallets.model';

@Injectable()
export class WalletsService {
    wallets : Wallet[] = [];

    insertWallet(address: string, description: string){
        const newWallet = new Wallet(address,description,false);
        this.wallets.push(newWallet);
    }

    getAllWallets(){
        return [...this.wallets];
    }

    getWallet(walletAddress: string){
        const wallet = this.findWallet(walletAddress);
        return {...wallet};
    }

    updateFavorite(walletAddress: string, favorite: boolean)
    {
        const wallet = this.findWallet(walletAddress);
        wallet.favorite = favorite;
        return wallet;
    }

    removeWallet(walletAddress: string)
    {
        const index = this.wallets.indexOf(this.findWallet(walletAddress));
        this.wallets.splice(index,1);
        return [...this.wallets];
    }

    private findWallet(walletAddress: string)
    {
        const wallet = this.wallets.find(w => w.address === walletAddress);
        if(!wallet){
            throw new NotFoundException('Wallet not found');
        }
        return wallet;
    }
}
