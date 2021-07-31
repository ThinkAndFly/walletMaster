import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import List from "./components/List";
import AddWallet from './components/AddWallet';


export interface IState {
  wallets: {
    address: string,
    description: string,
    balance: string,
    eurex: string,
    usdex: string,
    firstTransaction: Date
  }[]
}

function App() {

  const [wallets, setWallet] = useState<IState["wallets"]>([{
    address: "123123qerwerwerwreer",
    description: "test",
    balance: "0.0004",
    eurex: "0.50501",
    usdex: "0.23423423",
    firstTransaction: new Date()
  }])

  return (
    <div className="App">
      <h1 className="border-bottom p-3 mb-3">Wallet Master</h1>
      <main role="main" className="container">
        <List wallets={wallets} />
        <AddWallet wallets={wallets} setWallet={setWallet}/>
      </main>
    </div>
  );
}

export default App;
