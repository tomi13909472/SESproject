import { useState } from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'
import styles from '../styles/login.module.css'
const login = ({ users }) => {

    const [show, setShow] = useState(false)
    const router = useRouter()

    const check = async (event) => {
        event.preventDefault()

        let cont = false
        let name, id, staff
        const email = event.target.email.value
        const password = event.target.pwd.value

        for (const user of users){
            if (email == user.email){
                if (password == user.password){
                    name = user.name
                    staff = user.staff
                    cont = true;
                }
            }
        }
        if (cont){
            sessionStorage.setItem("name", name)
            sessionStorage.setItem("email", email)
            sessionStorage.setItem("id", id)
            if (staff) router.push('/staffhome')
            else router.push('/home')
        }
        else {
            setShow(true)
        }


    }

    return (
            <div className={styles.Login}>
                {show ? <p>Incorrect credentials or account does not exist</p> : null}
                <form className={styles.loginbox} onSubmit={check}>
                    <h1>Login</h1>
                    <table>
                        <tbody>
                            <tr>
                                <td><label htmlFor="email">Email:</label></td>
                                <td><input required type="email" name="email" id="email"/><div className={styles.hideE}>Enter your email.</div></td>
                            </tr>
                            <tr>
                            <td><label htmlFor="pwd">Password:</label></td>
                                <td><input required type="password" name="pwd" id="pwd"/><div className={styles.hideP}>Enter your password.</div></td>
                            </tr>
                        </tbody>
                    </table>
                    <input type="submit" value="Login"/>
                </form>
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

export default login