import SegmentList from './SegmentList';

export default function SegmentPanel({ projectId }: { projectId: string }) {
  return (
    <div className='text-white'>
      <h1>Segment Panel</h1>
      <SegmentList projectId={projectId} />
    </div>
  );
}
