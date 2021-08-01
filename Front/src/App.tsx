import React, { useState, useEffect } from 'react';
import './App.css';
import AddWallet from './components/AddWallet';
import axios, { AxiosResponse } from 'axios';
import walletModel from './models/wallet.model';
import WalletCard from './components/WalletCard';


function App() {

  const api = axios.create({
    baseURL: 'http://localhost:3000/wallets'
  })

  const [wallets, setWallets] = useState<walletModel[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  const GetWallets = async () => {
    var resp: AxiosResponse<any> = await api.get('')
    setWallets(resp.data);
    setLoading(false);
  };

  useEffect(() => {
    GetWallets()
  }, [])

  return (
    <div className="App">
      <h1 className="border-bottom p-3 mb-3">Wallet Master</h1>

      <div className="spinner-border text-primary" role="status" hidden={!loading}></div>

      <main role="main" className="container">
        <div className="row">
          {wallets.length > 0 && wallets.map((item: walletModel, index: number) => {
            return (
              <WalletCard key={index} wallet={item} />
            )
          })}
        </div>
        <AddWallet setWallets={setWallets} wallets={wallets} />
      </main>
    </div>
  );
}

export default App;
