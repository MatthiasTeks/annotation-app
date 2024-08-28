'use client';

import { createUserActionStore, UserActionState } from '@/stores/user-action-store';
import React, { createContext, useContext, useRef } from 'react';
import { useStore } from 'zustand';

export type AnnotationStoreApi = ReturnType<typeof createUserActionStore>;

const UserActionStoreContext = createContext<AnnotationStoreApi | undefined>(undefined);

// eslint-disable-next-line no-unused-vars
export function useActionStore<T>(selector: (state: UserActionState) => T): T {
  const userAction = useContext(UserActionStoreContext);
  if (!userAction) {
    throw new Error('useActionStore must be used within a UserActionStore');
  }
  return useStore(userAction, selector);
}

export function UserActionStoreProvider({ children }: { children: React.ReactNode }) {
  const storeRef = useRef<AnnotationStoreApi>();
  if (!storeRef.current) {
    storeRef.current = createUserActionStore();
  }

  return <UserActionStoreContext.Provider value={storeRef.current}>{children}</UserActionStoreContext.Provider>;
}
