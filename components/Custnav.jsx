import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import styles from '../styles/custnav.module.css'
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

    return (
        <nav className={styles.cnav}>
            <div className={styles.lk}>
                <Link href="/custhome"><a>Home</a></Link>
                <Link href="/updateCust"><a>Profile</a></Link>
                <Link href="/booktable"><a>Book Table</a></Link>
                <Link href="/viewbookings"><a>Bookings</a></Link>
            </div>
            <button className={styles.cbtn} onClick={logout}>Logout</button>
        </nav>
    )
}

export default Nav