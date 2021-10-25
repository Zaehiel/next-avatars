import Link from 'next/link'

export default function Navigation() {
    return (
        <nav className="p-4">
            <ul className="list-none flex justify-center">
                <li className="mx-2">
                    <Link href="/">
                        <a>Avatars</a>
                    </Link>
                </li>
                <li className="mx-2">
                    <Link href="/add-avatar">
                        <a>Upload</a>
                    </Link>
                </li>
            </ul>
        </nav>
    )
}