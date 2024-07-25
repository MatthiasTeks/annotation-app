'use client';

import Image from 'next/image';
import MyLightImage from '../../../../public/logo.png';
import MyDarkImage from '../../../../public/logo-black.png';
import { useTheme } from 'next-themes';

export default function Logo() {
  const { theme } = useTheme();

  if (theme === 'dark') {
    return <Image src={MyLightImage} alt='company name' width={200} height={200} />;
  } else if (theme === 'light') {
    return <Image src={MyDarkImage} alt='company name' width={200} height={200} />;
  }
}
