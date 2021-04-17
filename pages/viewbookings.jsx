import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'


const viewbookings = ({bookingusers}) => {
    
    const [bid, setId] = useState(false)
    const list = new Array()
    const list1 = new Array()
    var today_date = new Date()
    today_date.setDate(today_date.getDate()+1)
    var t_day=today_date.toISOString().slice(0, 10)

    useEffect(()=>{
        setId(sessionStorage.getItem("id"))
   })
    for (const user of bookingusers) {
        if(user.personId == bid)
            if(t_day>user.date)
                list.push(user)
    }
    for (const user of bookingusers) {
        if(user.personId == bid)
            if(t_day<=user.date)
                list1.push(user)
    }

    return (
        <div>
            <Link href="/custhome"><a>Back</a></Link>
            <h3>Previous Bookings</h3>
            <table>
                <thead>
                    <tr><td>Date</td><td>Time</td><td>Table</td><td>Number Of People</td></tr>
                </thead>
            </table>
            <tbody>
            {list.map((buser) => (
                        <tr key={buser.name}><td>{buser.date}</td>
                            <td>{buser.time}</td><td>{buser.table}</td><td>{buser.numberofpeople}</td></tr>
            ))}
            </tbody>
            <h3>Current Bookings</h3>
            <table>
                <thead>
                    <tr><td>Date</td><td>Time</td><td>Table</td><td>Number Of People</td></tr>
                </thead>
            </table>
            <tbody>
            {list1.map((buser) => (
                        <tr key={buser.name}><td>{buser.date}</td>
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
