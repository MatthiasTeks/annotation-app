import { createStore } from 'zustand/vanilla';

export type UserAction = 'editingSegment' | 'addingComment' | 'addingSituation' | 'viewOnly';

export interface UserActionState {
  userAction: UserAction;
  setUserAction: (action: UserAction) => void;
}

export const defaultUserActionState: UserActionState = {
  userAction: 'viewOnly',
  setUserAction: () => {},
};

export const createUserActionStore = (initState: UserActionState = defaultUserActionState) => {
  return createStore<UserActionState>()((set) => ({
    ...initState,
    setUserAction: (action) => set({ userAction: action }),
  }));
};
