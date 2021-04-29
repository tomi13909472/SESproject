import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import styles from '../styles/staffnav.module.css'
const Nav = ({ staff }) => {    
    const router = useRouter()
    const[id, setId] = useState()

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
            <Link href="/staffhome"><a>Home</a></Link>
            <Link href="/mtnstaff"><a>Maintain staff</a></Link>
            <Link href="/mtnmenu"><a>Manage menu</a></Link>
            <Link href='/staffviewbook'><a>View Bookings</a></Link>
            <button className={styles.sbtnClass} onClick={logout}>Logout</button>
        </nav>
    )
}

export async function getStaticProps() {

    const resp = await fetch(`http://localhost:5000/staff`)
    const staff = await resp.json()
    return {
        props: { staff },
    }
}

export default Nav