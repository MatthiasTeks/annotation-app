import { Annotation } from '@prisma/client';
import { createStore } from 'zustand/vanilla';

export interface AnnotationsState {
  annotations: Annotation[];
  setAnnotations: (annotations: Annotation[]) => void;
}

export const defaultAnnotationsState: AnnotationsState = {
  annotations: [],
  setAnnotations: () => {},
};

export const createAnnotationsStore = (initState: AnnotationsState = defaultAnnotationsState) => {
  return createStore<AnnotationsState>()((set) => ({
    ...initState,
    setAnnotations: (annotations) => set({ annotations: annotations }),
  }));
};
