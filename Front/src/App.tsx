import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import List from "./components/List";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface IState {
  wallets: {
    address: string,
    blanace: string,
    eurex: string,
    usdex: string,
    firstTransaction: Date
  }[]
}

function App() {

  const [wallets, setWallet] = useState<IState["wallets"]>([])

  return (
    <div className="App">
      <h1 className="border-bottom p-3 mb-3">Wallet Master</h1>
      <main role="main" className="container">
        <List wallets={wallets} />
      </main>
    </div>
  );
}

export default App;
