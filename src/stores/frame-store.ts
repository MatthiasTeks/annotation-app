import { AnnotationFrame } from '@prisma/client';
import { createStore } from 'zustand/vanilla';

export interface FrameState {
  selectedFrame: AnnotationFrame | null;
  // eslint-disable-next-line no-unused-vars
  setSelectedFrame: (frame: AnnotationFrame) => void;
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
