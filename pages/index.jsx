import Link from 'next/link'
import { useEffect } from 'react'
import Image from 'next/image'
import styles from '../styles/homepage.module.css'
export default function Home({ users }) {
  return (
    <div className={styles.homepage}>
       <Image
        src="/background.png"
        width={2000}
        height={700}
      />
        <div className={styles.home}>
          <Link href='/register'><a>Register</a></Link>
          <Link href='/login'><a>Login</a></Link>
          {/* <ul>{users.map((user) => (
            <li key={user.email}>{user.email}</li>
          ))}</ul> */}
        </div>
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
