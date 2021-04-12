import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Navi from '../components/Staffnav'

const Staffhome = ({ users }) => {
    const [name, setName] = useState()
    const [email, setEmail] = useState()
    useEffect(() => {
        setName(sessionStorage.getItem("name"))
        setEmail(sessionStorage.getItem("email"))
        for (const user of users){
            if (user.email == email){
                sessionStorage.setItem("id", user.id)
            }
        }
    })

    return (
        <div>
            <Navi></Navi>
            <h1>Welcome</h1>
            <p>{name}</p>
        </div>
    )
}

export async function getStaticProps() {
    const res = await fetch(`http://localhost:5000/users`)
    const users = await res.json()
    return {
        props: { users },
    }
}

export default Staffhome