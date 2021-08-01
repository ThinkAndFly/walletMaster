import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import walletModel from "../models/wallet.model";

interface IProps {
    wallet: walletModel
}

const WalletCard = (props: IProps) => {
    return (
        <div className="col-sm-5 offset-sm-1 mx-auto">
            <div className="row">
                <div className="alert alert-danger" role="alert">
                    <FontAwesomeIcon icon={faExclamationTriangle} />
                    Wallet is old!
                </div>

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