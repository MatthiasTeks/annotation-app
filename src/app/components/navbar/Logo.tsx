'use client';

import Image from 'next/image';
import MyLightImage from '../../../../public/logo.webp';
import MyDarkImage from '../../../../public/logo-black.webp';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export default function Logo() {
  const { theme } = useTheme();

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <>
      <Image src={MyLightImage} className={theme === 'light' ? 'hidden' : ''} alt='company name' width={200} />
      <Image src={MyDarkImage} priority className={theme === 'dark' ? 'hidden' : ''} alt='company name' width={200} />
    </>
  );
}
