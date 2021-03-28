import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Navi from '../components/Nav'

const Home = () => {
    const [name, setName] = useState()

    useEffect(() => {
        setName(localStorage.getItem("name"))
    })


    return (
        <div>
            <Navi></Navi>
            <h1>Welcome</h1>
            <p>{name}</p>
        </div>
    )
}

export default Home