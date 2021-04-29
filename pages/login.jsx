import { useState } from 'react'
import { useRouter } from 'next/router'
import styles from '../styles/Login.module.css'
const login = ({ users, staff }) => {

    const [show, setShow] = useState(false)
    // const [id, setId] = useState()
    const router = useRouter()

    const check = async (event) => {
        event.preventDefault()

        let cont = false
        let isStaff = false
        let name
        let id
        const email = event.target.email.value
        const password = event.target.pwd.value

        for (const user of users){
            if (email == user.email){
                if (password == user.password){
                    name = user.name
                    id = user.id
                    cont = true
                    break;
                }
            }
        }
        for (const mem of staff) {
            if (email == mem.email) {
                if (password == mem.password){
                    name = mem.name
                    id = mem.id
                    cont = true;
                    isStaff = true
                    break;
                }
            }
        }
        if (cont){
            sessionStorage.setItem("id", id)
            sessionStorage.setItem("name", name)
            sessionStorage.setItem("email", email)
            if (isStaff) router.push('/staffhome')
            else router.push('/custhome')
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

    const resp = await fetch(`http://localhost:5000/staff`)
    const staff = await resp.json()
    return {
        props: { users, staff },
    }
}

export default login
