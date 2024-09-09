import { UserAction } from '@/stores/user-action-store';
import { CirclePlusIcon } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { AnnotationSituation } from '@prisma/client';
import { PopoverAnchor } from '@radix-ui/react-popover';
import * as PopoverPrimitive from '@radix-ui/react-popover';

type Props = {
  isActionActive: (action: UserAction) => boolean;
  handleSetUserAction: (action: UserAction) => void;
  situations: AnnotationSituation[] | null;
};

export const AddSituationTool = ({ isActionActive, handleSetUserAction, situations }: Props) => {
  const hasSituations = situations && situations.length > 0;

  return (
    <Popover defaultOpen={!hasSituations}>
      <PopoverTrigger className='sr-only'>Open</PopoverTrigger>
      <PopoverAnchor>
        <div
          className={`${isActionActive('addingSituation') ? 'bg-primary' : ''} rounded-md h-8 w-8 flex justify-center items-center cursor-pointer`}
          onClick={() => handleSetUserAction('addingSituation')}
        >
          <CirclePlusIcon className='h-5 w-5' />
        </div>
      </PopoverAnchor>
      <PopoverContent side='top' align='start' sideOffset={24} className='border-primary'>
        <PopoverPrimitive.Arrow className='fill-primary' width={20} height={10} />
        Create your first situation here.
      </PopoverContent>
    </Popover>
  );
};
