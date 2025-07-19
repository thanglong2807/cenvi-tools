"use client"
import React, { createContext, useContext, useState, ReactNode } from 'react';

// Định nghĩa kiểu dữ liệu cho context
interface GlobalContextType {
  globalValue: any;
  setGlobalValue: React.Dispatch<React.SetStateAction<any>>;
  addressData: any;
  setAddressData: React.Dispatch<React.SetStateAction<any>>;
}

// Tạo context mặc định
const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

// Provider
export const GlobalProvider = ({ children }: { children: ReactNode }) => {
  const [globalValue, setGlobalValue] = useState<any>(null);
  const [addressData, setAddressData] = useState<any>(null);

  // Load data.json khi Provider mount
  React.useEffect(() => {
    import('./(main)/changeaddressbiz/addref/data.json')
      .then((module) => {
        setAddressData(module.default || module);
      })
      .catch((err) => {
        console.error('Không thể load address data:', err);
      });
  }, []);

  return (
    <GlobalContext.Provider value={{ globalValue, setGlobalValue, addressData, setAddressData }}>
      {children}
    </GlobalContext.Provider>
  );
};

// Custom hook để sử dụng context
export const useGlobalContext = () => {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error('useGlobalContext must be used within a GlobalProvider');
  }
  return context;
};

// Custom hook chỉ lấy addressData
export const useAddressData = () => {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error('useAddressData must be used within a GlobalProvider');
  }
  return {
    addressData: context.addressData,
    setAddressData: context.setAddressData,
  };
};
