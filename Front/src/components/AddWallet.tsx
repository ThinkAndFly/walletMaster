import React from "react";
import { useState } from "react";
import { IState as Props } from "../App"

interface IProps {
    wallets: Props["wallets"]
    setWallet: React.Dispatch<React.SetStateAction<Props["wallets"]>>
}


const AddWallet: React.FC<IProps> = ({ wallets, setWallet }) => {

    const [input, setInput] = useState({
        address: "",
        description: ""
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
    }

    const handleClick = (): void => {
        if (
            !input.address
        ) { return }

        setWallet([
            ...wallets,
            {
                address: input.address,
                description: input.description,
                balance: "0",
                eurex: "0",
                usdex: "0",
                firstTransaction: new Date()
            }
        ]);

        setInput({
            address: "",
            description: ""})
    }
    
    return (
        <div>
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