import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import styles from '../styles/staffnav.module.css'
const Nav = () => {
    const router = useRouter()
    const [id, setId] = useState()

    useEffect(() => {
        setId(sessionStorage.getItem("id"))
        if (id === null) router.push('/')
    })
    const logout = () => {
        sessionStorage.clear()
        router.push('/')
    }
    // const sbtnClass = classNames('sbtn', 'sbtn1')

    return (
        <nav className={styles.snav}>
            <div className={styles.lk}>
                <Link href="/staffhome"><a>Home</a></Link>
                <Link href="/mtnstaff"><a>Staff</a></Link>
                <Link href="/mtnmenu"><a>Menu</a></Link>
                <Link href='/staffviewbook'><a>Bookings</a></Link>
                <Link href='/financials'><a>Financials</a></Link>
            </div>
            <button className={styles.sbtnClass} onClick={logout}>Logout</button>
        </nav>
    )
}

export default Nav