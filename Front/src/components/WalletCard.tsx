import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import walletModel from "../models/wallet.model";
import { useState } from "react";
import { useEffect } from "react";

interface IProps {
    wallet: walletModel
}

const WalletIsOld = (firstTransaction: Date): boolean => {
    if (!firstTransaction)
        return false;

    let date = new Date();
    date.setFullYear(date.getFullYear() - 1);

    if (new Date(firstTransaction) < date)
        return true

    return false;
};

const WalletCard = (props: IProps) => {

    let oldblock = () => {
        if (WalletIsOld(props.wallet.firstTransaction)) {
            return (
                <div className="alert alert-danger" role="alert">
                    <FontAwesomeIcon icon={faExclamationTriangle} />
                    Wallet is old!
                </div>
            )
        }
        else{
            return ( <div className="alert alert-success" role="alert">
                <FontAwesomeIcon icon={faExclamationTriangle} />
                    Wallet is new!
            </div>) 
        }
    }

    return (
        <div className="col-sm-5 offset-sm-1 mx-auto">
            <div className="row">
                {oldblock()}
                <div className="col-sm p-4 bg-light rounded box-shadow border">
                    {props.wallet.eurex}
                    <FontAwesomeIcon className="position-relative float-end" icon={faEdit} />
                </div>

                <div className="col-sm offset-sm-1 p-4 bg-light rounded box-shadow border">
                    <div className="row">
                        <select>
                            <option value="eur">EUR</option>
                            <option value="usd">USD</option>
                        </select></div>
                    <div className="row">{props.wallet.balance} € </div>
                </div>
                <hr className="mb-5 mt-5" />
            </div>
        </div>
    )
}

export default WalletCard