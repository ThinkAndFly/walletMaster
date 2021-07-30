import * as mongoose from 'mongoose';

export const WalletSchema = new mongoose.Schema({
  address: { type: String, required: true },
  description: { type: String, required: false },
  favorite: { type: Boolean, required: true },
  firstTransaction: {type: Date, required: false},
  usdEx: {type: String, required: true},
  eurEx: {type: String, required: true}
});

export interface Wallet extends mongoose.Document {
  address: string;
  description: string;
  favorite: boolean;
  firstTransaction: Date;
  usdEx: string;
  eurEx: string;
}
