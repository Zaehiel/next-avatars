import Link from 'next/link'
import { useRouter } from 'next/router'

export default function Navigation() {
    const router = useRouter();

    return (
        <nav className="p-4">
            <ul className="list-none flex justify-center">
                <li className="mx-2">
                    <Link href="/" >
                        <a className={router.pathname == "/" ? "underline" : ""}>Avatars</a>
                    </Link>
                </li>
                <li className="mx-2">
                    <Link href="/upload">
                        <a className={router.pathname == '' ? "underline" : ""}>Upload</a>
                    </Link>
                </li>
            </ul>
        </nav>
    )
}