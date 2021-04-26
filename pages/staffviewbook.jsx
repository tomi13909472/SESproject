import Navi from '../components/Staffnav'
import { useState, useEffect } from 'react'

const staffviewbook = ({ bookings }) => {

    const [books, setBooks] = useState([])
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
        setBooks([])
        date = document.getElementById("date").value
        for (let i = 0; i < bookings.length; i++) {
            if (bookings[i].date == date)
                arr.push(bookings[i])
            if (bookings[i] < today) {

            }
        }
        selSort(arr)
        for (let i = 0; i < arr.length; i++)
            setBooks(books => [...books, arr[i]])
    }

    return (
        <div>
            <Navi></Navi>
            <h1>Bookings</h1>
            <label htmlFor="date">Date:</label>
            <input type="date" name="date" id="date" onChange={onDateChange}></input>
            <table>
                <thead>
                    <tr><td>Date</td><td>Time</td><td>Table</td><td>Number Of People</td><td></td></tr>
                </thead>
                {books ?
                    <tbody>
                        {books.map((book) => (
                            <tr key={book.id}><td>{book.date}</td>
                                <td>{book.time + ":00"}</td><td>{book.table}</td><td>{book.numberofpeople}</td>
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
