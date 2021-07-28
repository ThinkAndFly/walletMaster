import * as mongoose from 'mongoose';

export const WalletSchema = new mongoose.Schema({
  address: { type: String, required: true },
  description: { type: String, required: false },
  favorite: { type: Boolean, required: true },
});

export interface Wallet extends mongoose.Document {
  address: string;
  description: string;
  favorite: boolean;
}
