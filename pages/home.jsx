import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'


const Home = () => {
    const [email, setEmail] = useState()
    const router = useRouter()



    useEffect(() => {
        const foundEmail = localStorage.getItem("name")
        if(!foundEmail) {
            router.push("/")
        }
        setEmail(localStorage.getItem("name"))
    })



    return (
        <div>
            <h1>Welcome</h1>
            <p>{email}</p>
        </div>
    )
}

export default Home