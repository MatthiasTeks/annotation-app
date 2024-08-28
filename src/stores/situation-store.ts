import { AnnotationSituation } from '@prisma/client';
import { createStore } from 'zustand/vanilla';

export interface SituationState {
  selectedSituation: AnnotationSituation | null;
  setSelectedSituation: (situation: AnnotationSituation) => void;
}

export const defaultSituationState: SituationState = {
  selectedSituation: null,
  setSelectedSituation: () => {},
};

export const createSituationStore = (initState: SituationState = defaultSituationState) => {
  return createStore<SituationState>()((set) => ({
    ...initState,
    setSelectedSituation: (situation) => set({ selectedSituation: situation }),
  }));
};
