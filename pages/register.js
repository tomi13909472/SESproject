import { useState } from 'react'

const register = ({ users }) => {
    const [show, setShow] = useState(false)
    let cont = true
    async function onSubmit(event) {
        event.preventDefault()

        const email = event.target.email.value
        const password = event.target.pwd.value

        for (const user of users) {
            if (user.email == email) {
                setShow(true)
                cont = false
            }
        }
        if (cont) {
            const res = await fetch(
                `http://localhost:5000/users`,
                {
                    method: 'POST',
                    body: JSON.stringify({
                        email: email,
                        password: password
                    }),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            )
            const result = await res.json()
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
                            <td><label htmlFor="email">Email:</label></td>
                            <td><input type="text" id="email" name="email"></input></td>
                        </tr>
                        <tr>
                            <td><label htmlFor="pwd">Password:</label></td>
                            <td><input type="password" id="pwd" name="pwd"></input></td>
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
