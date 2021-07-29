export class WalletResult {
    status: string;
    message: string;
    result: internalWalletResult[];
  }
  
export class internalWalletResult{
    blockNumber: string;
    timeStamp: string;
    hash: string;
    nonce: string;
    blockHash: string;
    transactionIndex: number;
    from: string;
    to: string;
    value: string;
    gas: string;
    gasPrice: string;
    isError: string;
    txreceipt_status: string;
    input: string;
    contractAddress : string;
    cumulativeGasUsed: string;
    gasUsed: string;
    confirmations: string;
}

export class BasicResult {
    status: string;
    message: string;
    result: string;
  }