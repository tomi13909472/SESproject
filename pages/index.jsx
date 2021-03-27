import Link from 'next/link'

export default function Home({ users }) {

  return (

    <div>
      <Link href='/register'><a>Register</a></Link><br/>
      <Link href='/login'><a>Login</a></Link>
      <ul>{users.map((user) => (
        <li key={user.email}>{user.email}</li>
      ))}</ul>
    </div>
  )
}

export async function getStaticProps(){
  const res = await fetch(`http://localhost:5000/users`)
  const users = await res.json()
  return {
      props:{ users },
  }
}
