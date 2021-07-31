import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";
import { faEdit } from "@fortawesome/free-solid-svg-icons";

interface IProps {
    wallets: {
        address: string,
        blanace: string,
        eurex: string,
        usdex: string,
        firstTransaction: Date
    }[]
}

const List: React.FC<IProps> = () => {
    return (
        <div className="row">
            <div className="alert alert-danger" role="alert">
            <FontAwesomeIcon icon={faExclamationTriangle} />
             Wallet is old!
            </div>

            <div className="col-sm p-5 bg-light rounded box-shadow border">
                0.00051
                <FontAwesomeIcon icon={faEdit} />
            </div>

            <div className="col-sm offset-sm-1 p-5 bg-light rounded box-shadow border">
                <div className="row">
                    <select>
                        <option value="eur">EUR</option>
                        <option value="usd">USD</option>
                    </select></div>
                <div className="row">80179660.50€ </div>
            </div>
            <hr className="mb-5 mt-5" />
        </div>
    )
}

export default List