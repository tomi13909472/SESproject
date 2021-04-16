import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'


const viewbookings = ({bookingusers}) => {

    const list = new Array()
    for (const user of bookingusers) {
            list.push(user)
    }

    return (
        <div>
            <Link href="/custhome"><a>Back</a></Link>
            <h1>Bookings</h1>
            <table>
                <thead>
                    <tr><td>Date</td><td>Time</td><td>Table</td><td>Number Of People</td></tr>
                </thead>
            </table>
            <tbody>
            {list.map((buser) => (
                        <tr key={buser.id}><td>{buser.date}</td>
                            <td>{buser.time}</td><td>{buser.table}</td><td>{buser.numberofpeople}</td></tr>
            ))}
            </tbody>
        </div>
    )
}

export async function getStaticProps() {
    const res = await fetch(`http://localhost:5000/bookings`)
    const bookingusers = await res.json()
    return {
        props: { bookingusers },
    }
}
export default viewbookings
