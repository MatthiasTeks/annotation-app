import Section from '@/components/layouts/Section';

export default function Page() {
  return (
    <div className='relative flex gap-2 h-full w-full'>
      <div className='flex h-full w-1/6'>
        <Section> </Section>
      </div>

      <div className='flex h-full w-4/6'></div>

      <div className='flex h-full w-1/6'>
        <Section> </Section>
      </div>
    </div>
  );
}
