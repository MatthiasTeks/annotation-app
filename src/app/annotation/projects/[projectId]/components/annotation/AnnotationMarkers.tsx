import { ClickedPosition } from '@/types/types';
import { createPortal } from 'react-dom';

type Props = {
  clickedPosition: ClickedPosition | null;
};

export default function AnnotationMarkers({ clickedPosition }: Props) {
  if (clickedPosition === null) return null;

  return createPortal(<CircleMarker clickedPosition={clickedPosition} />, document.body);
}

const CircleMarker = ({ clickedPosition }: { clickedPosition: ClickedPosition }) => {
  const { globalPosition } = clickedPosition;

  const top = globalPosition.y;
  const left = globalPosition.x;

  const baseClass =
    'bg-transparent z-50 shadow-lg absolute rounded-full w-6 h-6 border-8 cursor-pointer border-primary';

  return (
    <div
      className={baseClass}
      style={{
        top: top - 3,
        left: left - 3,
        position: 'absolute',
      }}
    />
  );
};
