import Navi from '../components/Staffnav'
import { useState, useEffect } from 'react'
<<<<<<< HEAD
import styles from '../styles/staffviewbook.module.css'
=======
>>>>>>> 5c972ad1c4a355d8f79104a970a3463585774586

const staffviewbook = ({ bookings }) => {

    const [books, setBooks] = useState([])
<<<<<<< HEAD
    const [show, setShow] = useState(false)
=======
>>>>>>> 5c972ad1c4a355d8f79104a970a3463585774586
    let today = new Date().toISOString().slice(0, 10)
    let date
    useEffect(() => {
        document.getElementById("date").setAttribute("min", today)
        // deleteOld()
    })
    // async function deleteOld() {
    //     for (let i = 0; i < bookings.length; i++)
    //         if (bookings[i].date < today) {
    //             const res = await fetch(
    //                 `http://localhost:5000/bookings/${bookings[i].id}`,
    //                 {
    //                     method: 'DELETE'
    //                 }
    //             )
    //         }
    // }

    function selSort(arr) {
        for (let i = 0; i < arr.length; i++) {
            let lowest = arr[i].time
            let lowpos = i
            for (let x = i + 1; x < arr.length; x++) {
                if (arr[x].time < lowest) {
                    lowest = arr[x]
                    lowpos = x
                }
                swap(i, lowpos, arr)
            }
        }
    }

    function swap(first, second, arr) {
        let temp = arr[first]
        arr[first] = arr[second]
        arr[second] = temp
    }

    async function onDateChange() {
        let arr = []
<<<<<<< HEAD
        var count =0
=======
>>>>>>> 5c972ad1c4a355d8f79104a970a3463585774586
        setBooks([])
        date = document.getElementById("date").value
        for (let i = 0; i < bookings.length; i++) {
            if (bookings[i].date == date)
<<<<<<< HEAD
            {
                arr.push(bookings[i])
                count=count+1;
            }
=======
                arr.push(bookings[i])
>>>>>>> 5c972ad1c4a355d8f79104a970a3463585774586
            if (bookings[i] < today) {

            }
        }
<<<<<<< HEAD
        if (count == 0)
            setShow(true)
        else
            setShow(false)
        
=======
>>>>>>> 5c972ad1c4a355d8f79104a970a3463585774586
        selSort(arr)
        for (let i = 0; i < arr.length; i++)
            setBooks(books => [...books, arr[i]])
    }

    return (
<<<<<<< HEAD
        <div className={styles.staffbookings}>
=======
        <div>
>>>>>>> 5c972ad1c4a355d8f79104a970a3463585774586
            <Navi></Navi>
            <h1>Bookings</h1>
            <label htmlFor="date">Date:</label>
            <input type="date" name="date" id="date" onChange={onDateChange}></input>
<<<<<<< HEAD
            <table className={styles.staffviewbooktable}>
                <thead>
                    <tr><td>Date</td><td>Time</td><td>Table</td><td>Number Of People</td></tr>
                </thead>
                {show ? <p>There are no bookings for today</p> : null}
=======
            <table>
                <thead>
                    <tr><td>Date</td><td>Time</td><td>Table</td><td>Number Of People</td><td></td></tr>
                </thead>
>>>>>>> 5c972ad1c4a355d8f79104a970a3463585774586
                {books ?
                    <tbody>
                        {books.map((book) => (
                            <tr key={book.id}><td>{book.date}</td>
                                <td>{book.time}</td><td>{book.table}</td><td>{book.numberofpeople}</td>
                            </tr>
                        ))}
                    </tbody>
                    : null}
            </table>
        </div>
    )
}

export async function getStaticProps() {
    const res = await fetch(`http://localhost:5000/bookings`)
    const bookings = await res.json()
    return {
        props: { bookings },
    }
}
export default staffviewbook
