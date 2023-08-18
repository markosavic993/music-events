import Link from 'next/link';
import styles from '@/Styles/Header.module.css';
import {FaSignInAlt, FaSignOutAlt} from 'react-icons/fa'
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
          <li>
            <Link href='/account/login' className="btn-secondary btn-icon">
              <FaSignInAlt /> Login
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}
