import { formatDateTime, formatDistanceToNow } from '@/utils/format-DateTime';

type PostDateProps = {
  dateTime: string;
};

export function PostDate({ dateTime }: PostDateProps) {
  return (
    <time
      className='text-slate-600 text-sm/tight'
      dateTime={formatDateTime(dateTime)}
      title={formatDistanceToNow(dateTime)}
    >
      {formatDateTime(dateTime)}
    </time>
  );
}
