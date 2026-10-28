import Link from 'next/link';
import clsx from 'clsx';

type PostHeadingProps = {
  children: React.ReactNode;
  url: string;
  as?: 'h1' | 'h2';
};

// mapping das classes com h1.., h3
const headingClassesMap = {
  h1: 'text-2xl/tight sm:text-4xl font-extrabold',
  h2: 'text-2xl/tight font-bold',
};

const comonClasses = '';

export function PostHeading({
  url,
  as: Tag = 'h2',
  children,
}: PostHeadingProps) {
  return (
    <Tag className={clsx(headingClassesMap[Tag], comonClasses)}>
      <Link className='group-hover:text-slate-600 transition' href={url}>
        {children}
      </Link>
    </Tag>
  );
}
