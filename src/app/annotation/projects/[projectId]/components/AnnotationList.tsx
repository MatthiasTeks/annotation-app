'use client';

import { useEffect, useState } from 'react';
import { useFrameStore } from '../../providers/frame-store-provider';
import { Pin } from 'lucide-react';
import { Annotation } from '@prisma/client';

export default function AnnotationList() {
  const selectedFrame = useFrameStore((state) => state.selectedFrame);

  const [annotations, setAnnotations] = useState<Annotation[]>([]);

  useEffect(() => {
    const fetchSituations = async () => {
      const response = await fetch(`/api/annotations/?frame=${selectedFrame?.id}`);
      const data = await response.json();
      setAnnotations(data);
    };

    if (selectedFrame?.id) {
      fetchSituations();
    }
  }, [selectedFrame]);

  return (
    <div className='text-white p-2'>
      {annotations?.length > 0 &&
        annotations.map((annotation) => (
          <p key={annotation.id} className='text-sm flex items-center gap-2'>
            <Pin className='mr-2 h-4 w-4' />
            {annotation.name}
          </p>
        ))}
    </div>
  );
}
