import { FC, useReducer } from 'react';
import { UIContext, uiReducer } from './';

export interface UIState {
    sidemenuOpen: boolean;
    isAddingEntry: boolean;
    isDragging: boolean;
}

const UI_INITIAL_STATE: UIState = {
    sidemenuOpen: false,
    isAddingEntry: false,
    isDragging: false,
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

    return (
        <UIContext.Provider value={{
            ...state,

            //methods
            openSideMenu,
            setIsAddingEntry,

            closeSideMenu,

            setStartDragging,
            setEndDragging,
        }}>
            {children}
        </UIContext.Provider>
    )
}