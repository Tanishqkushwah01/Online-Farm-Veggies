import { useContext } from "react";

import { CustomerFarmerProductContext } from "../context/CustomerFarmerProductContext";

export const useCustomerFarmerProducts = () => {

    const context = useContext(CustomerFarmerProductContext);

    if (!context) {

        throw new Error("useCustomerFarmerProducts must be inside Provider");
    }
    return context;
};