import React from "react";
import { useState } from "react";
import walletModel from "../models/wallet.model";
import axios from 'axios';

interface IProps {
    setWallets: React.Dispatch<React.SetStateAction<walletModel[]>>,
    wallets: walletModel[]
}

const api = axios.create({
    baseURL: 'http://localhost:3000/wallets'
})


const AddWallet: React.FC<IProps> = ({ setWallets, wallets }) => {

    const [input, setInput] = useState({
        address: "",
        description: ""
    })

    const [error, setError] = useState<boolean>(false)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
    }

    const handleClick = async () => {
        if (
            !input.address
        ) { return }

        let newWallet: walletModel = {
            address: input.address,
            description: input.description,
            balance: "0",
            eurEx: "0",
            usdEx: "0",
            favorite: false,
            firstTransaction: new Date()
        }

        try {
            let response = await api.post('', {
                address: newWallet.address,
                description: newWallet.description
            });

            if (response.data.address) {
                wallets.push(response.data);
                setWallets(
                    [...wallets]
                )

                setInput({
                    address: "",
                    description: ""
                })

                setError(false);
            }
            else {
                setError(true);
            }
        }
        catch {
            setError(true);
        }
    }

    const showError = () => {
        if (error)
            return (
                <label> Check wallet address. (Duplicated or wrong format). </label>
            )
    }

    return (
        <div className="border col-sm-6 p-3 offset-sm-3">
            {showError()}
            <input
                type="text"
                placeholder="Address"
                className="AddWallet"
                value={input.address}
                onChange={handleChange}
                name="address"
            />
            <input
                type="text"
                placeholder="Description"
                className="AddWallet"
                value={input.description}
                onChange={handleChange}
                name="description"
            />
            <button
                className="btn border"
                onClick={handleClick}
            >Add Wallet</button>
        </div>
    )
}

export default AddWallet