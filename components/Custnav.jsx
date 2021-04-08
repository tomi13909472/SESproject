import { useRouter } from 'next/router'
import styles from '../styles/nav.module.css'
import { useState, useEffect } from 'react'

const Nav = () => {    
    const router = useRouter()
    const[email, setEmail] = useState()

    useEffect(() => {
        setEmail(sessionStorage.getItem("email"))
        if (email === null) router.push("/")
    })
    const logout = () => {
        sessionStorage.clear()
        router.push('/')
    }

    return (
        <nav className={styles.cnav}>
            <button className={styles.cbtn} onClick={logout}>Logout</button>
        </nav>
    )
}

export default Nav