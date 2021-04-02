import { useEffect, useState } from 'react'
import useRouter from 'next/router'
import Link from 'next/link'
import router from 'next/router'

const mtnone = ({ users }) => {

    const [id, setId] = useState()
    const [member, setMember] = useState()
    const [show, setShow] = useState(false)
    const [confirm, setConfirm] = useState(false)
    let search = true

    useEffect(() => {
        setId(localStorage.getItem("mtnID"))
        if (search) {
            for (const user of users) {
                if (id == user.id) {
                    setMember(user)
                    console.log(user)
                    search = false
                    break
                }
            }
        }
    })

    const update = async (event) => {
        event.preventDefault()

        let nName, nEmail, nPhone, nPwd
        const name = event.target.name.value
        const email = event.target.email.value
        const phone = event.target.phone.value
        const pwd = event.target.pwd.value

        if (name == "") nName = member.name
        else nName = name
        if (email == "") nEmail = member.email
        else nEmail = email
        if (phone == "") nPhone = member.phone
        else nPhone = phone
        if (pwd == "") nPwd = member.password
        else nPwd = pwd

        const res = await fetch(
            `http://localhost:5000/users/${localStorage.getItem("id")}`,
            {
                method: 'PUT',
                body: JSON.stringify({
                    name: nName,
                    email: nEmail,
                    phone: nPhone,
                    password: nPwd,
                    staff: true
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        )
        if (res.status == 200) {
            router.push('/mtnstaff')
        }
        else {
            setShow(true)
        }

    }

    const del = (event) => {
        event.preventDefault()
        setConfirm(true)
        console.log("hi")
    }

    const noDel = () => {
        setConfirm(false)
    }

    const yesDel = () => {

    }

    const cancel = (event) => {
        event.preventDefault()
        router.push('/mtnstaff')
    }

    return (
        <div>
            <h1>Maintain staff member</h1>
            {confirm ?
                <div style={{ zIndex: "10", border: "2px solid black" }}>
                    <p>Are you sure you want to delete this member?</p>
                    <button onClick={yesDel}>Yes</button>
                    <button onClick={noDel}>No</button>
                </div>
                : null}
            {show ? <p>Something went wrong</p> : null}
            {member ?
                <form onSubmit={update}>
                    <table>
                        <tbody>
                            <tr>
                                <td><label htmlFor="id">ID:</label></td>
                                <td><input type="text" name="id" id="id" readOnly placeholder={member.id} /></td>
                            </tr>
                            <tr>
                                <td><label htmlFor="name">Name:</label></td>
                                <td><input type="text" name="name" id="name" placeholder={member.name} /></td>
                            </tr>
                            <tr>
                                <td><label htmlFor="email">Email:</label></td>
                                <td><input type="email" id="email" name="email" placeholder={member.email} /></td>
                            </tr>
                            <tr>
                                <td><label htmlFor="phone">Phone:</label></td>
                                <td><input type="tel" name="phone" id="phone" placeholder={member.phone} /></td>
                            </tr>
                            <tr>
                                <td><label htmlFor="pwd">Password:</label></td>
                                <td><input type="password" id="pwd" name="pwd" placeholder={member.password} /></td>
                            </tr>
                        </tbody>
                    </table>
                    <input type="submit" value="Update" />
                    <button onClick={del}>Delete</button>
                    <button onClick={cancel}>Cancel</button>
                </form>
                
                : <p>Member not found</p>}
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
