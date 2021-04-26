import { useEffect, useState } from 'react'
import Navi from '../components/Custnav'
import styles from '../styles/CustHome.module.css'
const Home = ({ users, bookings }) => {
    const [name, setName] = useState()
    const [once, setOnce] = useState(true)
    let today = new Date().toISOString().slice(0, 10)
    useEffect(() => {
        if (once == true) {
            let count = 0
            let user
            setName(sessionStorage.getItem("name"))
            for (const cust of users) {
                if (sessionStorage.getItem("id") == cust.id) {
                    user = cust
                }
            }
            console.log(today)
            for (const book of bookings) {
                if (book.personId == user.id && book.date < today){
                    count++
                }
            }
            count = Math.ceil(count / 4)
            if (count > 5) {
                count = 5
            }
            if (user.loyalty < count){
                updateLoy(count, user)
            }
            setOnce(false)
        }
    })

    async function updateLoy(count, user) {
        const res = await fetch(
            `http://localhost:5000/users/${user.id}`,
            {
                method: 'PUT',
                body: JSON.stringify({
                    name: user.name,
                    email: user.email,
                    phone: user.phone,
                    loyalty: count,
                    password: user.password
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        )
    }

    return (
        <div className={styles.CustHomepage}>
            <Navi></Navi>
            <h1>Welcome</h1>
            <p>{name}</p>
        </div>
    )
}

export async function getStaticProps() {

    const resp = await fetch(`http://localhost:5000/users`)
    const users = await resp.json()

    const res = await fetch(`http://localhost:5000/bookings`)
    const bookings = await res.json()
    return {
        props: { users, bookings },
    }
}

export default Home