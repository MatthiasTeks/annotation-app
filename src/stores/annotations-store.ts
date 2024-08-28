import { Annotation } from '@prisma/client';
import { createStore } from 'zustand/vanilla';

export interface AnnotationsState {
  annotations: Annotation[];
  // eslint-disable-next-line no-unused-vars
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
