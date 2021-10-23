import Link from 'next/link'
import styles from './Navigation.module.css'

export default function Navigation() {
    return (
        <nav className={styles.nav}>
            <ul className={styles.list}>
                <li className={styles.item}>
                    <Link href="/">
                        <a>Home</a>
                    </Link>
                </li>
                <li>
                    <Link href="/add-avatar">
                        <a>Add an avatar</a>
                    </Link>
                </li>
            </ul>
        </nav>
    )
}