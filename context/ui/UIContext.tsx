import { createContext } from 'react'

interface ContextProps {
    sidemenuOpen: boolean;
    isAddingEntry: boolean;
    isDragging: boolean;

    //methods
    openSideMenu: () => void;
    closeSideMenu: () => void;

    setIsAddingEntry: (isAddingEntry: boolean) => void;

    setStartDragging: () => void;
    setEndDragging: () => void;
};

export const UIContext = createContext({} as ContextProps);