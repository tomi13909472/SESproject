import router from 'next/router'
import Navi from '../components/Staffnav'
import styles from '../styles/mtnstaff.module.css'
import { useEffect, useState } from 'react'
const mtnstaff = ({ staff }) => {

    const [addShow, setAddShow] = useState(false)

    function manage (id) {
        sessionStorage.setItem("mtnID", id)
        router.push('/mtnone')
    }

    function add (){
        setAddShow(true)
    }

    function cancel (event){
        event.preventDefault()
        setAddShow(false)
    }

    async function addConf (event){
        event.preventDefault()

        let cont = true
        const name = event.target.name.value
        const email = event.target.email.value
        const phone = event.target.phone.value
        const role = event.target.role.value
        const password = event.target.password.value
        
        for (const mem in staff){
            if (email == mem.email)
                cont = false
        }

        if (cont) {
            const res = await fetch(
                `http://localhost:5000/staff`,
                {
                    method: 'POST',
                    body: JSON.stringify({
                        name: name,
                        email: email,
                        phone: phone,
                        role: role,
                        password: password
                    }),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            )
            if (res.status == 201){
                setAddShow(false)
                router.push('/mtnstaff')
            }

        }

    }

    return (
        <div className={styles.mtn}>
            <Navi></Navi>
            <h1>Maintain staff</h1>
            <button onClick={add}>Add Member</button>
            {addShow ?  //add new user pop up
                <div>
                    <div className={styles.addmember}>
                        <h2>Add Member</h2>
                        <form onSubmit={addConf}>
                            <table className={styles.addmembertable}>
                                <tbody>
                                    <tr>
                                        <td><label htmlFor="name">Name:</label></td>
                                        <td><input type="text" name="name" id="name" /></td>
                                    </tr>
                                    <tr>
                                        <td><label htmlFor="email">Email:</label></td>
                                        <td><input type="email" id="email" name="email" /></td>
                                    </tr>
                                    <tr>
                                        <td><label htmlFor="phone">Phone:</label></td>
                                        <td><input type="tel" id="phone" name="phone" /></td>
                                    </tr>
                                    <tr>
                                        <td><label htmlFor="role">Role:</label></td>
                                        <td><input type="text" id="role" name="role" /></td>
                                    </tr>
                                    <tr>
                                        <td><label htmlFor="password">Password:</label></td>
                                        <td><input type="password" id="password" name="password" /></td>
                                    </tr>
                                </tbody>
                            </table>
                            <div className={styles.addmembersubmit}>
                                <input type="submit" value="Add Member" />
                                <button onClick={cancel}>Cancel</button>
                            </div>
                        </form>
                    </div>
                </div>
                : null}
            <table className={styles.mtntable}>
                <thead>
                    <tr><td>Name</td><td>Email</td><td>Phone</td><td>Role</td><td></td></tr>
                </thead>
                <tbody>
                    {staff.map((user) => (
                        <tr key={user.id}><td>{user.name}</td>
                            <td>{user.email}</td><td>{user.phone}</td><td>{user.role}</td>
                            <td><button onClick={() => manage(user.id)}>Manage</button></td></tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export async function getStaticProps() {
    const res = await fetch(`http://localhost:5000/staff`)
    const staff = await res.json()
    return {
        props: { staff },
    }
}


export default mtnstaff
