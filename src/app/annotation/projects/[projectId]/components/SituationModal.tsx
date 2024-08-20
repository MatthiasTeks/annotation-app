'use client';

import { AnnotationSituation } from '@prisma/client';
import FormSituation from './FormSituation';
import { useActionStore } from '../../providers/annotation-store-provider';

type SituationModalProps = {
  situations: AnnotationSituation[] | null;
  projectId: number;
};

export default function SituationModal({ situations, projectId }: SituationModalProps) {
  const userAction = useActionStore((state) => state.userAction);
  const hasSituations = situations && situations.length > 0;

  if (userAction === 'addingSituation' || !hasSituations) {
    return <FormSituation projectId={projectId} />;
  } else {
    return null;
  }
}
