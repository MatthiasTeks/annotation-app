import { ReactNode } from 'react';
import clsx from 'clsx';

interface TypographyProps {
  variant?: 'heading' | 'subheading' | 'paragraph' | 'small';
  customClass?: string;
  className?: string;
  children: ReactNode;
}

export default function Typography({ variant = 'paragraph', customClass, className, children }: TypographyProps) {
  const baseClasses = 'font-poppins';

  let variantClasses = '';

  switch (variant) {
    case 'heading':
      variantClasses = 'text-md font-bold text-foreground';
      break;
    case 'subheading':
      variantClasses = 'text-sm text-muted-foreground';
      break;
    case 'paragraph':
      variantClasses = 'text-sm font-normal text-foreground';
      break;
    case 'small':
      variantClasses = 'text-xs text-foreground';
      break;
    default:
      variantClasses = 'text-base';
  }

  const textSize = customClass || variantClasses;

  return <p className={clsx(baseClasses, textSize, className)}>{children}</p>;
}
