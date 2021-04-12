import router from 'next/router'
import Navi from '../components/Staffnav'

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
        <div>
            <Navi></Navi>
            <h1>Maintain staff</h1>
            <table style={{ border: "1px solid black" }}>
                <thead>
<<<<<<< HEAD
                    <tr><td>Name</td><td>Email</td><td>Phone</td></tr>
=======
                    <tr><td>ID</td><td>Name</td><td>Email</td><td>Phone</td></tr>
>>>>>>> 78e079458ea72d3f2afb7f4ce7ff8eb9a48c0ba4
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
