import { createContext } from 'react'

interface ContextProps {
    sidemenuOpen: boolean;
    isAddingEntry: boolean;
    isDragging: boolean;
    theme: string;

    //methods
    openSideMenu: () => void;
    closeSideMenu: () => void;

    setIsAddingEntry: (isAddingEntry: boolean) => void;
    toggleTheme: (theme: string) => void;

    setStartDragging: () => void;
    setEndDragging: () => void;
};

export const UIContext = createContext({} as ContextProps);