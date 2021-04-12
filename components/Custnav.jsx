import { useRouter } from 'next/router'
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
        <nav>
            <button style={{float: "right"}} onClick={logout}>Logout</button>
        </nav>
    )
}

export default Nav