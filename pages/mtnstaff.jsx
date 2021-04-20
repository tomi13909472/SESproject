import router from 'next/router'
import Navi from '../components/Staffnav'
import styles from '../styles/mtnstaff.module.css'
const mtnstaff = ({ users }) => {

    const list = new Array()
    for (const user of users) {
        if (user.staff)
            list.push(user)
    }

    function manage (id) {
        sessionStorage.setItem("mtnID", id)
        router.push('/mtnone')
    }

    return (
        <div className={styles.mtn}>
            <Navi></Navi>
            <h1>Maintain staff</h1>
            <table className={styles.mtntable}>
                <thead>
                    <tr><td>Name</td><td>Email</td><td>Phone</td><td></td></tr>
                </thead>
                <tbody>
                    {list.map((user) => (
                        <tr key={user.id}><td>{user.name}</td>
                            <td>{user.email}</td><td>{user.phone}</td>
                            <td><button onClick={() => manage(user.id)}>Manage</button></td></tr>
                    ))}
                </tbody>
            </table>
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


export default mtnstaff