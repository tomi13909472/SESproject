import Navi from '../components/Custnav'
import { useEffect, useState } from 'react'

const custBook = () => {

    let change = false
    const [name, setName] = useState()
    const [email, setEmail] = useState()
    const [show, setShow] = useState(false)

    useEffect(() => {
        document.getElementById("date").setAttribute("min", getMin())
    })

    function getMin() {
        let today = new Date()
        today.setDate(today.getDate() + 14)
        return today.toISOString().slice(0, 10)
    }

    function onDateChange() {
        if (change == false) {
            document.getElementById("time").toggleAttribute("disabled")
            change = true
        }
    }

    async function onTimeChange() {

    }

    function onSubmit(e) {
        e.preventDefault()
        setName(sessionStorage.getItem('name'))
        setEmail(sessionStorage.getItem('email'))
        setShow(true)
    }

    return (
        <div>
            <Navi></Navi>
            <h1>Make a booking</h1>
            <form onSubmit={onSubmit}>
                <label htmlFor="date">Date:</label>
                <input type="date" name="date" id="date" onChange={onDateChange} />
                <br />
                <p>Time bookings are only by the hour</p>
                <label htmlFor="time">Time:</label>
                <input type="time" name="time" id="time" step="3600000" disabled onChange={onTimeChange} />
                <input type="submit" value="Book" />
            </form>
            {show ? <p>{name} and {email}</p> : null}
        </div>
    )
}

export default custBook
