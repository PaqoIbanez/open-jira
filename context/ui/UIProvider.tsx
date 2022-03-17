import { FC, useReducer } from 'react';

import Cookies from 'js-cookie';

import { UIContext, uiReducer } from './';

export interface UIState {
    sidemenuOpen: boolean;
    isAddingEntry: boolean;
    isDragging: boolean;
    theme: string;
}

const UI_INITIAL_STATE: UIState = {
    sidemenuOpen: false,
    isAddingEntry: false,
    isDragging: false,
    theme: 'dark'
}

export const UIProvider: FC = ({ children }) => {

    const [state, dispatch] = useReducer(uiReducer, UI_INITIAL_STATE)

    const openSideMenu = () => {
        dispatch({ type: '[UI] - Open Sidebar' })
    }

    const closeSideMenu = () => { dispatch({ type: '[UI] - Close Sidebar' }) }

    const setIsAddingEntry = (isAddingEntry: boolean) => {
        dispatch({ type: '[UI] - Set isAddingEntry', payload: isAddingEntry })
    }

    const setStartDragging = () => { dispatch({ type: '[UI] - Start Dragging' }) }

    const setEndDragging = () => { dispatch({ type: '[UI] - End Dragging' }) }

    const toggleTheme = (theme: string) => {
        const toggledTheme = theme === 'dark' ? 'light' : 'dark';
        Cookies.set('theme', toggledTheme);
        dispatch({ type: '[UI] - Toggle Theme', payload: toggledTheme })
    }

    return (
        <UIContext.Provider value={{
            ...state,

            //methods
            openSideMenu,
            setIsAddingEntry,

            closeSideMenu,
            toggleTheme,

            setStartDragging,
            setEndDragging,
        }}>
            {children}
        </UIContext.Provider>
    )
}