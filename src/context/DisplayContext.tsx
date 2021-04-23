import { createContext, FC, useState } from "react";

interface DisplayContextInterface {
  isSideBoxOpen: boolean;
  setIsSideBoxOpen: (isSideBoxOpen: boolean) => void;
}

const contextDefaultValues: DisplayContextInterface = {
  isSideBoxOpen: false,
  setIsSideBoxOpen: () => {},
};

export const DisplayContext = createContext<DisplayContextInterface>(
  contextDefaultValues
);

export const DisplayProvider: FC = ({ children }) => {
  const [isSideBoxOpen, setIsSideBoxOpen] = useState<boolean>(false);
  return (
    <DisplayContext.Provider value={{ isSideBoxOpen, setIsSideBoxOpen }}>
      {children}
    </DisplayContext.Provider>
  );
};
