'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navigation: { title: string; href: string }[] = [
  { title: 'Annotations', href: '/annotation/projects' },
  { title: 'Preview', href: '/preview' },
];

export default function Links() {
  const pathname = usePathname();

  const navItems = navigation.map((item) => {
    const isActive = pathname === item.href;
    const baseClass = 'px-4 py-2 text-sm font-medium transition duration-300 ease-in-out';
    const activeClass = 'text-foreground';
    const inactiveClass = 'text-foreground/50 hover:text-foreground';

    const className = `${baseClass} ${isActive ? activeClass : inactiveClass}`;
    return { ...item, className };
  });

  return (
    <div>
      {navItems.map((item) => (
        <Link key={item.title} href={item.href}>
          <span className={item.className}>{item.title}</span>
        </Link>
      ))}
    </div>
  );
}
