'use client';

import { AnnotationSituation } from '@prisma/client';
import { SituationRow } from './SituationRow';
import { useEffect } from 'react';
import { useSituationStore } from '../../../providers/situation-store-provider';

export default function SituationList({ situations }: { situations: AnnotationSituation[] }) {
  const setSelectedSituation = useSituationStore((state) => state.setSelectedSituation);

  useEffect(() => {
    setSelectedSituation(situations[0]);
  }, [setSelectedSituation, situations]);

  return (
    <div className='text-white flex flex-col gap-2'>
      {situations.map((situation) => (
        <SituationRow key={situation.id} situation={situation} />
      ))}
    </div>
  );
}
