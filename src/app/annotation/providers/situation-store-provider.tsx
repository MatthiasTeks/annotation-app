'use client';

import React from 'react';
import { createSituationStore, SituationState } from '@/stores/situation-store';
import { createContext, useContext, useRef } from 'react';
import { useStore } from 'zustand';

export type SituationStoreApi = ReturnType<typeof createSituationStore>;

const SituationStoreContext = createContext<SituationStoreApi | undefined>(undefined);

// eslint-disable-next-line no-unused-vars
export function useSituationStore<T>(selector: (state: SituationState) => T): T {
  const store = useContext(SituationStoreContext);
  if (!store) {
    throw new Error('useSituationStore must be used within a SituationStoreProvider');
  }
  return useStore(store, selector);
}

export function SituationStoreProvider({ children }: { children: React.ReactNode }) {
  const storeRef = useRef<SituationStoreApi>();
  if (!storeRef.current) {
    storeRef.current = createSituationStore();
  }

  return <SituationStoreContext.Provider value={storeRef.current}>{children}</SituationStoreContext.Provider>;
}
