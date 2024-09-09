'use client';

import { Separator } from '@/components/ui/separator';
import { CrosshairIcon, MessageCircleIcon } from 'lucide-react';
import { useActionStore } from '../../../providers/action-store-provider';
import { UserAction } from '@/stores/user-action-store';
import { AddSituationTool } from './toolbar/AddSituationTool';
import { AnnotationSituation } from '@prisma/client';

export default function Toolbar({ situations }: { situations: AnnotationSituation[] | null }) {
  const userAction = useActionStore((state) => state.userAction);
  const setUserAction = useActionStore((state) => state.setUserAction);

  const handleSetUserAction = (action: UserAction) => {
    setUserAction(action);
  };

  const isActionActive = (action: UserAction) => {
    return userAction === action;
  };

  return (
    <div className='flex items-center gap-2 p-1'>
      <div
        className={`${isActionActive('editingSegment') ? 'bg-primary' : ''} rounded-md h-8 w-8 flex justify-center items-center cursor-pointer`}
        onClick={() => handleSetUserAction('editingSegment')}
      >
        <CrosshairIcon className='h-5 w-5' />
      </div>
      <AddSituationTool
        isActionActive={isActionActive}
        handleSetUserAction={handleSetUserAction}
        situations={situations}
      />
      <div
        className={`${isActionActive('addingComment') ? 'bg-primary' : ''} rounded-md h-8 w-8 flex justify-center items-center cursor-pointer`}
        onClick={() => handleSetUserAction('addingComment')}
      >
        <MessageCircleIcon className='h-5 w-5' />
      </div>
      <Separator orientation='vertical' className='h-[30px] m-1' />
      <div
        className={`${isActionActive('viewOnly') ? 'bg-primary' : 'bg-muted'}  rounded-md flex justify-center items-center cursor-pointer px-2 py-1`}
        onClick={() => handleSetUserAction('viewOnly')}
      >
        <span className='text-xs'>View only</span>
      </div>
    </div>
  );
}
