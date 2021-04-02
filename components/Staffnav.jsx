import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import Link from 'next/link'

const Nav = () => {    
    const router = useRouter()
    const[email, setEmail] = useState()

    useEffect(() => {
        setEmail(localStorage.getItem("email"))
        if (email === null) router.push("/")
    })
    const logout = () => {
        localStorage.clear()
        router.push('/')
    }

    return (
        <nav>
            <Link href="mtnstaff"><a>Maintain staff</a></Link>
            <button style={{float: "right"}} onClick={logout}>Logout</button>
        </nav>
    )
}

export default Nav