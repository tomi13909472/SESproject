import { useRouter } from 'next/router'
import { Component } from 'react'

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
            <button style={{float: "right"}} onClick={logout}>Logout</button>
        </nav>
    )
}

export default Nav
