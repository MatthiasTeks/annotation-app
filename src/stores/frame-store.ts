import { AnnotationFrame } from '@prisma/client';
import { createStore } from 'zustand/vanilla';

export interface FrameState {
  selectedFrame: AnnotationFrame | null;
  setSelectedFrame: (frame: AnnotationFrame | null) => void;
}

export const defaultFrameState: FrameState = {
  selectedFrame: null,
  setSelectedFrame: () => {},
};

export const createFrameStore = (initState: FrameState = defaultFrameState) => {
  return createStore<FrameState>()((set) => ({
    ...initState,
    setSelectedFrame: (frame) => set({ selectedFrame: frame }),
  }));
};
