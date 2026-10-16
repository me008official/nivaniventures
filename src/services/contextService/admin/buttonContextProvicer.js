"use client"
import { createContext, useContext, useState } from "react";

const ButtonContext = createContext();

export const ButtonProvider = ({ children }) => {
    const [globalAddproduct, setGlobaladdP] = useState(null);

    const handleAddProduct = (viewName) => {
        setGlobaladdP(viewName);
    };

    return (
        <ButtonContext.Provider value={{ handleAddProduct, globalAddproduct }}>
            {children}
        </ButtonContext.Provider>
    );
};

export const useButton = () => useContext(ButtonContext);