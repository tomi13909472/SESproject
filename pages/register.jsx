import { useRouter } from 'next/router'
import { useState } from 'react'

const register = ({ users }) => {
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

        if (passcode == "1234")
            staff = true;

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
            const req = await fetch(`http://localhost:5000/users?email=${email}`)
            const user = await req.json()
            cont = true
            localStorage.setItem("name", name)
            localStorage.setItem("email", email)
            router.push("/home")

        }
    }

    return (
        <div>
            <h1>Registration</h1>
            {show ? <p>Account already exists</p> : null}
            <form onSubmit={onSubmit}>
                <table>
                    <tbody>
                        <tr>
                            <td><label htmlFor="name">Name:</label></td>
                            <td><input type="text" name="name" id="name"/></td>
                        </tr>
                        <tr>
                            <td><label htmlFor="email">Email:</label></td>
                            <td><input type="email" id="email" name="email"></input></td>
                        </tr>
                        <tr>
                            <td><label htmlFor="phone">Phone:</label></td>
                            <td><input type="tel" name="phone" id="phone"/></td>
                        </tr>
                        <tr>
                            <td><label htmlFor="pwd">Password:</label></td>
                            <td><input type="password" id="pwd" name="pwd"></input></td>
                        </tr>
                        <tr>
                            <td><Label htmlFor="pwd2">Password:</Label></td>
                            <td><Label type="password2" id="pwd2" name="pwd2"></Label></td>
                        </tr>
                        <tr>
                            <td><label htmlFor="psc">Passcode (for staff):</label></td>
                            <td><input type="password" name="psc" id="psc" maxLength="4"/></td>
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
    return {
        props: { users },
    }
}


export default register