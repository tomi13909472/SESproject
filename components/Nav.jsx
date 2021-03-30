import { useRouter } from 'next/router'
import { Component } from 'react'
import styles from '../styles/nav.module.css'
const Nav = () => {    
    const router = useRouter()
    if (localStorage.getItem("email") == null)
        router.push('/')
    const logout = () => {
        localStorage.removeItem("name")
        localStorage.removeItem("email")
        router.push('/')
    }

    return (
        <nav>
            <button className={styles.btn} onClick={logout}>Logout</button>
        </nav>
    )
}

export default Nav
