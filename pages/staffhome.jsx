import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Navi from '../components/Staffnav'
import styles from '../styles/staffhome.module.css'
const Staffhome = () => {
    const [name, setName] = useState()

    useEffect(() => {
        setName(sessionStorage.getItem("name"))
    })

    return (
        <div className={styles.Staffhome}>
            <Navi></Navi>
            <h1>Welcome</h1>
            <p>{name}</p>
        </div>
    )
}

export default Staffhome