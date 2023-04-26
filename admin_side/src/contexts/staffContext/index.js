import React, { createContext, useState } from 'react';

export const StaffContext = createContext();

const StaffContextMethods = () => {
    const [staffs, setStaffs] = useState([]);
    const setter = (newStaffs) => {     
        setStaffs(newStaffs);
    }
    
    return {
        value: staffs,
        setter,
    };
}; 


export const StaffContextProvider = ({ children }) => {
    return (
        <StaffContext.Provider value={StaffContextMethods()}>
            {children}
        </StaffContext.Provider>
    );
}

