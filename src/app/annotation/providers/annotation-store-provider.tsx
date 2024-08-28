'use client';

import React from 'react';
import { createContext, useContext, useRef } from 'react';
import { useStore } from 'zustand';
import { AnnotationsState, createAnnotationsStore } from '@/stores/annotations-store';

export type AnnotationsStoreApi = ReturnType<typeof createAnnotationsStore>;

const AnnotationsStoreContext = createContext<AnnotationsStoreApi | undefined>(undefined);

export function useAnnotationsStore<T>(selector: (state: AnnotationsState) => T): T {
  const store = useContext(AnnotationsStoreContext);
  if (!store) {
    throw new Error('useAnnotationsStore must be used within a AnnotationsStoreProvider');
  }
  return useStore(store, selector);
}

export function AnnotationsStoreProvider({ children }: { children: React.ReactNode }) {
  const storeRef = useRef<AnnotationsStoreApi>();
  if (!storeRef.current) {
    storeRef.current = createAnnotationsStore();
  }

  return <AnnotationsStoreContext.Provider value={storeRef.current}>{children}</AnnotationsStoreContext.Provider>;
}
