import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import Link from 'next/link'

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
        <nav>
            <Link href="/staffhome"><a>Home</a></Link>
            <Link href="/mtnstaff"><a>Maintain staff</a></Link>
            <Link href="/mtnmenu"><a>Manage menu</a></Link>
            <button style={{float: "right"}} onClick={logout}>Logout</button>
        </nav>
    )
}

export default Nav