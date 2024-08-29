import { Annotation } from '@prisma/client';
import { createStore } from 'zustand/vanilla';

export interface AnnotationsState {
  annotations: Annotation[];
  setAnnotations: (annotations: Annotation[]) => void;
  annotationSelected: Annotation | null;
  setAnnotationSelected: (annotation: Annotation | null) => void;
}

export const defaultAnnotationsState: AnnotationsState = {
  annotations: [],
  setAnnotations: () => {},
  annotationSelected: null,
  setAnnotationSelected: () => {},
};

export const createAnnotationsStore = (initState: AnnotationsState = defaultAnnotationsState) => {
  return createStore<AnnotationsState>()((set) => ({
    ...initState,
    setAnnotations: (annotations) => set({ annotations: annotations }),
    setAnnotationSelected: (annotation) => set({ annotationSelected: annotation }),
  }));
};
