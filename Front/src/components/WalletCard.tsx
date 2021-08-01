import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faExclamationTriangle, faTimes } from "@fortawesome/free-solid-svg-icons";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import walletModel from "../models/wallet.model";
import { useState } from "react";
import axios from 'axios';


interface IProps {
    wallet: walletModel
}

const api = axios.create({
    baseURL: 'http://localhost:3000/wallets'
})

const WalletIsOld = (firstTransaction: Date): boolean => {
    if (!firstTransaction)
        return false;

    let date = new Date();
    date.setFullYear(date.getFullYear() - 1);

    if (new Date(firstTransaction) < date)
        return true

    return false;
};

const WalletCard: React.FC<IProps> = (props: IProps) => {

    const [currency, setCurrency] = useState<string>("usd")
    const [edit, setEdit] = useState<boolean>(false)
    const [currentExchange, setCurrentExchange] = useState<string>(props.wallet.usdEx)

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>): void => {

        switch (e.target.value) {
            case "usd": setCurrency(e.target.value);
                setCurrentExchange(props.wallet.usdEx);
                break;
            case "eur":
                setCurrency(e.target.value);
                setCurrentExchange(props.wallet.eurEx);
                break;
        }
    }

    const handleNewExchangeRateChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        let value = e.target.value;
        if (parseFloat(value) || value === "0" || parseFloat(value) === 0)
            setCurrentExchange(value);

        if (!value)
            setCurrentExchange("0");
    }

    const ageBlock = () => {
        if (WalletIsOld(props.wallet.firstTransaction)) {
            return (
                <div className="alert alert-danger" role="alert">
                    <FontAwesomeIcon icon={faExclamationTriangle} />
                    Wallet is old!
                </div>
            )
        }
        else {
            return (<div className="alert alert-success" role="alert">
                <FontAwesomeIcon icon={faExclamationTriangle} />
                Wallet is new!
            </div>)
        }
    }

    const balanceBlock = () => {
        let balance: number;
        if (currency === "usd") {
            balance = parseFloat(props.wallet.balance) / parseFloat(props.wallet.usdEx);
            return (
                <b> {balance.toFixed(2)} $</b>
            )
        }
        if (currency === "eur") {
            balance = parseFloat(props.wallet.balance) / parseFloat(props.wallet.eurEx);
            return (
                <b> {balance.toFixed(2)} €</b>
            )
        }
    }
    const setEditModeOn = () => {
        setEdit(true);
    }

    const setEditModeOff = () => {
        setEdit(false);
    }

    const saveExchangeRate = async () => {
        let url: string;

        switch (currency) {
            case "usd": {
                url = "usdex/" + props.wallet.address;
                let resp = await api.patch(url, {
                    usdex: currentExchange
                });
                if (resp.data)
                    props.wallet.usdEx = resp.data.usdEx;
                break;
            }
            case "eur":
                url = "eurex/" + props.wallet.address;
                let resp = await api.patch(url, {
                    eurex: currentExchange
                });
                if (resp.data)
                    props.wallet.eurEx = resp.data.eurEx;
                break;
        }

        setEdit(false);
    }

    const exchangeRateBlock = () => {
        if (edit) {
            return (
                <div className="col-sm bg-light rounded box-shadow border">
                    <div className="row">
                        <div className="position-relative float-end">
                            <button onClick={saveExchangeRate}
                                className="btn w-auto position-relative float-end"><FontAwesomeIcon className="okColor" icon={faCheck} /> </button>
                            <button onClick={setEditModeOff}
                                className="btn w-auto position-relative float-end"><FontAwesomeIcon className="cancelColor" icon={faTimes} /> </button>
                        </div>
                    </div>
                    <div className="row balanceRow">
                        <input
                            type="text"
                            className="w-auto mx-3"
                            name="currentExchange"
                            value={currentExchange}
                            onChange={handleNewExchangeRateChange}
                        />
                    </div>
                </div>
            )
        }
        else {
            return (
                <div className="col-sm bg-light rounded box-shadow border">
                    <div className="row">
                        <div className="position-relative float-end">
                            <button onClick={setEditModeOn}
                                className="btn w-auto position-relative float-end"><FontAwesomeIcon className="editColor" icon={faEdit} /> </button>
                        </div>
                    </div>
                    <div className="row balanceRow"> <b>{currentExchange}</b></div>
                </div>
            )
        }
    }

    return (
        <div className="col-sm-5 offset-sm-1 mx-auto">
            <div className="row">
                {ageBlock()}
                {exchangeRateBlock()}

                <div className="col-sm offset-sm-1 p-4 bg-light rounded box-shadow border">
                    <div className="row">
                        <select onChange={handleChange} defaultValue="usd">
                            <option value="usd">USD</option>
                            <option value="eur">EUR</option>
                        </select></div>
                    <div className="row balanceRow mt-3">{balanceBlock()} </div>
                </div>
                <hr className="mb-5 mt-5" />
            </div>
        </div>
    )
}

export default WalletCard