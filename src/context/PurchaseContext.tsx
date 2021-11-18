import React, { useContext, useState } from "react";
import { FormValues } from "../components/Shuttles/Form";
import { Shuttle } from "../utils/types";

interface PData {
	inputs: FormValues;
	shuttle: Shuttle;
	price: number;
}

interface Purchase {
	data: PData;
	updatePurchaseData: (
		inputs: FormValues,
		shuttle: Shuttle,
		price: number
	) => void;
}

const defaultValues = {
	inputs: { name: "", surname: "", seat: "", extras: [""] },
	shuttle: {
		id: 0,
		name: "",
		capacity: 0,
		launchpadLocation: "",
		basePrice: "0",
		discount: 0,
		etd: 0,
		eta: 0,
		availableSeats: [""],
	},
	price: 0,
};

const defaultUpdate = (inputs: FormValues, shuttle: Shuttle, price: number) => {}
const PurchaseContext = React.createContext<Purchase>({ data: defaultValues, updatePurchaseData: defaultUpdate });
const usePurchaseContext = () => useContext(PurchaseContext);

const PurchaseProvider = ({ children }: any) => {
	const [purchaseData, setPurchaseData] = useState(defaultValues);

	return (
		<PurchaseContext.Provider
			value={{
				data: purchaseData,
				updatePurchaseData: (inputs, shuttle, price) => {
					setPurchaseData({ inputs, shuttle, price });
				},
			}}
		>
			{children}
		</PurchaseContext.Provider>
	);
};

export { PurchaseProvider, usePurchaseContext };
