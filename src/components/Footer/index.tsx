//import styles from './styles.module.css';
import Link from 'next/link';

export function Footer() {
  return (
    <footer className='pb-16 text-center mt-6'>
      <p>
        <span className='text-[10px]/tight text-slate-600'>
          Copyright &copy; {new Date().getFullYear()}
        </span>
        <Link className='text-slate-950 ml-2 text-[10px]/tight' href='/'>
          | The Blog
        </Link>
      </p>
    </footer>
  );
}
