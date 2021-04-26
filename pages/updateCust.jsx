import { useEffect, useState } from 'react'
import router from 'next/router'
import Navi from '../components/Custnav'
const mtnone = ({ users }) => {

    const [mid, setId] = useState()
    const [user, setUser] = useState()
    const [show, setShow] = useState(false)

    useEffect(() => {
        if (!user) {
            setId(sessionStorage.getItem("id"))
            for (const user of users) {
                if (mid == user.id) {
                    setUser(user)
                    break
                }
            }
        }
    })

    const update = async (event) => {
        event.preventDefault()

        let count = 0
        let nName, nEmail, nPhone, nPwd, nRole
        const name = event.target.name.value
        const email = event.target.email.value
        const phone = event.target.phone.value
        const pwd = event.target.pwd.value

        if (name == "") { nName = user.name; count++ }
        else nName = name
        if (email == "") { nEmail = user.email; count++ }
        else nEmail = email
        if (phone == "") { nPhone = user.phone; count++ }
        else nPhone = phone
        if (pwd == "") { nPwd = user.password; count++ }
        else nPwd = pwd

        if (count == 4) {
            setShow(true)
        }
        else {
            const res = await fetch(
                `http://localhost:5000/users/${mid}`,
                {
                    method: 'PUT',
                    body: JSON.stringify({
                        name: nName,
                        email: nEmail,
                        phone: nPhone,
                        loyalty: user.loyalty,
                        password: nPwd
                    }),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            )
            if (res.status == 200) {
                router.push('/custhome')
            }
            else {
                setShow(true)
            }
        }

    }

    const cancel = (event) => {
        event.preventDefault()
        router.push('/custhome')
    }

    return (
        <div>
            <Navi></Navi>
            <h1>Update Details</h1>
            {show ? <p>Something went wrong or no values were entered</p> : null}
            {user ?
                <form onSubmit={update}>
                    <table>
                        <tbody>
                            <tr>
                                <td><label htmlFor="name">Name:</label></td>
                                <td><input type="text" name="name" id="name" placeholder={user.name} /></td>
                            </tr>
                            <tr>
                                <td><label htmlFor="email">Email:</label></td>
                                <td><input type="email" id="email" name="email" placeholder={user.email} /></td>
                            </tr>
                            <tr>
                                <td><label htmlFor="phone">Phone:</label></td>
                                <td><input type="tel" name="phone" id="phone" placeholder={user.phone} /></td>
                            </tr>
                            <tr>
                                <td><label htmlFor="pwd">Password:</label></td>
                                <td><input type="password" id="pwd" name="pwd" placeholder={user.password} /></td>
                            </tr>
                            <tr>
                                <td><p>Current Loyalty Discount:</p></td>
                                <td><p>{user.loyalty + "%"}</p></td>
                            </tr>
                        </tbody>
                    </table>
                    <input id="sub" type="submit" value="Update" />
                    <button onClick={cancel}>Cancel</button>
                </form>
                : <p>Something went wrong</p>}
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

export default mtnone