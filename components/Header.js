import Link from 'next/link';
import styles from '@/Styles/Header.module.css';
import Search from "@/components/Search";

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Link href='/'>DJ Events</Link>
      </div>

      <Search />

      <nav>
        <ul>
          <li>
            <Link href='/events'>Events</Link>
          </li>
          <li>
            <Link href='/events/add'>Add Event</Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}
