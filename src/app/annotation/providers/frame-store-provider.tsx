'use client';

import React from 'react';
import { createFrameStore, FrameState } from '@/stores/frame-store';
import { createContext, useContext, useRef } from 'react';
import { useStore } from 'zustand';

export type FrameStoreApi = ReturnType<typeof createFrameStore>;

const FrameStoreContext = createContext<FrameStoreApi | undefined>(undefined);

export function useFrameStore<T>(selector: (state: FrameState) => T): T {
  const store = useContext(FrameStoreContext);
  if (!store) {
    throw new Error('useFrameStore must be used within a FrameStoreProvider');
  }
  return useStore(store, selector);
}

export function FrameStoreProvider({ children }: { children: React.ReactNode }) {
  const storeRef = useRef<FrameStoreApi>();
  if (!storeRef.current) {
    storeRef.current = createFrameStore();
  }

  return <FrameStoreContext.Provider value={storeRef.current}>{children}</FrameStoreContext.Provider>;
}
