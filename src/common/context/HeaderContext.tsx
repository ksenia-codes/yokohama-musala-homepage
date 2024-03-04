import React, { useState, createContext, FC } from "react";

interface Props {
  children?: React.ReactNode;
}

export type HeaderContextType = {
  activeTab: string;
  updateActiveTab: (tab: string) => void;
};

export const HeaderContext = createContext<HeaderContextType>({
  activeTab: "",
  updateActiveTab: () => {},
});

export const HeaderProvider: FC<Props> = ({ children }) => {
  // useState
  const [activeTab, setActiveTab] = useState("");

  // functions
  const updateActiveTab = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <HeaderContext.Provider value={{ activeTab, updateActiveTab }}>
      {children}
    </HeaderContext.Provider>
  );
};
