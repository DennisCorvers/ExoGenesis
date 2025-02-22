import React, { createContext, useState, useContext, ReactNode } from "react";

interface ActiveViewContextType {
  activeView: string | null;
  setActiveView: (view: string | null) => void;
}

interface ActiveViewProviderProps {
  children: ReactNode;
}

const ActiveViewContext = createContext<ActiveViewContextType | undefined>(undefined);

export const ActiveViewProvider: React.FC<ActiveViewProviderProps> = ({ children }) => {
  const [activeView, setActiveView] = useState<string | null>(null);

  return (
    <ActiveViewContext.Provider value={{ activeView, setActiveView }}>
      {children}
    </ActiveViewContext.Provider>
  );
};

export const useActiveView = () => {
  const context = useContext(ActiveViewContext);
  if (!context) {
    throw new Error("useActiveView must be used within an ActiveViewProvider");
  }
  return context;
};
