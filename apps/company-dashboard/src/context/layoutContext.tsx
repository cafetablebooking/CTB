/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';

export interface LayoutStateContextProps {
  isSidebarOpened: boolean;
}

const LayoutStateContext = React.createContext<LayoutStateContextProps>({
  isSidebarOpened: true,
});
const LayoutDispatchContext = React.createContext({});

function layoutReducer(state: any, action: any) {
  switch (action.type) {
    case 'TOGGLE_SIDEBAR':
      return { ...state, isSidebarOpened: !state.isSidebarOpened };
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

function LayoutProvider({ children }) {
  const [state, dispatch] = React.useReducer(layoutReducer, {
    isSidebarOpened: true,
  });
  return (
    <LayoutStateContext.Provider value={state}>
      <LayoutDispatchContext.Provider value={dispatch}>
        {children}
      </LayoutDispatchContext.Provider>
    </LayoutStateContext.Provider>
  );
}

function useLayoutState() {
  const context = React.useContext(LayoutStateContext);
  if (context === undefined) {
    throw new Error('useLayoutState must be used within a LayoutProvider');
  }
  return context;
}

function toggleSidebar(dispatch) {
  dispatch({
    type: 'TOGGLE_SIDEBAR',
  });
}

function useLayoutDispatch() {
  const context = React.useContext(LayoutDispatchContext);
  if (context === undefined) {
    throw new Error('useLayoutDispatch must be used within a LayoutProvider');
  }
  return context;
}

export { LayoutProvider, useLayoutState, useLayoutDispatch, toggleSidebar };
