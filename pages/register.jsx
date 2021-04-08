import { useRouter } from 'next/router'
import { useState } from 'react'
import styles from '../styles/Register.module.css'
const register = ({ users, code }) => {
    const [show, setShow] = useState(false)
    const router = useRouter()


    async function onSubmit(event) {
        event.preventDefault()

        let cont = true
        let staff = false
        const name = event.target.name.value
        const email = event.target.email.value
        const phone = event.target.phone.value
        const password = event.target.pwd.value
        const passcode = event.target.psc.value



        if (passcode == code)
            staff = true

        for (const user of users) {
            if (user.email == email) {
                setShow(true)
                cont = false
                break
            }
        }
        if (cont) {
            const res = await fetch(
                `http://localhost:5000/users`,
                {
                    method: 'POST',
                    body: JSON.stringify({
                        name: name,
                        email: email,
                        phone: phone,
                        password: password,
                        staff: staff
                    }),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            )
            if (res.status == 201) {
                sessionStorage.setItem("name", name)
                sessionStorage.setItem("email", email)
                if (staff) router.push("/staffhome")
                else router.push("/home")
            }

        }
    }

    return (
        <div className={styles.register}>
            {show ? <p>Account already exists</p> : null}
            <form className={styles.registerform} onSubmit={onSubmit}>
            <h1>Registration</h1>
                <table>
                    <tbody>
                        <tr>
                            <td><label htmlFor="name">Name:</label></td>
                            <td><input required type="text" name="name" id="name"/></td>
                        </tr>
                        <tr>
                            <td><label htmlFor="email">Email:</label></td>
                            <td><input required type="email" id="email" name="email"></input></td>
                        </tr>
                        <tr>
                            <td><label htmlFor="phone">Phone:</label></td>
                            <td><input required type="tel" name="phone" id="phone"/></td>
                        </tr>
                        <tr>
                            <td><label htmlFor="pwd">Password:</label></td>
                            <td><input required type="password" id="pwd" name="pwd"></input></td>
                        </tr>
                        <tr>
                            <td><label htmlFor="psc">Passcode (for staff):</label></td>
                            <td><input type="password" name="psc" id="psc" maxLength="4" /></td>
                        </tr>
                    </tbody>
                </table>
                <input type="submit" value="Register" />
            </form>
        </div>
    )
}

export async function getStaticProps() {
    const res = await fetch(`http://localhost:5000/users`)
    const users = await res.json()

    const resp = await fetch(`http://localhost:5000/passcode`)
    const passcode = await resp.json()
    const code = passcode[0].code
    return {
        props: { users, code },
    }
}


export default register