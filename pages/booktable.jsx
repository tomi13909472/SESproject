import { useRouter } from 'next/router'
import { useState, useEffect} from 'react'
import styles from '../styles/booktable.module.css'
import Navi from '../components/Custnav'
import {toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

toast.configure()
const booktable = ({ bookings }) => {
    const router = useRouter()
    const [show, setShow] = useState(false)
    let change = false
    let date, time

    // const [popup, setpopup] = useState(false)

    useEffect(() => {
        document.getElementById("date").setAttribute("min", MinDate())
    })

    function MinDate() {
        let today_date = new Date()
        today_date.setDate(today_date.getDate() + 14)
        return today_date.toISOString().slice(0, 10) //2013-03-10T02:00:00Z
    }

    const notify =()=>{
        toast.success('Booking Successful!',{ position:toast.POSITION.TOP_CENTER })
    }

    function onDateChange() {
        document.getElementById("table").disabled = true
        document.getElementById("table").value = "select table"
        document.getElementById("person").disabled = true
        if (change == false) {
            document.getElementById("time").disabled = false
            change = true
        }
    }
    
    function onTimeChange() {
        document.getElementById("table").value = "select table"
        setShow(false)
        for (let i = 1; i < 7; i++){
            document.getElementById(`table ${i}`).disabled = false
        }
        let count = 0;
        time = document.getElementById("time").value.slice(0, 2)
        date = document.getElementById("date").value
        document.getElementById("table").disabled = false;
        for (let i = 0; i < bookings.length; i++){
            if (bookings[i].date == date && bookings[i].time == time){
                document.getElementById(`${bookings[i].table}`).disabled = true
                count++
            }
        }
        if (count == 6)
            setShow(true)
    }

    function onTableChange() {
        document.getElementById("person").disabled = false
    }

    function onPersonChange() {
        document.getElementById("submit").disabled = false
    }

    async function onSubmit(event) {
        event.preventDefault()
        let cont=true;
        const MDate = date;
        const MTime = time;
        const table=event.target.table.value;
        const persons=event.target.person.value;

        if (cont) {
            const res = await fetch(
                `http://localhost:5000/bookings`,
                {
                    method: 'POST',
                    body: JSON.stringify({
                        name: sessionStorage.getItem("name"),
                        email: sessionStorage.getItem("email"),
                        date: MDate,
                        time: MTime,
                        table: table,
                        numberofpeople: persons,
                        personId : sessionStorage.getItem("id")
                    }),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            )
            if (res.status == 201) {
                router.push("/custhome")
            }
        }

    }


    return (
        <div className="container-form">
            <Navi></Navi>
            {show ? <p>All tables taken for this time</p> : null}
            {/* {popup ? 
            <div className="popup">
                <p>Booking successful</p>
                <button onClick={close}>close</button>
            </div> : null } */}
            <form className={styles.bookform} onSubmit={onSubmit}>
            <h1>Reservation online</h1>
                <table className={styles.booktable}>
                    <tbody>
                        <tr>
                            <td><label htmlFor="Date">Date:</label></td>
                            <td><input required type="Date" name="date" id="date" onChange={onDateChange} /></td>
                        </tr>
                        <tr>
                            <td></td>
                            <td><p>Times are only booked by the hour</p></td>
                        </tr>
                        <tr>
                            <td><label htmlFor="time">Time:</label></td>
                            <td><input required type="time" id="time" name="time" disabled onChange={onTimeChange}></input></td>
                        </tr>
                        <tr>
                            <td><label htmlFor="table">Table:</label></td>
                            <td><select required name="table" id="table" onChange={onTableChange} disabled>
                                <option value="table-select">select table</option>
                                <option value="table 1" id="table 1">table 1</option>
                                <option value="table 2" id="table 2">table 2</option>
                                <option value="table 3" id="table 3">table 3</option>
                                <option value="table 4" id="table 4">table 4</option>
                                <option value="table 5" id="table 5">table 5</option>
                                <option value="table 6" id="table 6">table 6</option>
                                </select></td>
                        </tr>
                        <tr>
                            <td><label htmlFor="person">How many people:</label></td>
                            <td><select required name="person" id="person" onChange={onPersonChange} disabled>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                                <option value="6">5+</option>
                                </select></td>
                        </tr>
                    </tbody>
                </table>
                <input onClick={notify} type="submit" value="Submit" id="submit" disabled/>
            </form>
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


export default booktable
