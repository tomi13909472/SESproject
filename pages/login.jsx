import { useState } from 'react'
import { useRouter } from 'next/router'

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
        <div>
            <h1>Login</h1>
            {show ? <p>Incorrect credentials or account does not exist</p> : null}
            <form onSubmit={check}>
                <table>
                    <tbody>
                        <tr>
                            <td><label htmlFor="email">Email:</label></td>
                            <td><input type="email" name="email" id="email"/></td>
                        </tr>
                        <tr>
                        <td><label htmlFor="pwd">Password:</label></td>
                            <td><input type="password" name="pwd" id="pwd"/></td>
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