import Section from '@/components/layouts/Section';
import Typography from '@/components/others/Typography';

export default async function Home() {
  return (
    <main className='text-white'>
      <Section>
        <Typography>Hello World</Typography>
      </Section>
      <Typography className='text-foreground'>Hello 2</Typography>
    </main>
  );
}
